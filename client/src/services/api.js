import axios from 'axios'

const Base = import.meta.env.VITE_API_URL || ""

const api = axios.create({
    baseURL: Base + '/api',
    withCredentials: true 
})

export default api