import { createContext, useContext, useEffect, useState } from "react";
import { saveToken, clearToken } from "../../services/authService";
import { userInfo } from '../../services/authService';
import { getCart } from "../../services/cartService";
import { getCategory } from "../../services/productService"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    // useState
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState("");
    const [username, setUsername] = useState("")
    const [cartList, setCartList] = useState([])
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])

    // check token, load user info and cart
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")
            setIsAuthenticated(!!token)

            if (!token) return;

            try {
                const user = await userInfo();
                setAvatarUrl(user.avatarUrl || "");
                setUsername(user.username || "")

                const cart = await getCart()
                    if (cart?.pios?.length > 0) {
                        const productList = cart.pios.reverse()
                        setCartList(productList)
                    } else {
                        setCartList([])
                }
                console.log('載入使用者資料成功')
            } catch (err) {
                console.log("載入使用者資料失敗", err);
            }
        };
        fetchUser();
    }, []);

    // load product categories
    useEffect(() => {
        try {
            const fetchCategory = async () => {
                const data = await getCategory()
                setCategories(data.categories)
                setSubcategories(data.subcategories)
            }
            fetchCategory()
        } catch (error) { 
            console.error("載入分類失敗", error);
        }
    },[])

    // Refresh cart data
    const toggleCart = async () => {
        try {
            if (!isAuthenticated) return;
            const cart = await getCart()
            const productList = cart.pios.reverse()
            setCartList(productList)
            console.log('更改購物車成功')
        } catch (err) {
            alert("更改購物車失敗", err);
        }
    }

    // login → save token and load user/cart
    const login = async (token) => {
        saveToken(token)
        setIsAuthenticated(true)
        try {
            const user = await userInfo();
            setAvatarUrl(user.avatarUrl || "");
            setUsername(user.username || "")

            const cart = await getCart()
            if (cart?.pios?.length > 0) {
                const productList = cart.pios.reverse()
                setCartList(productList)
            } else {
                setCartList([])
            }
            console.log('載入使用者資料成功')
        } catch (err) {
            console.warn("載入使用者資料失敗");
        }
    }

    // logout → clear token and reset state
    const logout = () => {
        clearToken()
        setIsAuthenticated(false)
        setAvatarUrl("")
        setCartList([])
    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, username, avatarUrl, setAvatarUrl, login, logout, cartList, setCartList, toggleCart, categories, subcategories }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext);
}