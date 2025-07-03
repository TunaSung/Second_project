import api from './api'

// 讓全部全域都能有token
export const saveToken = (token) => {
    localStorage.setItem("token", token)
    localStorage.setItem('tokenSaveAt', Date.now().toString())
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    // | ------------------------- | --------------------------------------------------------------- 
    // | defaults.headers.common   | 是 Axios 預設要加在所有請求上的 headers                           
    // | "Authorization"           | 是 HTTP 請求標頭中的「授權欄位」                                   
    // | `Bearer ${token}`         | 是帶上 token 的標準格式，`Bearer` 是一種 token 驗證方式（JWT 常用） 
}

// 頁面太久沒使用自動登出用的
export const clearToken = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("tokenSaveAt")
    delete api.defaults.headers.common["Authorization"]
}

// 頁面刷新後保留token
export const setAuthHeader = () =>{
    const token = localStorage.getItem("token")
    if(token){
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
}

// sign up
export const signUp = async (username, phone, email, password) => {
    try {
        console.log("🚀 註冊送出資料：", { username, phone, email, password })
        const response = await api.post('/auth/sign-up', {username, phone, email, password})
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Sign up failed";
    }
}


// sign in
export const signIn = async (email, password) => {
    try {
        const response = await api.post('/auth/sign-in', {email, password})
        return response.data
    } catch (error) {
        throw error.response?.data?.message || "Sign in failed";
    }
}