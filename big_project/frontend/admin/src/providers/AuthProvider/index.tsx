import {
    useEffect,
    useState,
    createContext,
    Dispatch,
    SetStateAction,
} from "react";
import { authService } from "../../services/auth.service";

export interface Profile {
    user_id: number;
    mail: string;
    username: string;
    address: string;
    phone_number: string;
    birth_year: number;
    accessToken?: string;
    refreshToken?: string;
}

interface ContextValue {
    profile: Profile;
    setProfile: Dispatch<SetStateAction<Profile>>;
}

export const AuthContext = createContext<ContextValue>({
    profile: {
        user_id: 0,
        mail: "",
        username: "",
        address: "",
        phone_number: "",
        birth_year: 0,
    },
    setProfile: () => {
        console.log();
    },
});

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [profile, setProfile] = useState<Profile>({
        user_id: 0,
        mail: "",
        username: "",
        address: "",
        phone_number: "",
        birth_year: 0,
    });

    const handleGetProfile = async () => {
        const data = await authService.getProfileUser();

        if (!data.data.user_id) {
            return localStorage.setItem("isAuthenticated", "false");
        }

        localStorage.setItem("isAuthenticated", "true");

        setProfile(data.data);
    };

    useEffect(() => {
        handleGetProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ profile, setProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
