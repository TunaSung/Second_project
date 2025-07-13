import api from "./api";

export const uploadProduct = async (formData) => {
    try {
        const response = await api.post('/product/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "upload failed";
        console.error("upload error:", message);
        throw error.response?.data?.message || "upload failed";
    }
}

export const getCategory = async () => {
    try {
        const response = await api.get('/product/category')
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "get category failed";
        console.error("get category error:", message);
        throw error.response?.data?.message || "get category failed";
    }
}

export const getProduct = async (categoryId) => {
    try {
        const response = await api.post('/product/products', {categoryId})
        return response.data.products
    } catch (error) {
        const message = error.response?.data?.message || error.message || "get product failed";
        console.error("get product error:", message);
        throw error.response?.data?.message || "get product failed";
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

export const getHistory = async () => {
    try {
        const response = await api.get('/product/history')
        console.log('responseData: ',response.data)
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "get history failed";
        console.error("get history error:", message);
        throw error.response?.data?.message || "get history failed";
    }
}

export const searchProductsByName = async (keyword) => {
    try {
        const response = await api.post(`/product/search?keyword=${keyword}`)
        return response.data.products
    } catch (error) {
        const message = error.response?.data?.message || error.message || "get product failed";
        console.error("get product error:", message);
        throw error.response?.data?.message || "get product failed";
    }
}

export const updateMyShop = async (formData) => {
    try {
        for (let [key, value] of formData.entries()) {
            console.log("📤 formData:", key, value);
            }
        const response = await api.post('/product/update/my-shop', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "update failed";
        console.error("update error:", message);
        throw error.response?.data?.message || "update failed";
    }
}

export const updateAvailable = async (productId) => {
    try {
        const response = await api.post('/product/update/available', { productId })
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "update failed";
        console.error("update error:", message);
        throw error.response?.data?.message || "update failed";
    }
}