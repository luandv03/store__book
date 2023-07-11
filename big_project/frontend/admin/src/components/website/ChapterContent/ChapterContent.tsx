import { Text, Center, Button, Stack } from "@mantine/core";
import {
    IconPlayerTrackPrevFilled,
    IconPlayerTrackNextFilled,
    IconHome2,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { novelService } from "../../../services/novel.service";
import { useEffect, useState } from "react";

export function ChapterContent() {
    const { novel_id, chapter } = useParams();

    const [chapterDetail, setChapterDetail] = useState({
        novel_id: 0,
        chapter: 0,
        content: "",
        chapter_name: "",
        number_of_chapter: 0,
    });

    const handleGetChapterDetail = async () => {
        const resChapter = await novelService.getChapterContentByNovelId(
            Number(novel_id),
            Number(chapter)
        );

        setChapterDetail(resChapter.data);
    };

    useEffect(() => {
        handleGetChapterDetail();
    }, [chapter]);

    return (
        <div style={{ width: "100%", padding: "20px 120px" }}>
            <Center>
                <Text size="20px" fw={500}>
                    Chapter {chapterDetail.chapter}:{" "}
                    <span>{chapterDetail.chapter_name}</span>
                </Text>
            </Center>

            <div dangerouslySetInnerHTML={{ __html: chapterDetail.content }} />

            <div
                style={{
                    position: "fixed",
                    right: "30px",
                    bottom: "30px",
                }}
            >
                <Stack spacing={1}>
                    <Button
                        onClick={(e) => {
                            if (Number(chapter) == 1) {
                                e.preventDefault();
                            }
                        }}
                        disabled={Number(chapter) == 1}
                    >
                        <Link
                            to={`/novel/${chapterDetail.novel_id}/chapter/${
                                chapterDetail.chapter - 1
                            }`}
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <IconPlayerTrackPrevFilled size={40} />
                        </Link>
                    </Button>
                    <Button>
                        <Link
                            to={`/novel/${chapterDetail.novel_id}/detail`}
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <IconHome2 size={40} />
                        </Link>
                    </Button>
                    <Button
                        onClick={(e) => {
                            if (
                                Number(chapter) ==
                                chapterDetail.number_of_chapter
                            ) {
                                e.preventDefault();
                            }
                        }}
                        disabled={
                            Number(chapter) == chapterDetail.number_of_chapter
                        }
                    >
                        <Link
                            to={`/novel/${chapterDetail.novel_id}/chapter/${
                                chapterDetail.chapter + 1
                            }`}
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            <IconPlayerTrackNextFilled size={40} />
                        </Link>
                    </Button>
                </Stack>
            </div>
        </div>
    );
}
