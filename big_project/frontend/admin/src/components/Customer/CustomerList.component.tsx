import {
    Table,
    Stack,
    Group,
    NativeSelect,
    Flex,
    NavLink,
    Box,
    Pagination,
    ActionIcon,
} from "@mantine/core";
import { IconDownload, IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar.component";
import { useEffect } from "react";
import { authService } from "../../services/auth.service";

interface TransType {
    user_id: number;
    mail: string;
    address: string;
    username: string;
    phone_number: string;
    birth_year: number;
}

export function CustomerList() {
    const [trans, setTrans] = useState<TransType[]>([
        {
            user_id: 0,
            phone_number: "",
            address: "",
            mail: "",
            username: "",
            birth_year: 0,
        },
    ]);

    const handleGetTrans = async () => {
        const resTrans = await authService.getTrans();

        if (resTrans.statusCode === 200) {
            setTrans(resTrans.data);
        }
    };

    useEffect(() => {
        handleGetTrans();
    }, []);

    const rows =
        trans.length > 0 &&
        trans.map((item: TransType) => {
            return (
                <tr key={item.user_id}>
                    <td>{item.user_id}</td>
                    <td>{item.username}</td>
                    <td>{item.mail}</td>
                    <td>{item.address && "unknown"}</td>
                    <td>{item.phone_number && "unknown"}</td>
                    <td>{item.birth_year}</td>
                    <td>
                        <Link to={`/product/${item.user_id}`}>
                            <ActionIcon>
                                <IconEye />
                            </ActionIcon>
                        </Link>
                    </td>
                </tr>
            );
        });

    return (
        <Stack>
            <Group>
                <Flex sx={{ width: "100%" }} justify="space-between">
                    <Group>
                        <SearchBar />
                        <NativeSelect
                            data={[
                                "Họ và tên",
                                "Email",
                                "Địa chỉ",
                                "Số điện thoại",
                                "Ngày sinh",
                            ]}
                            withAsterisk
                        />
                    </Group>

                    <Group>
                        <NativeSelect data={["Tất cả"]} withAsterisk />

                        <Box>
                            <NavLink
                                label="EXPORT"
                                icon={<IconDownload size="1.4rem" />}
                                sx={{
                                    color: "blue",
                                    fontWeight: "500",
                                }}
                            />
                        </Box>
                    </Group>
                </Flex>
            </Group>

            <Table miw={800} verticalSpacing="sm" striped>
                <thead>
                    <tr>
                        <th>Trans_id</th>
                        <th>Họ và tên</th>
                        <th>Mail</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Năm sinh</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>

            <Flex sx={{ width: "100%" }} justify="flex-end">
                <Pagination total={10} />
            </Flex>
        </Stack>
    );
}
