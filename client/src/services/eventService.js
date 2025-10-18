import api from "./api";

export const getEvents = async () => {
    try {
        const response = await api.get('/event/')
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "get category failed";
        console.error("get event error:", message);
        throw error.response?.data?.message || "get event failed";
    }
}