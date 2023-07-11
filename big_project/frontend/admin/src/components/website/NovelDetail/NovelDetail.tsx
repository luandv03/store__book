import {
    Stack,
    Group,
    Flex,
    Text,
    Badge,
    Space,
    Box,
    Popover,
    Textarea,
    Button,
    Paper,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import {
    IconStar,
    IconMenu2,
    IconMessageCircle2Filled,
} from "@tabler/icons-react";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { NovelConstant } from "../../../types/novel/novel.type";
import { novelService } from "../../../services/novel.service";
import { AuthContext } from "../../../providers/AuthProvider";

export function NovelDetail() {
    const [novel, setNovel] = useState(NovelConstant);
    const [chapters, setChapters] = useState([
        { chapter: 0, chapter_name: "" },
    ]);
    const [genres, setGenres] = useState([{ genre_id: 0, genre_name: "" }]);
    const [feedBack, setFeedBack] = useState([
        {
            read_id: 0,
            user_id: 0,
            feedback: "",
            star: 0,
            username: "",
        },
    ]);
    const [feedback, setFeedback] = useState("");
    const { profile } = useContext(AuthContext);

    const { novel_id } = useParams();
    const { scrollIntoView, targetRef } = useScrollIntoView<
        HTMLDivElement,
        HTMLDivElement
    >();

    const handleGetNovelDetail = async () => {
        const [resNovel, resChapters, resGenres, resFeedback] =
            await Promise.all([
                novelService.getNovelById(Number(novel_id)),
                novelService.getChaptersByNovelId(Number(novel_id)),
                novelService.getGenresByNovelId(Number(novel_id)),
                novelService.getFeedbackByNovelId(Number(novel_id)),
            ]);

        setNovel(resNovel.data);
        setChapters(resChapters.data);
        setGenres(resGenres.data);
        setFeedBack(resFeedback.data);
    };

    useEffect(() => {
        handleGetNovelDetail();
    }, []);

    const handleSendFeedback = async () => {
        try {
            const payload = {
                user_id: profile.user_id,
                novel_id: Number(novel_id),
                feedback,
            };
            const resData = await novelService.feedbackNovel(payload);
            if (!resData.data) return alert("Bạn đã đánh giá rồi ? Cút ngay");
            const newFeedback = { ...resData.data, username: profile.username };
            setFeedBack((prev) => [...prev, newFeedback]);
            setFeedback("");
        } catch (error) {
            alert("Có lỗi hè hè");
        }
    };

    return (
        <Paper
            style={{
                width: "100%",
                marginTop: "30px",
                borderRadius: "2px",
                padding: "10px",
            }}
        >
            <Stack
                sx={{
                    border: "1px solid red",
                    borderRadius: "2px",
                    padding: "10px",
                }}
            >
                <Group>
                    <Flex>
                        <div style={{ height: "290px" }}>
                            <img
                                src={novel.novel_photo_url}
                                alt=""
                                style={{ height: "100%" }}
                            />
                        </div>

                        <Stack sx={{ marginLeft: "10px" }} spacing={3}>
                            <Text size="18px" fw={500}>
                                {novel.novel_name}
                            </Text>

                            <Flex gap="10px" wrap="wrap">
                                {genres.length > 0 &&
                                    genres.map(
                                        (item: {
                                            genre_id: number;
                                            genre_name: string;
                                        }) => (
                                            <Badge
                                                color="gray"
                                                key={item.genre_id}
                                            >
                                                {item.genre_name}
                                            </Badge>
                                        )
                                    )}
                            </Flex>

                            <Text>
                                <span
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Tác giả:{" "}
                                </span>
                                {novel.author}
                            </Text>
                            <Text>
                                <span
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Translator:{" "}
                                </span>
                                {novel.username}
                            </Text>
                            <Text>
                                <span
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Số sao trung bình:{" "}
                                </span>
                                {novel.avg_star ? novel.avg_star : "unknown"}
                            </Text>
                            <Text>
                                <span
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Lượt xem:{" "}
                                </span>
                                {novel.novel_view}
                            </Text>

                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "500",
                                    color: "brown",
                                }}
                            >
                                <Link
                                    to={`/novel/${novel.novel_id}/chapter/${
                                        chapters.length > 0 &&
                                        chapters[0].chapter
                                    }`}
                                >
                                    <Button>
                                        <Text size="18px">Đọc ngay</Text>
                                    </Button>
                                </Link>
                            </div>

                            <Flex gap={100}>
                                <Popover
                                    width={200}
                                    position="top"
                                    withArrow
                                    shadow="md"
                                >
                                    <Popover.Target>
                                        <Group>
                                            <IconStar
                                                color="yellow"
                                                size={30}
                                            />
                                            <Text size="20px" fw={500}>
                                                Đánh giá
                                            </Text>
                                        </Group>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        <Flex justify="center">
                                            <IconStar
                                                color="yellow"
                                                size={30}
                                            />
                                            <IconStar
                                                color="yellow"
                                                size={30}
                                            />
                                            <IconStar
                                                color="yellow"
                                                size={30}
                                            />
                                            <IconStar
                                                color="yellow"
                                                size={30}
                                            />
                                            <IconStar
                                                color="yellow"
                                                size={30}
                                            />
                                        </Flex>
                                    </Popover.Dropdown>
                                </Popover>

                                <Group
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                        scrollIntoView();
                                    }}
                                >
                                    <IconMenu2 size={30} />
                                    <Text size="20px" fw={500}>
                                        Mục lục
                                    </Text>
                                </Group>

                                <Group
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                        console.log("scroll");
                                        scrollIntoView();
                                    }}
                                >
                                    <IconMessageCircle2Filled size={30} />
                                    <Text size="20px" fw={500}>
                                        Feedback
                                    </Text>
                                </Group>
                            </Flex>
                        </Stack>
                    </Flex>
                </Group>

                <Stack>
                    <Text size="24px" fw={500}>
                        Tóm tắt
                    </Text>
                    <Text>{novel.novel_description}</Text>
                </Stack>
            </Stack>

            <Space h="30px"></Space>

            <Stack
                sx={{
                    border: "1px solid red",
                    borderRadius: "2px",
                    padding: "10px",
                }}
            >
                <Text size="24px" fw={500}>
                    Các chương
                </Text>
                <Stack spacing={2}>
                    {chapters.length > 0 &&
                        chapters.map(
                            (item: {
                                chapter: number;
                                chapter_name: string;
                            }) => (
                                <Link
                                    to={`/novel/${novel.novel_id}/chapter/${item.chapter}`}
                                    style={{
                                        width: "100%",
                                        textDecoration: "none",
                                    }}
                                >
                                    <Flex
                                        justify="space-between"
                                        sx={{
                                            width: "100%",
                                            padding: "0 10px",
                                            "&:hover": {
                                                background: "#d1c8c8",
                                            },
                                        }}
                                    >
                                        <Text color="black" size="18px">
                                            Chapter {item.chapter}:{" "}
                                            {item.chapter_name}
                                        </Text>

                                        <Text>05/07/2023</Text>
                                    </Flex>
                                </Link>
                            )
                        )}
                </Stack>
            </Stack>

            <Space h="30px"></Space>

            <Stack
                ref={targetRef}
                sx={{
                    border: "1px solid red",
                    borderRadius: "2px",
                    padding: "10px",
                }}
            >
                <Text size="24px" fw={500}>
                    Feedback
                </Text>

                <Flex align="center">
                    <Textarea
                        placeholder="Your feedback"
                        w={500}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <Button
                        h={40}
                        ml={10}
                        disabled={!feedback.length}
                        onClick={handleSendFeedback}
                    >
                        Send
                    </Button>
                </Flex>

                <Stack spacing={10}>
                    {feedBack.length > 0 &&
                        feedBack.map((item: any) => (
                            <Stack spacing={0}>
                                <Text size="18px" fw={500}>
                                    {item.username}
                                </Text>
                                <Box
                                    sx={(theme) => ({
                                        backgroundColor: theme.colors.gray[1],
                                        padding: "4px 10px",
                                        borderRadius: "4px",
                                    })}
                                >
                                    {item.feedback}
                                </Box>
                            </Stack>
                        ))}
                </Stack>
            </Stack>
        </Paper>
    );
}
