import { useTime } from "react-timer-hook";
import { Text } from "@mantine/core";

export function MyTime() {
    const { seconds, minutes, hours } = useTime({ format: "24-hour" });

    return (
        <div
            style={{
                textAlign: "center",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid red",
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: "40px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <span>{hours < 10 ? `0${hours}` : hours}</span>:
                    <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
                    <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                </div>
                <Text size="14px" fs="italic">
                    All we have to decide is what to do with the time that is
                    given us
                </Text>
            </div>
        </div>
    );
}
