import api from "./api";

export const uploadProduct = async (formData) => {
    try {
        const response = await api.post('/product/upload', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(response.data)

        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "upload failed";
        console.error("upload error:", message);
        throw error.response?.data?.message || "upload failed";
    }
}

export const getMyShop = async () => {
    try {
        const response = await api.get('/product/my-shop')
        return response.data.product
    } catch (error) {
        const message = error.response?.data?.message || error.message || "get failed";
        console.error("get error:", message);
        throw error.response?.data?.message || "get failed";
    }
}