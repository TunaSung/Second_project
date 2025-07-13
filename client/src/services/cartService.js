import api from './api'

export const addToCart = async (productId, amount) => {
    try {
        const response = await api.post('/cart/add', {productId, amount})
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "add failed";
        console.error("add error:", message);
        throw error.response?.data?.message || "add failed";
    }
}

export const getCart = async () => {
    try {
        const response = await api.get('/cart')
        return response.data.order
    } catch (error) {
        const message = error.response?.data?.message || error.message || "get cart failed";
        console.error("get cart error:", message);
        throw error.response?.data?.message || "get cart failed";
    }
}

export const updateAmount = async (productId, amount) => {
    try {
        const response = await api.post('/cart/update', {productId, amount})
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "get cart failed";
        console.error("get cart error:", message);
        throw error.response?.data?.message || "get cart failed";
    }
}

export const deleteCart = async (productId) => {
    try {
        const response = await api.delete('/cart/delete', { data: { productId } })
        return response.data
    } catch (error) {
        const message = error.response?.data?.message || error.message || "delete failed";
        console.error("delete error:", message);
        throw error.response?.data?.message || "delete failed";
    }
}
