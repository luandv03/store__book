import { useContext } from "react";
import { Stack, Flex, Text } from "@mantine/core";
import { AuthContext } from "../../../providers/AuthProvider";

export function Profile() {
    const { profile } = useContext(AuthContext);
    return (
        <Flex
            sx={{ width: "100%" }}
            justify="start"
            p={20}
            sx={{ border: "1px solid red" }}
        >
            <Stack>
                <Text size="24px" color="red">
                    My Profile
                </Text>
                <Text size="18px" fw={500}>
                    <span style={{ color: "blue" }}>Mã người dùng: </span>
                    {profile.user_id}
                </Text>
                <Text size="18px" fw={500}>
                    <span style={{ color: "blue" }}>Tên người dùng: </span>
                    {profile.username}
                </Text>
                <Text size="18px" fw={500}>
                    <span style={{ color: "blue" }}>Mail: </span>
                    {profile.mail}
                </Text>
                <Text size="18px" fw={500}>
                    <span style={{ color: "blue" }}>Địa chỉ: </span>
                    {profile.address || "Unknown"}
                </Text>
                <Text size="18px" fw={500}>
                    <span style={{ color: "blue" }}>Số điện thoại: </span>
                    {profile.phone_number || "Unknown"}
                </Text>
                <Text size="18px" fw={500}>
                    <span style={{ color: "blue" }}>Năm sinh: </span>
                    {profile.birth_year}
                </Text>
            </Stack>
        </Flex>
    );
}
