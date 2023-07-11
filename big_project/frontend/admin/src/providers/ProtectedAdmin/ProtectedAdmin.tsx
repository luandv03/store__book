import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedAdmin({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    useEffect(() => {
        const logined = localStorage.getItem("isAdmin");

        if (!logined) {
            alert("Bạn hãy đăng nhập trước nhé");
            navigate("/dashboard");
        }
    }, []);

    return <>{children}</>;
}
