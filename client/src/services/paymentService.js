import api from "./api";

// 定義一個函數來調用後端支付 API
export const createPayment = async (totalAmount, itemName) => {
  try {
    const params = new URLSearchParams();
    params.append("TotalAmount", totalAmount);
    params.append("ItemName", itemName);

    const res = await api.post(
      `/payment/create_payment`,
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" }, //綠界要求格式用 x-www-form-urlencoded
      responseType: "text" }
    );
    return res.data; // api 自動轉 text
  } catch (error) {
    console.error('Error creating payment form:', error);
    throw error; // 重新拋出錯誤
  }
};

// 更改 status 用的，用JSON格式所以和和上面的先區隔開來，但好像也可以寫在一起
export const toggleStatus = async (ids, MerchantTradeNo) => {
  try {
    const response = await api.post(`/payment/toggle_status`, {ids, MerchantTradeNo});
    return response.data;
  } catch (error) {
    console.error('Error toggling status:', error);
    throw error;
  }
}

