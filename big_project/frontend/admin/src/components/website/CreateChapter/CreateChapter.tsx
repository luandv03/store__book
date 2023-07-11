import {
    Stack,
    ScrollArea,
    NumberInput,
    Button,
    Flex,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { novelService } from "../../../services/novel.service";

export function CreateChapter() {
    const [chapter, setChapter] = useState<number | "">(0);
    const [chapterContent, setChapterContent] = useState("");
    const [chapterName, setChapterName] = useState("");

    const { novel_id } = useParams();

    const handleCreateChapter = async () => {
        if (!chapter || !chapterContent || !chapterContent) {
            return alert("Hãy nhập đầy đủ các trường");
        }

        const payload = {
            novel_id: Number(novel_id),
            chapter,
            chapter_name: chapterName,
            chapter_content: chapterContent,
        };

        const resData = await novelService.createChapterByNovelId(payload);

        console.log(resData);

        if (resData.status === 500) {
            return alert(resData.message);
        }
        alert(resData.message);
        setChapter(0);
        setChapterContent("");
        setChapterName("");
    };

    return (
        <Stack sx={{ marginTop: "30px" }}>
            <NumberInput
                label="Số chương"
                sx={{ width: "100px" }}
                value={chapter}
                onChange={setChapter}
                withAsterisk
            />
            <TextInput
                label="Tên chương"
                w={800}
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
            />
            <ScrollArea height={300}>
                <Textarea
                    label="Nội dung chương"
                    value={chapterContent}
                    onChange={(e) => setChapterContent(e.target.value)}
                    withAsterisk
                ></Textarea>
            </ScrollArea>

            <Flex justify="flex-end">
                <Button
                    variant="default"
                    w={100}
                    onClick={() => handleCreateChapter()}
                >
                    Save
                </Button>
            </Flex>
        </Stack>
    );
}
