import { Center, Flex, Text } from "@mantine/core";

export function Footer() {
    return (
        <Flex
            justify="space-between"
            sx={{
                height: "85px",
                background: "#333",
                padding: "0 10px",
                marginTop: "30px",
                width: "100%",
            }}
        >
            <Center>
                <Text size={18} fw={500} color="white">
                    © Copyright 2023 - POWERED BY HUST
                </Text>
            </Center>

            <Center>
                <Flex>
                    <Text size={16} fw={500} color="white" mr="5px">
                        Contact:
                    </Text>
                    <Text size={16} fw={500} color="#5fff46" underline>
                        phunguyenduc99@gmail.com
                    </Text>
                </Flex>
            </Center>
        </Flex>
    );
}
