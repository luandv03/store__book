import { Stack, Text, Flex, NavLink, Box, Space } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { NovelType, NovelConstant } from "../../../types/novel/novel.type";
import { novelService } from "../../../services/novel.service";
import { AuthContext } from "../../../providers/AuthProvider";

export function RegisterNovel() {
    const { profile } = useContext(AuthContext);
    const [myNovel, setMyNovel] = useState([NovelConstant]);

    const handleGetMyNovel = async () => {
        const resMyNovel = await novelService.getNovelByTransId(
            profile.user_id
        );
        setMyNovel(resMyNovel.data);
    };

    useEffect(() => {
        handleGetMyNovel();
    }, [profile.user_id]);

    return (
        <Stack sx={{ marginTop: "30px" }}>
            <Flex justify="space-between" style={{ width: "100%" }}>
                <Text size="24px" fw={500}>
                    My novel
                </Text>
                <Box>
                    <NavLink
                        label="Thêm truyện mới"
                        icon={<IconPlus size="1.4rem" />}
                        component="a"
                        href={`/novel/create/${profile.user_id}`}
                        sx={{
                            color: "blue",
                            fontWeight: "500",
                        }}
                    />
                </Box>
            </Flex>
            <Stack sx={{ width: "100%" }}>
                {myNovel.length > 0 &&
                    myNovel.map((novel: NovelType) => (
                        <Flex
                            sx={{
                                height: "224px",
                                padding: "10px",
                                border: "1px solid red",
                            }}
                            key={novel.novel_id}
                        >
                            <div style={{ width: "200px", height: "100%" }}>
                                <img
                                    src={novel.novel_photo_url}
                                    alt=""
                                    style={{ height: "100%" }}
                                />
                            </div>
                            <Stack sx={{ flex: "1", marginLeft: "10px" }}>
                                <Link
                                    to={`/novel/${novel.novel_id}/detail`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Text
                                        size="20px"
                                        fw={500}
                                        sx={{
                                            "&:hover": {
                                                color: "gray",
                                                textDecoration: "underline",
                                            },
                                        }}
                                        color="black"
                                    >
                                        {novel.novel_name}
                                    </Text>
                                </Link>
                                <Flex>
                                    <Text>
                                        <span
                                            style={{
                                                color: "gray",
                                            }}
                                        >
                                            Lượt đọc
                                        </span>
                                        : {novel.novel_view}
                                    </Text>
                                    <Space w="sm"></Space>
                                    <Text fs="italic">
                                        <span style={{ color: "gray" }}>
                                            Số chương
                                        </span>
                                        : {novel.total_chapters}
                                    </Text>
                                </Flex>

                                <Text size="16px" lineClamp={3}>
                                    {novel.novel_description}
                                </Text>
                                <Link
                                    to={`/novel/${novel.novel_id}/add_chapter`}
                                >
                                    <Flex>
                                        <IconPlus color="blue" />
                                        <Text color="blue">
                                            Thêm chương mới
                                        </Text>
                                    </Flex>
                                </Link>
                            </Stack>
                        </Flex>
                    ))}
            </Stack>
        </Stack>
    );
}
