import {
    Header,
    Group,
    Button,
    Text,
    Box,
    Input,
    Flex,
    Menu,
    SimpleGrid,
} from "@mantine/core";
import { IconSearch, IconChevronDown } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import {
    useState,
    useEffect,
    MouseEvent,
    KeyboardEvent,
    useContext,
} from "react";
import { IconUserCircle, IconLogout } from "@tabler/icons-react";

import { novelService } from "../../../services/novel.service";
import { authService } from "../../../services/auth.service";
import { AuthContext } from "../../../providers/AuthProvider";

interface Gerne {
    genre_id: string;
    genre_name: string;
}

export function HeaderWebsite() {
    const [gerne, setGerne] = useState([{ genre_id: "", genre_name: "" }]);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const { profile, setProfile } = useContext(AuthContext);

    const handleGetGerne = async () => {
        const data = await novelService.getAllGerne();

        setGerne(data.data);
    };

    const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            navigate("/novel/view?novel_name=" + searchValue);
        }
    };

    const handleRedirect = (e: MouseEvent<HTMLButtonElement>) => {
        if (!profile?.user_id) {
            e.preventDefault();
            alert("Hãy đăng nhập để đăng truyện nhé");
        }
    };

    const handleLogout = async () => {
        const res = await authService.logoutUser();
        if (res) {
            alert(res.message);
            setProfile({
                user_id: 0,
                mail: "",
                username: "",
                address: "",
                phone_number: "",
                birth_year: 0,
            });
        }
    };

    useEffect(() => {
        handleGetGerne();
    }, []);

    return (
        <Box
            sx={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                zIndex: "10",
            }}
        >
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: "100%" }}>
                    <Group>
                        <Flex justify="space-between" align="center">
                            <Link to="/">
                                <Box
                                    style={{
                                        backgroundColor: "#1d5167",
                                        width: "50px",
                                        borderRadius: "4px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src="https://docln.net/img/logo-9.png"
                                        alt=""
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    />
                                </Box>
                            </Link>

                            <Button
                                variant="subtle"
                                color="dark"
                                onClick={handleRedirect}
                            >
                                <Button disabled={!profile?.user_id}>
                                    <Text size={18} fw={500}>
                                        <Link
                                            to="/upload-novel"
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                            }}
                                        >
                                            Đăng truyện
                                        </Link>
                                    </Text>
                                </Button>
                            </Button>
                            <Menu>
                                <Menu.Target>
                                    <Button variant="subtle" color="dark">
                                        <Text size={18} fw={500}>
                                            Thể loại
                                        </Text>
                                        <IconChevronDown />
                                    </Button>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <SimpleGrid cols={7}>
                                        {gerne.length > 0 &&
                                            gerne.map((item: Gerne) => (
                                                <Link
                                                    to={`/novel/view/genre/${item.genre_id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <Menu.Item>
                                                        {item.genre_name}
                                                    </Menu.Item>
                                                </Link>
                                            ))}
                                    </SimpleGrid>
                                </Menu.Dropdown>
                            </Menu>
                        </Flex>

                        <Button variant="subtle" color="dark">
                            <Link
                                to="/category"
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <Text size={18} fw={500} color="black">
                                    Danh sách
                                </Text>
                            </Link>
                        </Button>
                    </Group>

                    <Group>
                        <Input
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            onKeyDown={handleSearch}
                            placeholder="Search"
                            rightSection={
                                <div>
                                    <div>
                                        <IconSearch
                                            size="1.2rem"
                                            style={{
                                                display: "block",
                                                opacity: 0.5,
                                            }}
                                        />
                                    </div>
                                </div>
                            }
                        />
                        {!profile?.user_id ? (
                            <>
                                <Link to="/auth/login">
                                    <Button variant="default">Đăng nhập</Button>
                                </Link>
                                <Link to="/auth/register">
                                    <Button variant="light">Đăng ký</Button>
                                </Link>
                            </>
                        ) : (
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Button>{profile.username}</Button>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Link
                                        to="/profile"
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                    >
                                        <Menu.Item
                                            icon={<IconUserCircle size={14} />}
                                        >
                                            My profile
                                        </Menu.Item>
                                    </Link>
                                    <Menu.Item
                                        icon={<IconLogout size={14} />}
                                        onClick={() => handleLogout()}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        )}
                    </Group>
                </Group>
            </Header>
        </Box>
    );
}
