import {
    SimpleGrid,
    Text,
    Stack,
    Flex,
    createStyles,
    Loader,
    Center,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { novelService } from "../../../services/novel.service";
import { NovelConstant, NovelType } from "../../../types/novel/novel.type";

const useStyles = createStyles({
    itemNovel: {
        "&:hover": {
            cursor: "pointer",
            boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        },
    },
});

export function SearchPage() {
    const [novels, setNovels] = useState([NovelConstant]);
    const [loading, setLoading] = useState(false);
    const { classes } = useStyles();
    const [searchParams] = useSearchParams();

    const handleGetNovels = async () => {
        setLoading(false);
        const resNovel = await novelService.getNovelsBySearchName(
            searchParams.get("novel_name") as string
        );
        setLoading(true);

        setNovels(resNovel.data);
    };

    useEffect(() => {
        handleGetNovels();
    }, [searchParams.get("novel_name")]);

    return (
        <Stack sx={{ width: "100%", marginTop: "50px" }}>
            <Flex align="center" sx={{ borderBottom: "3px solid brown" }}>
                <IconSearch size={30} />
                <Text size={30} fw={500} sx={{ marginLeft: "5px" }}>
                    Search Results ({novels.length})
                </Text>
            </Flex>
            {!loading ? (
                <Center>
                    <Loader variant="dots" />
                </Center>
            ) : (
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
            )}
        </Stack>
    );
}
