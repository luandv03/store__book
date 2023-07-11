import { useState, useEffect } from "react";
import { Table, ScrollArea, Stack } from "@mantine/core";

import { novelService } from "../../services/novel.service";

interface NovelType {
    novel_id: number;
    trans_id: number;
    novel_view: number;
    author: string;
    composed_year: number;
    novel_name: string;
    total_chapters?: number;
    avg_star?: number;
    novel_photo_url: string;
    novel_description: string;
    username?: string;
}
export function CategoryList() {
    const [novels, setNovels] = useState([
        {
            novel_id: 0,
            trans_id: 0,
            novel_view: 0,
            author: "",
            composed_year: 0,
            novel_name: "",
            total_chapters: 0,
            avg_star: 0,
            username: 0,
        },
    ]);

    const handleGetNovel = async () => {
        const resNovel = await novelService.getAllNovel();

        if (resNovel.statusCode === 200) {
            setNovels(resNovel.data);
        }
    };

    useEffect(() => {
        handleGetNovel();
    }, []);

    const rows =
        novels.length > 0 &&
        novels.map((item: NovelType) => {
            return (
                <tr key={item.novel_id}>
                    <td>{item.novel_id}</td>
                    <td>{item.novel_name}</td>
                    <td>{item.total_chapters}</td>
                    <td>{item.avg_star}</td>
                    <td>{item.composed_year}</td>
                    <td>{item.trans_id}</td>
                    <td>{item.username}</td>
                </tr>
            );
        });

    return (
        <ScrollArea>
            <Stack>
                <Table miw={800} verticalSpacing="sm" withColumnBorders>
                    <thead>
                        <tr>
                            <th>Mã truyện</th>
                            <th>Tên truyện</th>
                            <th>Số chương</th>
                            <th>Số sao trung bình</th>
                            <th>Năm phát hành</th>
                            <th>Mã người dịch</th>
                            <th>Tên người dịch</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Stack>
        </ScrollArea>
    );
}
