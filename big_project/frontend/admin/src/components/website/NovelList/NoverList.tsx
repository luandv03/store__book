import {
    SimpleGrid,
    Text,
    Stack,
    createStyles,
    NativeSelect,
    Group,
} from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { NovelConstant, NovelType } from "../../../types/novel/novel.type";
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

export function NovelList() {
    const { classes } = useStyles();
    const [filter, setFilter] = useState("A-Z");
    const [novels, setNovels] = useState([NovelConstant]);

    const handleGetNovels = async () => {
        if (filter == "A-Z") {
            const resData = await novelService.getNovelOrderByName();

            setNovels(resData.data);
        } else if (filter == "Lượt đọc") {
            const resData = await novelService.listNovelByViews();

            setNovels(resData.data);
        } else {
            const resData = await novelService.listNovelByStars();

            setNovels(resData.data);
        }
    };

    useEffect(() => {
        handleGetNovels();
    }, [filter]);

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

            <NativeSelect
                data={["A-Z", "Lượt đọc", "Số sao"]}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{ width: "200px" }}
            />

            <SimpleGrid
                cols={5}
                sx={{ marginTop: "10px", width: "100%" }}
                verticalSpacing={35}
            >
                {novels.length > 0 &&
                    novels.map((novel: NovelType) => (
                        <Link to={`/novel/${novel.novel_id}/detail`}>
                            <div
                                className={classes.itemNovel}
                                style={{
                                    position: "relative",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    marginRight: "20px",
                                    width: "210px",
                                    height: "300px",
                                    backgroundImage: `url(${novel.novel_photo_url})`,
                                }}
                                key={novel.novel_id}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "0",
                                        left: "0",
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
                                        {novel.novel_name}
                                    </Text>
                                </div>
                            </div>
                        </Link>
                    ))}
            </SimpleGrid>
        </Stack>
    );
}
