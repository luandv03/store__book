import {
    SimpleGrid,
    Text,
    Stack,
    createStyles,
    Group,
    Center,
} from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { novelService } from "../../../services/novel.service";
import { Link } from "react-router-dom";

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
    novel_id: string;
    trans_id: string;
    author: string;
    composed_year: number;
    novel_name: string;
    novel_view: number;
    novel_photo_url: string;
}

export function NovelByGenre() {
    const { classes } = useStyles();

    const [novels, setNovels] = useState([
        {
            novel_id: "",
            trans_id: "",
            author: "",
            composed_year: 0,
            novel_name: "",
            novel_view: 0,
            novel_photo_url: "",
        },
    ]);

    const { genre_id } = useParams();

    const handleGetNovels = async () => {
        const data = await novelService.getNovelByGenre(genre_id as string);
        console.log(data);
        setNovels(data.data);
    };

    useEffect(() => {
        handleGetNovels();
    }, [genre_id]);

    return (
        <Stack style={{ width: "100%", marginTop: "50px" }}>
            <Stack>
                <Group>
                    <IconMenu2 />
                    <Text size={30} fw={500} sx={{ marginLeft: "5px" }}>
                        Danh sách truyện
                    </Text>
                </Group>
            </Stack>

            <SimpleGrid
                cols={5}
                sx={{ marginTop: "10px", width: "100%" }}
                verticalSpacing={35}
                sx={{ position: "relative" }}
            >
                {novels.length > 0 ? (
                    novels.map((item: NovelType) => (
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
                                key={item.novel_id}
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
                                        align="center"
                                    >
                                        {item.novel_name}
                                    </Text>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <>
                        <Center
                            sx={{
                                width: "100%",
                                position: "absolute",
                                left: 0,
                                top: 0,
                            }}
                        >
                            <Text size="24px" fw={500} color="gray">
                                Not result
                            </Text>
                        </Center>
                    </>
                )}
            </SimpleGrid>
        </Stack>
    );
}
