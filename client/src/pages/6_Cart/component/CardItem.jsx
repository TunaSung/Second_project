import { useState, useMemo, useCallback } from "react";
import { useAuth } from "../../../components/Context/authContext";
import { toast } from "react-toastify";

// API services
import { updateAmount, deleteCart } from "../../../services/cartService";

// Icons
import { FaPlus, FaMinus } from "react-icons/fa";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "../../../style/Swiper.css";

/**
 * Cart line item
 * - Semantic: <article>, <figure>, <ul>/<li>
 * - A11y: labelled checkbox, aria-live on subtotal
 * - UX: safe clamps, disabled buttons during API ops, robust errors
 */
function CardItem({
  productId,
  title,
  amount,
  price,
  stock,
  hashTags = [],
  imageUrls = [],
  onClickChange,
  isChecked,
}) {
  const [itemAmount, setItemAmount] = useState(amount);
  const [pending, setPending] = useState(false);
  const { toggleCart } = useAuth();

  const apiBase = import.meta.env.VITE_API_URL || "";

  // currency & subtotal
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "TWD",
        maximumFractionDigits: 0,
      }),
    []
  );
  const subtotal = useMemo(() => itemAmount * price, [itemAmount, price]);

  // Swiper settings
  const SWIPER_SETTINGS = useMemo(
    () => ({
      loop: imageUrls.length > 3,
      effect: "fade",
      grabCursor: true,
      pagination: { clickable: true },
      modules: [EffectFade, Pagination],
      className: "w-32 h-32",
    }),
    [imageUrls.length]
  );

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const applyAmount = useCallback(
    async (next) => {
      if (pending) return;
      const clamped = clamp(next, 1, stock);
      if (clamped === itemAmount) return;

      try {
        setPending(true);
        await updateAmount(productId, clamped);
        setItemAmount(clamped);
        toggleCart(); // refresh cart badge/summary in context
      } catch (err) {
        console.error("更新數量失敗", err);
        toast.error("更新數量失敗，請稍後再試");
      } finally {
        setPending(false);
      }
    },
    [pending, stock, itemAmount, productId, toggleCart]
  );

  const togglePlus = () => applyAmount(itemAmount + 1);
  const toggleMinus = () => applyAmount(itemAmount - 1);

  const handleDelete = useCallback(async () => {
    if (pending) return;
    try {
      setPending(true);
      await deleteCart(productId);
      toggleCart();
      toast.success("刪除成功");
    } catch (err) {
      console.error("刪除失敗", err);
      toast.error("刪除失敗，請稍後再試");
    } finally {
      setPending(false);
    }
  }, [pending, productId, toggleCart]);

  return (
    <article
      className="border-b py-4 grid grid-cols-[1fr_6fr_12fr] gap-3"
      aria-label={title}
      role="listitem"
    >
      {/* select checkbox */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onClickChange(e.target.checked, productId)}
  className="accent-[var(--primary-color)]"
        aria-label={`Select ${title}`}
      />

      {/* product images */}
      <figure aria-label={`${title} images`}>
        <Swiper {...SWIPER_SETTINGS}>
          {imageUrls.map((fileUrl, index) => (
            <SwiperSlide key={`${fileUrl}-${index}`}>
              <img
                src={`${apiBase}${fileUrl}`}
                alt={`${title} - image ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </figure>

      {/* product info */}
      <div className="flex flex-col justify-between h-full text-[var(--quateranry-color)] gap-3">
        {/* title, tags, subtotal */}
        <div className="flex justify-between">
          <div className="flex flex-col flex-wrap">
            <h3 className="font-medium">{title}</h3>

            {hashTags.length > 0 && (
              <ul className="mb-2 flex flex-wrap" role="list" aria-label="hashtags">
                {hashTags.map((tag, index) => (
                  <li key={`${tag}-${index}`} role="listitem">
                    <span className="text-xs inline px-1 rounded-3xl bg-[#CAE8BD] mr-1">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div aria-live="polite" className="tabular-nums">
            {currency.format(subtotal)}
          </div>
        </div>

        {/* quantity & remove */}
        <div className="flex justify-between h-8">
          <div
            id="amount"
            className="grid grid-cols-[1fr_1.5fr_1fr] items-center border divide-x text-[var(--quaterary-color)] border-[var(--secondary-color)] divide-[var(--secondary-color)]"
            aria-label="Quantity selector"
          >
            <button
              type="button"
              onClick={toggleMinus}
              className="h-full flex justify-center items-center cursor-pointer p-1 disabled:text-[var(--secondary-color)] disabled:cursor-default"
              disabled={itemAmount <= 1 || pending}
              aria-label="Decrease quantity"
              title="Decrease quantity"
            >
              <FaMinus aria-hidden="true" />
            </button>

            <div className="text-center" aria-live="polite">
              {itemAmount}
            </div>

            <button
              type="button"
              onClick={togglePlus}
              className="h-full flex justify-center items-center cursor-pointer p-1 disabled:text-[var(--secondary-color)]disabled:cursor-default"
              disabled={itemAmount >= stock || pending}
              aria-label="Increase quantity"
              title="Increase quantity"
            >
              <FaPlus aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="border-b flex self-end hover:text-red-600 text-sm w-14 h-5 transition-all duration-200 disabled:opacity-60"
            disabled={pending}
            aria-label={`Remove ${title}`}
            title="Remove"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

export default CardItem;
