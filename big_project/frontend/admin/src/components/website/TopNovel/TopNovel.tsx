import {
    Flex,
    Stack,
    Text,
    ScrollArea,
    Grid,
    createStyles,
} from "@mantine/core";
import { IconTrophyFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { MyTime } from "../Timer/Timer";
import { novelService } from "../../../services/novel.service";

const useStyles = createStyles({
    itemNovel: {
        "&:hover": {
            cursor: "pointer",
            boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        },
    },
});

interface NovelType {
    novel_id: number;
    trans_id: number;
    author: string;
    composed_year: number;
    novel_name: string;
    novel_view: number;
    novel_photo_url: string;
}

export function TopNovel() {
    const [topNovel, setTopNovel] = useState([
        {
            novel_id: 0,
            trans_id: 0,
            author: "",
            composed_year: 0,
            novel_name: "",
            novel_view: 0,
            novel_photo_url: "",
        },
    ]);

    const { classes } = useStyles();

    const handleGetTopNovel = async () => {
        const data = await novelService.getNovelTopView();

        setTopNovel(data.data);
    };

    useEffect(() => {
        handleGetTopNovel();
    }, []);

    return (
        <Stack sx={{ marginTop: "25px" }}>
            <Flex
                sx={{
                    width: "100px",
                    height: "40px",
                    backgroundColor: "black",
                }}
                align="center"
                justify="center"
            >
                <IconTrophyFilled
                    style={{ color: "yellow", marginRight: "4px" }}
                />
                <Text fw={600} color="white">
                    Nổi bật
                </Text>
            </Flex>
            <Grid sx={{ width: "100%" }}>
                <Grid.Col span={9}>
                    <ScrollArea>
                        <div
                            style={{
                                overflowX: "scroll",
                                flex: "1",
                                display: "flex",
                            }}
                        >
                            {topNovel.length > 0 &&
                                topNovel.map((item: NovelType) => (
                                    <Link to={`/novel/${item.novel_id}/detail`}>
                                        <div
                                            className={classes.itemNovel}
                                            style={{
                                                position: "relative",
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                marginRight: "20px",
                                                width: "210px",
                                                height: "300px",
                                                backgroundImage: `url(${item.novel_photo_url})`,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    bottom: "0",
                                                    left: "0",
                                                    right: "0",
                                                    boxShadow:
                                                        "rgba(0, 0, 0, 0.35) 0px -50px 36px 1px inset",
                                                }}
                                            >
                                                <Text
                                                    size={18}
                                                    fw={500}
                                                    color="white"
                                                    lineClamp={2}
                                                    sx={{ textAlign: "center" }}
                                                >
                                                    {item.novel_name}
                                                </Text>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </ScrollArea>
                </Grid.Col>
                <Grid.Col span={3}>
                    <MyTime />
                </Grid.Col>
            </Grid>
        </Stack>
    );
}
