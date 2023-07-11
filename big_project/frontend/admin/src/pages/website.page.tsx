import { HeaderWebsite } from "../components/website/Header/Header";
import { Footer } from "../components/website/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function WebsiteLayout() {
    return (
        <div style={{ width: "100%", position: "relative" }}>
            <HeaderWebsite />
            <div
                style={{
                    padding: "0 10px",
                    width: "100%",
                    marginTop: "60px",
                    minHeight: "calc(100vh - 60px - 85px - 30px)",
                }}
            >
                <div style={{ width: "100%" }}>
                    <img
                        src="https://docln.net/images/banners/4638_d_l.png"
                        alt=""
                        style={{ width: "100%" }}
                    />
                </div>
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}
