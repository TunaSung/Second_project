import { createContext, useContext, useEffect, useState } from "react";
import { saveToken, clearToken } from "../../services/authService";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsAuthenticated(!!token) // !! null就回傳false，反之則是true
    }, [])

    const login = (token) => {
        saveToken(token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        clearToken()
        setIsAuthenticated(false)
    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)