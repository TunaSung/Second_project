import { useState, useMemo, useCallback, useEffect } from "react";
import { useAuth } from "../../components/Context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// API Service
import { createPayment, toggleStatus } from "../../services/paymentService";

// UI & Icons
import CardItem from "./component/CardItem";
import { MdClose } from "react-icons/md";

function Cart({ isCartOpen, setIsCartOpen }) {
  // context
  const { cartList, toggleCart } = useAuth();

  // local state
  const [selectedItems, setSelectedItems] = useState(() => new Set());
  const [processing, setProcessing] = useState(false);

  // router
  const navigate = useNavigate();

  // derived: select all + subtotal
  const selectAllChecked = useMemo(
    () => cartList.length > 0 && selectedItems.size === cartList.length,
    [cartList.length, selectedItems]
  );

  const totalPrice = useMemo(
    () =>
      cartList.reduce(
        (sum, item) =>
          selectedItems.has(item.product.id)
            ? sum + item.product.price * item.amount
            : sum,
        0
      ),
    [cartList, selectedItems]
  );

  // currency formatter（預設 TWD；要改幣別可換 currency）
  const currency = useMemo(
    () => new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }),
    []
  );

  // keep selections valid if cartList changes
  useEffect(() => {
    setSelectedItems(prev => {
      const ids = new Set(cartList.map(i => i.product.id));
      const next = new Set();
      prev.forEach(id => { if (ids.has(id)) next.add(id); });
      return next;
    });
  }, [cartList]);

  // handlers
  const handleCheckChange = useCallback((isChecked, productId) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (isChecked) next.add(productId);
      else next.delete(productId);
      return next;
    });
  }, []);

  const handleSelectAllChange = useCallback((isChecked) => {
    setSelectedItems(() =>
      isChecked ? new Set(cartList.map(i => i.product.id)) : new Set()
    );
  }, [cartList]);

  const handlePayment = useCallback(async () => {
    if (processing) return;
    if (selectedItems.size === 0) {
      toast.info("請選擇至少一個商品進行結帳");
      return;
    }

    try {
      setProcessing(true);

      const idsArray = Array.from(selectedItems);

      // 組品項字串（例：Name $Price*Amount#...）
      const selectedProductNames = cartList
        .filter(i => selectedItems.has(i.product.id))
        .map(i => `${i.product.name} $${i.product.price}*${i.amount}`)
        .join("#");

      // 建立付款表單（由後端回傳 HTML form）
      const paymentFormHtml = await createPayment(totalPrice, selectedProductNames);

      // 解析表單與訂單編號
      const tmp = document.createElement("div");
      tmp.innerHTML = paymentFormHtml;
      const form = tmp.querySelector("form");
      if (!form) throw new Error("支付表單建立失敗");

      const tradeNoInput = form.querySelector('input[name="MerchantTradeNo"]');
      const merchantTradeNo = tradeNoInput?.value;
      if (!merchantTradeNo) throw new Error("缺少 MerchantTradeNo");

      // 設定已選商品的交易單號（後端可標記 pending）
      await toggleStatus(idsArray, merchantTradeNo);

      // 送出表單到綠界（新分頁）
      form.setAttribute("target", "_blank");
      document.body.appendChild(form);
      form.submit();

      // 關閉購物車、回首頁並刷新購物車資料
      setIsCartOpen(false);
      navigate("/");
      toggleCart();
    } catch (error) {
      console.error("支付失敗", error);
      toast.error("支付過程中出錯，請稍後再試");
    } finally {
      setProcessing(false);
    }
  }, [processing, selectedItems, cartList, totalPrice, setIsCartOpen, navigate, toggleCart]);

  return (
    <motion.aside
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      aria-hidden={isCartOpen ? "false" : "true"}
      id="cart-page"
      className="fixed right-0 h-screen shadow-2xl grid grid-rows-[auto_1fr_auto] rounded-l-xl z-1000 bg-[#D2D0A0] overflow-hidden"
      initial={false}
      animate={{ width: isCartOpen ? "30%" : "0%" }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      {/* Header */}
      <header className="mb-2 h-26 px-8 cart-container">
        <div className="border-b py-8 w-full h-full flex items-center justify-between">
          <div className="flex">
            <h1 className="text-5xl text-[#537D5D] indie-flower-regular mr-3 font-bold">
              Your Cart
            </h1>
            <p
              className="rounded-3xl text-xs text-[#f9f7d3] h-lh py-3 px-4 font-bold bg-[#73946B] flex items-center justify-center"
              aria-live="polite"
            >
              {cartList.length} items
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="text-3xl cursor-pointer hover:text-red-500"
            aria-label="Close cart"
            title="Close cart"
          >
            <MdClose />
          </button>
        </div>
      </header>

      {/* Items */}
      <section className="cart-container overflow-y-auto cart-scroll mb-2" aria-label="Cart items">
        {cartList.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-[#537D5D]">
            購物車是空的𓆟 𓆞 𓆝
          </div>
        ) : (
          <ul role="list" className="h-full w-full">
            {cartList.map((item) => (
              <li key={item.id} role="listitem">
                <CardItem
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
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Checkout */}
      <footer className="cart-container flex-col bg-[#67AE6E] rounded-t-3xl rounded-bl-xl py-8">
        <div className="w-full mb-3 flex items-center gap-3">
          <input
            id="select-all"
            type="checkbox"
            checked={selectAllChecked}
            disabled={cartList.length === 0}
            onChange={(e) => handleSelectAllChange(e.target.checked)}
            className="scale-150 accent-[#537D5D]"
            aria-label="Select all items"
          />
          <label htmlFor="select-all">Select all</label>
        </div>

        <div className="flex w-full justify-between text-lg mb-2">
          <p>Subtotal</p>
          <p aria-live="polite">{currency.format(totalPrice)}</p>
        </div>

        <button
          onClick={handlePayment}
          disabled={processing || selectedItems.size === 0 || totalPrice <= 0}
          className="w-full text-lg text-white rounded-lg py-2 bg-[#537D5D] border-white border-2
                     hover:bg-[#d6d5a4] hover:text-[#497152] transition-all duration-200
                     disabled:opacity-60 disabled:cursor-not-allowed"
          aria-busy={processing ? "true" : "false"}
        >
          {processing ? "Processing..." : "Check out"}
        </button>
      </footer>
    </motion.aside>
  );
}

export default Cart;
