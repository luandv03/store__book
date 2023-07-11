import {
    Stack,
    ScrollArea,
    Textarea,
    NumberInput,
    Button,
    Flex,
    TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { novelService } from "../../../services/novel.service";

interface NovelType {
    trans_id: number;
    author: string;
    composed_year: number;
    novel_name: string;
    novel_description: string;
    novel_photo_url: string;
    chapter: number;
    chapter_content: string;
    chapter_name: string;
}

export function CreateNovel() {
    const [author, setAuthor] = useState("");
    const [composed_year, setComposed_year] = useState<number | "">(0);
    const [novel_name, setNovel_name] = useState("");
    const [novel_photo_url, setNovel_photo_url] = useState("");
    const [novel_description, setNovel_description] = useState("");
    const [chapter, setChapter] = useState<number | "">(0);
    const [chapter_content, setChapter_content] = useState("");
    const [chapter_name, setChapter_name] = useState("");

    const { trans_id } = useParams();

    const handleCreateNovel = async () => {
        if (
            !author ||
            !composed_year ||
            !novel_name ||
            !novel_photo_url ||
            !novel_description ||
            !chapter ||
            !chapter_content ||
            !chapter_name
        ) {
            return alert("vui long dien day du cac truong");
        }

        const payload: NovelType = {
            trans_id: Number(trans_id),
            author,
            composed_year,
            novel_name,
            novel_description,
            novel_photo_url,
            chapter,
            chapter_content,
            chapter_name,
        };

        const resNovel = await novelService.createNovel(payload);

        alert(resNovel.message);
        setAuthor("");
        setComposed_year(0);
        setNovel_name("");
        setNovel_photo_url("");
        setNovel_description("");
        setChapter(0);
        setChapter_content("");
        setChapter_name("");
    };

    return (
        <Stack sx={{ marginTop: "30px" }}>
            <TextInput
                placeholder="Tên truyện"
                label="Tên truyện"
                withAsterisk
                sx={{ width: "400px" }}
                value={novel_name}
                onChange={(e) => setNovel_name(e.target.value)}
            />
            <TextInput
                placeholder="Tác giả"
                label="Tác giả"
                withAsterisk
                sx={{ width: "200px" }}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <NumberInput
                placeholder="Năm sáng tác"
                label="Năm sáng tác"
                withAsterisk
                sx={{ width: "200px" }}
                value={composed_year}
                onChange={setComposed_year}
            />
            <TextInput
                placeholder="Tóm tắt"
                label="Tóm tắt"
                withAsterisk
                sx={{ width: "200px" }}
                value={novel_description}
                onChange={(e) => setNovel_description(e.target.value)}
            />
            <TextInput
                placeholder="URL hinh anh"
                label="URL hinh anh"
                withAsterisk
                sx={{ width: "200px" }}
                value={novel_photo_url}
                onChange={(e) => setNovel_photo_url(e.target.value)}
            />
            <NumberInput
                label="Chương "
                sx={{ width: "100px" }}
                value={chapter}
                onChange={setChapter}
            />
            <TextInput
                placeholder="Tên chương"
                label="Tên chương"
                withAsterisk
                sx={{ width: "200px" }}
                value={chapter_name}
                onChange={(e) => setChapter_name(e.target.value)}
            />
            <ScrollArea height={300}>
                <Textarea
                    label="Content"
                    autosize
                    value={chapter_content}
                    onChange={(e) => setChapter_content(e.target.value)}
                />
            </ScrollArea>

            <Flex justify="flex-end">
                <Button
                    variant="default"
                    w={100}
                    onClick={() => handleCreateNovel()}
                >
                    Save
                </Button>
            </Flex>
        </Stack>
    );
}
