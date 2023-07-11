import {
    useEffect,
    useState,
    createContext,
    Dispatch,
    SetStateAction,
} from "react";
import { authService } from "../../services/auth.service";

export interface ProfileAdmin {
    admin_id: number;
    username: string;
    accessToken?: string;
    refreshToken?: string;
}

interface ContextValue {
    profileAdmin: ProfileAdmin;
    setProfileAdmin: Dispatch<SetStateAction<ProfileAdmin>>;
}

export const AdminContext = createContext<ContextValue>({
    profileAdmin: {
        admin_id: 0,
        username: "",
    },
    setProfileAdmin: () => {
        console.log();
    },
});

export default function AdminProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [profileAdmin, setProfileAdmin] = useState<ProfileAdmin>({
        admin_id: 0,
        username: "",
    });

    const handleGetProfileAdmin = async () => {
        const data = await authService.getProfileAdmin();

        if (!data.data.admin_id) {
            return localStorage.setItem("isAdmin", "false");
        }

        localStorage.setItem("isAdmin", "true");

        setProfileAdmin(data.data);
    };

    useEffect(() => {
        handleGetProfileAdmin();
    }, []);

    return (
        <AdminContext.Provider value={{ profileAdmin, setProfileAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}
