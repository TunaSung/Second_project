import { useState, useMemo, useCallback } from "react";
import { useAuth } from "../../../components/Context/authContext";
import { useChat } from "../../../components/Context/chatContext";

// library
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// API Service
import { userInfoById } from "../../../services/authService";

// Ui & icons
import { FaPlus, FaMinus } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import AddBtn from "./AddBtn";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "../../../style/Swiper.css";

function ProductItem({ product = {} }) {
  // 解構 + 防呆
  const images = useMemo(
    () => (Array.isArray(product.imageUrls) ? product.imageUrls : []),
    [product.imageUrls]
  );
  const tags = useMemo(
    () => (Array.isArray(product.hashTags) ? product.hashTags : []),
    [product.hashTags]
  );
  const stock = Math.max(0, Number(product.stock ?? 0));
  const price = Number(product.price ?? 0);

  // ui state
  const [isMsgHover, setIsMsgHover] = useState(false);
  const [amount, setAmount] = useState(1);

  // ctx
  const { currentUser } = useAuth();
  const { setActiveRoom, setIsChatOpen, setChatList } = useChat();

  // Chat: start conversation
  const handleStartChat = useCallback(async () => {
    const receiverId = product.sellerId;
    if (!currentUser?.id) {
      toast.info("請先登入再傳訊息");
      return;
    }
    if (!receiverId || receiverId === currentUser.id) return;

    const roomId = [currentUser.id, receiverId].sort().join("_");

    try {
      const user = await userInfoById(receiverId);

      setChatList((prev) => {
        const list = Array.isArray(prev) ? prev : [];
        if (list.find((r) => r.roomId === roomId)) return list;
        return [
          ...list,
          {
            roomId,
            receiverId,
            receiver: {
              id: user.id,
              username: user.username,
              avatarUrl: user.avatarUrl,
            },
          },
        ];
      });

      setActiveRoom({ roomId, receiverId });
      setIsChatOpen(true);
    } catch (error) {
      console.error("查詢對方資料失敗", error);
      toast.error("開啟聊天室失敗，請稍後再試");
    }
  }, [
    currentUser?.id,
    product.sellerId,
    setActiveRoom,
    setChatList,
    setIsChatOpen,
  ]);

  // Amount
  const togglePlus = () => setAmount((a) => Math.min(a + 1, stock || 1));
  const toggleMinus = () => setAmount((a) => Math.max(1, a - 1));

  return (
    <div className="w-full h-full flex group">
      {/* start img */}
      <div className="w-full h-full bg-cover-set rounded-2xl group-hover:w-1/2 transition-all duration-200 z-150">
        <Swiper
          id="product-img"
          loop={images.length > 3}
          effect={"fade"}
          grabCursor={true}
          pagination={{ clickable: true }}
          modules={[EffectFade, Pagination]}
          lazy={{ loadOnTransitionStart: true, loadPrevNext: true }}
          className="w-full h-full"
        >
          {images.map((fileUrl, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover-set rounded-2xl group-hover:rounded-r-none"
                style={{ backgroundImage: `url(${fileUrl})` }}
                aria-label={`product image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* end img */}

      {/* start info */}
      <div className="absolute left-1/2 w-0 p-4 h-full flex flex-col bg-none opacity-0 rounded-r-2xl group-hover:w-1/2 group-hover:opacity-100 group-hover:bg-[var(--tertiary-color)] transition-all duration-200 overflow-hidden">
        {/* title row */}
        <div className="flex justify-between mb-2">
          <p className="text-2xl text-[var(--primary-color)] line-clamp-1">
            {product.name}
          </p>

          {/* message button */}
          <button
            onClick={handleStartChat}
            className="relative border w-8 h-8 px-2 rounded-full scale-100 hover:scale-125 transition-all duration-200 overflow-hidden"
            onMouseEnter={() => setIsMsgHover(true)}
            onMouseLeave={() => setIsMsgHover(false)}
            aria-label="send message to seller"
            title="send message to seller"
          >
            <motion.div
              className="absolute -left-1 -top-1 w-9 h-9 border"
              style={{
                backgroundImage:
                  "linear-gradient(0deg,var(--quaternary-color) 0%, var(--tertiary-color) 33%, var(--secondary-color) 66%, var(--primary-color) 100%)",
              }}
              animate={{ y: isMsgHover ? ["100%", "0%"] : ["0%", "100%"] }}
              transition={{ y: { duration: 0.3, ease: "easeOut" } }}
            />
            <TiMessages className="absolute-mid text-xl" />
          </button>
        </div>

        {/* hashtags */}
        <div className="mb-2 flex flex-wrap">
          {tags.map((tag, index) => (
            <p
              key={`${tag}-${index}`}
              className="text-xs text-[#1f4428] inline px-1 rounded-3xl border bg-[#CAE8BD] mr-1"
            >
              {tag}
            </p>
          ))}
        </div>

        {/* start price & actions */}
        <div className="flex flex-col justify-between items-stretch mt-auto">
          {/* price */}
          <div className="flex items-end mb-3">
            <p className="text-white inline text-2xl mr-2">${price}</p>
            <p className="text-red-600/60 text-sm inline">stock: {stock}</p>
          </div>

          {/* controls */}
          <div className="w-full flex items-center justify-between">
            {/* amount */}
            <div
              id="amount"
              className="grid grid-cols-[1fr_1.5fr_1fr] mr-2 items-center border divide-x text-[var(--quaternary-color)] border-[var(--secondary-color)] divide-[var(--secondary-color)]"
            >
              <button
                onClick={toggleMinus}
                className="h-full flex justify-center items-center cursor-pointer p-1 disabled:text-[var(--secondary-color)] disabled:cursor-default"
                disabled={amount === 1}
                aria-label="decrease amount"
              >
                <FaMinus />
              </button>
              <div className="text-center" aria-live="polite">
                {amount}
              </div>
              <button
                onClick={togglePlus}
                className="h-full flex justify-center items-center cursor-pointer p-1 disabled:text-[var(--secondary-color)] disabled:cursor-default"
                disabled={amount === stock || stock === 0}
                aria-label="increase amount"
              >
                <FaPlus />
              </button>
            </div>

            {/* add-to-cart */}
            <AddBtn productId={product.id} amount={amount} stock={stock} />

          </div>
        </div>
        {/* end price & actions */}

      </div>
      {/* end info */}
    </div>
  );
}

export default ProductItem;
