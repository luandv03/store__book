import { Outlet } from "react-router-dom";

export function AuthApp() {
    return (
        <div style={{ width: "100%" }}>
            <Outlet />
        </div>
    );
}
