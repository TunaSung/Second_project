import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { toast } from "react-toastify";

// API services
import { updateAmount, deleteCart } from "../../services/cartService";

import { FaPlus, FaMinus } from "react-icons/fa";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "../../style/Swiper.css";

function CardItem({
  productId,
  title,
  amount,
  price,
  stock,
  hashTags,
  imageUrls,
  onClickChange,
  isChecked,
}) {
  // useState & useAuth
  const [itemAmount, setItemAmount] = useState(amount);
  const { toggleCart } = useAuth();

  // toggle plus & minus & delete functions
  const togglePlus = async () => {
    try {
      await updateAmount(productId, itemAmount + 1);
      toggleCart();
      setItemAmount(itemAmount + 1);
      console.log("調整成功");
    } catch (error) {
      console.log("調整失敗", error);
    }
  };
  const toggleMinus = async () => {
    try {
      await updateAmount(productId, itemAmount - 1);
      toggleCart();
      setItemAmount(itemAmount - 1);
      console.log("調整成功");
    } catch (error) {
      console.log("調整失敗");
    }
  };
  const handleDelete = async () => {
    try {
      await deleteCart(productId);
      toggleCart();
      toast.success("刪除成功");
      return null;
    } catch (error) {
      console.log("刪除失敗");
    }
  };

  return (
    <div className="border-b py-4 grid grid-cols-[1fr_6fr_12fr] gap-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onClickChange(e.target.checked, productId)}
        className="accent-[#537D5D]"
      />
      {/* start product img */}
      <Swiper
        id="product-img"
        loop={imageUrls > 3}
        effect={"fade"}
        grabCursor={true}
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination]}
        className="w-32 h-32"
      >
        {imageUrls.map((fileUrl, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover-set rounded-2xl group-hover:rounded-r-none"
              style={{
                backgroundImage: `url(${
                  import.meta.env.VITE_API_URL
                }${fileUrl})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* end product img */}

      {/* start product info */}
      <div className="flex flex-col justify-between h-full text-[#1f4428] gap-3">
        {/* start info detail */}
        <div className="flex justify-between">
          <div className="flex flex-col flex-wrap">
            <p>{title}</p>
            <div className="mb-2 flex flex-wrap">
              {hashTags.map((tag, index) => (
                <p
                  key={index}
                  className="text-xs inline px-1 rounded-3xl bg-[#CAE8BD] mr-1"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
          <div className="">${itemAmount * price}</div>
        </div>
        {/* end info detail */}

        {/* start quantity & remove */}
        <div className="flex justify-between h-8">
          <div
            id="amount"
            className="grid grid-cols-[1fr_1.5fr_1fr] items-center border divide-x text-[#3e6547] border-[#73946B] divide-[#73946B]"
          >
            <button
              onClick={toggleMinus}
              className="h-full flex justify-center items-center cursor-pointer p-1 disabled:text-[#9EBC8A] disabled:cursor-default"
              disabled={itemAmount === 1}
            >
              <FaMinus />
            </button>
            <div className="text-center">{itemAmount}</div>
            <button
              onClick={togglePlus}
              className="h-full flex justify-center items-center cursor-pointer p-1 disabled:text-[#9EBC8A] disabled:cursor-default"
              disabled={itemAmount === stock}
            >
              <FaPlus />
            </button>
          </div>
          <button
            onClick={handleDelete}
            className="border-b flex self-end hover:text-red-600 text-sm w-14 h-5 transition-all duration-200"
          >
            Remove
          </button>
        </div>
        {/* end quantity & remove */}
      </div>
      {/* end product info */}
    </div>
  );
}

export default CardItem;
