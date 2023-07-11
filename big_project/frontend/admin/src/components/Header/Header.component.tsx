import {
    Header,
    Group,
    Button,
    Text,
    Box,
    Menu,
    Modal,
    TextInput,
    // ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useState } from "react";
import { IconUserCircle, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { AdminContext } from "../../providers/AdminProvider/AdminProvider";
import { authService } from "../../services/auth.service";

export function HeaderApp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [opened, { open, close }] = useDisclosure(false);
    const { profileAdmin, setProfileAdmin } = useContext(AdminContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await authService.logoutAdmin();

        if (res.statusCode == 200) {
            alert(res.message);
            navigate("/");
            setProfileAdmin({
                admin_id: 0,
                username: "",
            });
            localStorage.removeItem("profile");
            localStorage.removeItem("isAdmin");
        }
    };

    const handleLogin = async () => {
        const res = await authService.loginAdmin({ username, password });

        if (res.statusCode == 200) {
            const resProfile = await authService.getProfileAdmin();
            setProfileAdmin(resProfile.data);
            localStorage.setItem("profile", resProfile.data);
            localStorage.setItem("isAdmin", "true");
            close();
        }
    };

    return (
        <Box>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: "100%" }}>
                    <Text size={24} fw={700} c="blue">
                        Dashboard
                    </Text>

                    {!profileAdmin?.admin_id ? (
                        <>
                            <Button variant="default" onClick={open}>
                                Đăng nhập
                            </Button>
                        </>
                    ) : (
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Button>{profileAdmin.username}</Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item icon={<IconUserCircle size={14} />}>
                                    My profile
                                </Menu.Item>
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
                <Modal
                    opened={opened}
                    onClose={close}
                    title="Authentication"
                    centered
                >
                    <TextInput
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="login"
                        placeholder="Your email"
                    />
                    <TextInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="password"
                        placeholder="Your email"
                        type="password"
                    />
                    <Button onClick={() => handleLogin()}>Login</Button>
                </Modal>
            </Header>
        </Box>
    );
}
