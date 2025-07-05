import { createContext, useContext, useEffect, useState } from "react";
import { saveToken, clearToken } from "../../services/authService";
import { userInfo } from '../../services/authService';

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")
            setIsAuthenticated(!!token)

            if (!token) return;

            try {
                const user = await userInfo();
                setAvatarUrl(user.avatarUrl || "");
            } catch (err) {
                console.warn("載入使用者失敗（可能未登入）");
            }
        };

        fetchUser();
    }, []);

    const login = async (token) => {
        saveToken(token)
        setIsAuthenticated(true)
        try {
            const user = await userInfo();
            setAvatarUrl(user.avatarUrl || "");
        } catch (err) {
            console.warn("載入使用者失敗（可能未登入）");
        }
    }

    const logout = () => {
        clearToken()
        setIsAuthenticated(false)
        setAvatarUrl("")
    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, avatarUrl, setAvatarUrl, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext);
}