import { useState } from "react";
import { useAuth } from "../components/Context/authContext";
import { useNavigate } from "react-router-dom";

// API Service
import { createPayment, toggleStatus } from "../services/paymentService";

// UI & Icons
import CardItem from "../components/Feature/CardItem";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Cart({ isCartOpen, setIsCartOpen }) {
  // useAuth
  const { cartList, toggleCart } = useAuth();

  // State
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectAll, setSelectAll] = useState(false);

  // change path
  const navigate = useNavigate();

  // calculate total price
  useEffect(() => {
    const newTotal = cartList.reduce((sum, item) => {
      return selectedItems.has(item.product.id)
        ? sum + item.product.price * item.amount
        : sum;
    }, 0);
    setTotalPrice(newTotal);
  }, [cartList, selectedItems]);

  // Handling changes to checked items
  const handleCheckChange = async (isChecked, productId) => {
    const updated = new Set(selectedItems);
    if (isChecked) updated.add(productId);
    else updated.delete(productId);

    setSelectedItems(updated);
    // 如果全部勾完，header 也要打勾
    setSelectAll(updated.size === cartList.length);
  };

  const handleSelectAllChange = (isChecked) => {
    setSelectAll(isChecked);
    if (isChecked) {
      toggleCart();

      // 把所有商品 id 都加入 Set
      const allIds = cartList.map((item) => item.product.id);
      const newSet = new Set(allIds);
      setSelectedItems(newSet);
    } else {
      // 取消全選就清空
      setSelectedItems(new Set());
    }
  };

  // handle payment process
  const handlePayment = async () => {
    if (selectedItems.size === 0) {
      alert("請選擇至少一個商品進行結帳！");
      return;
    }

    const idsArray = Array.from(selectedItems);
    console.log("🔎 IDs to toggle:", idsArray);

    // 獲取選中的商品名稱
    const selectedProductNames = cartList
      .filter((item) => selectedItems.has(item.product.id))
      .map(
        (item) => `${item.product.name} $${item.product.price}*${item.amount}`
      )
      .join("#");
    try {
      // 呼叫 createPayment 來處理支付流程
      const paymentFormHtml = await createPayment(
        totalPrice,
        selectedProductNames
      );

      // 動態創建表單並插入到頁面
      const formContainer = document.createElement("div");
      formContainer.innerHTML = paymentFormHtml;

      // 抓出 hidden input 的 MerchantTradeNo
      const form = formContainer.querySelector("form");
      const tradeNoInput = form.querySelector('input[name="MerchantTradeNo"]');
      const merchantTradeNo = tradeNoInput.value;
      await toggleStatus(idsArray, merchantTradeNo);

      form.setAttribute("target", "_blank"); // 讓表單跳至新分頁
      document.body.appendChild(form); // 插入到頁面
      form.submit(); // 提交表單，跳轉到綠界支付頁面
      navigate("/"); // 跳轉到首頁
      toggleCart();
    } catch (error) {
      console.error("支付失敗", error);
      alert("支付過程中出錯，請稍後再試");
    } finally {
      setIsProcessingPayment(false); // 重設為非處理狀態
    }
  };

  return (
    <motion.div
      id="cart-page"
      className="fixed right-0 h-full shadow-2xl grid grid-rows-[auto_1fr_auto] rounded-l-xl z-200 bg-[#D2D0A0] overflow-hidden transition-all duration-150"
      style={{ width: isCartOpen ? "30%" : "0%" }}
    >
      {/* start header */}
      <div className="mb-2 h-26 px-8 cart-container">
        <div className="border-b py-8 w-full h-full flex items-center justify-between">
          {/* start title & quantity */}
          <div className="flex">
            <h1 className="text-5xl text-[#537D5D] indie-flower-regular mr-3 font-bold">
              Your Cart
            </h1>
            <p className="rounded-3xl text-xs text-[#f9f7d3] h-lh py-3 px-4 font-bold bg-[#73946B] flex items-center justify-center">
              {cartList.length} items
            </p>
          </div>
          {/* end title & quantity */}

          {/* start close btn */}
          <MdClose
            onClick={() => {
              setIsCartOpen(false);
            }}
            className="text-3xl cursor-pointer hover:text-red-500"
          />
          {/* end close btn */}
        </div>
      </div>
      {/* end header */}

      {/* start card items */}
      <div className="cart-container overflow-y-scroll cart-scroll mb-2">
        <div className="h-full w-full">
          {cartList.map((item) => (
            <CardItem
              key={item.id}
              productId={item.product.id}
              title={item.product.name}
              amount={item.amount}
              price={item.product.price}
              stock={item.product.stock}
              hashTags={item.product.hashTags}
              imageUrls={item.product.imageUrls}
              onClickChange={handleCheckChange}
              isChecked={selectedItems.has(item.product.id)}
            />
          ))}
        </div>
      </div>
      {/* end card items */}

      {/* start checkout */}
      <div className="cart-container flex-col bg-[#67AE6E] rounded-t-3xl rounded-bl-xl py-8">
        <div className="w-full">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={(e) => handleSelectAllChange(e.target.checked)}
            className="scale-150 accent-[#537D5D]"
          />
        </div>

        {/* start subtotal */}
        <div className="flex w-full justify-between text-lg mb-2">
          <p>Subtotal</p>
          <p>${totalPrice}</p>
        </div>
        {/* end subtotal */}

        {/* start check out btn */}
        <button
          onClick={handlePayment}
          className="w-full text-lg text-white rounded-lg py-2 bg-[#537D5D] border-white border-2 hover:bg-[#d6d5a4] hover:text-[#497152] transition-all duration-200"
        >
          Check out
        </button>
        {/* end check out btn */}
      </div>
      {/* end checkout */}
    </motion.div>
  );
}

export default Cart;
