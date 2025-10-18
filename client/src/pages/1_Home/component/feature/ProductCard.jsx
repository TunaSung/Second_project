import { useState, useMemo, memo } from "react";
import { LuShoppingBag, LuMinus, LuPlus } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../components/Context/authContext";
import { addToCart } from "../../../../services/cartService";
import { toast } from "react-toastify";
import { formatCurrency } from "../../../../components/util/format";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../../../style/Swiper.css";

function ProductCard({ product }) {
  const { id, name, price, stock, imageUrls } = product || {};
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, toggleCart } = useAuth();

  const images = useMemo(
    () => (Array.isArray(imageUrls) ? imageUrls : []),
    [imageUrls]
  );

  const inc = () => setQty((q) => Math.min(q + 1, stock || 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const handleAdd = async () => {
    if (!isAuthenticated) {
      navigate("/sign", { replace: false, state: { from: location.pathname } });
      return;
    }
    if (!id) return;

    try {
      setAdding(true);
      await addToCart(id, qty);
      toggleCart();
      toast.success("成功加入購物車");
    } catch (e) {
      console.error("加入購物車失敗", error);
      toast.error(error?.response?.data?.message || "加入購物車失敗");
    } finally {
      setAdding(false);
    }
  }

  return (
    <article
      className="
      group relative w-[15rem] aspect-square sm:w-[18rem]
      bg-[var(--secondary-color)] rounded-2xl
      shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/10 overflow-hidden
      focus-within:ring-2 focus-within:ring-black/40"
      tabIndex={0}
      aria-label={`${name ?? "Product"}, ${price ?? ""}`}
    >
      {/* start Polaroid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-3 rounded-xl bg-[var(--tertiary-color)]/18" />
      </div>
      {/* end Polaroid */}

      {/* start img */}
      <div
        id="new-item-img"
        className="relative m-3 mb-1 rounded-xl overflow-hidden h-[56%] bg-[var(--primary-color)]"
      >
        <Swiper
          className="h-full"
          modules={[Pagination, A11y]}
          nested
          loop={images.length > 1}
          slidesPerView={1}
          pagination={{ clickable: true }}
          preloadImages={false}
          lazy={{ loadOnTransitionStart: true, loadPrevNext: true }}
          a11y={{ enabled: false }}
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx} className="">
              <div className="relative w-full h-full">
                {src ? (
                  <img
                    src={src}
                    alt={name ?? `product ${id}`}
                    className="swiper-lazy absolute inset-0 w-full h-full object-cover block"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-[var(--tertiary-color)]">
                    No Image
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* end img */}

      {/* start content */}
      <div className="px-4 pt-1 pb-3">
        <h3 className="font-semibold text-[var(--quaternary-color)]/90 line-clamp-1">
          {name ?? "—"}
        </h3>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-[var(--quaternary-color)]">
            {formatCurrency(price)}
          </div>

          {/* start amount */}
          <div className="flex items-center gap-2">
            <button
              onClick={dec}
              aria-label="Decrease quantity"
              className="w-7 h-7 grid place-items-center rounded-full bg-black/10 hover:bg-black/20 disabled:opacity-50 disabled:hover:bg-black/10 disabled:cursor-default"
              disabled={qty === 1}
            >
              <LuMinus />
            </button>
            <span className="min-w-6 text-center">{qty}</span>
            <button
              onClick={inc}
              aria-label="Increase quantity"
              className="w-7 h-7 grid place-items-center rounded-full bg-black/10 hover:bg-black/20 disabled:opacity-50 disabled:hover:bg-black/10 disabled:cursor-default"
              disabled={qty === stock || stock === 0}
            >
              <LuPlus />
            </button>
          </div>
          {/* end amount */}
        </div>
        {/* end content */}

        {/* start CTA */}
        <div className="mt-2 flex justify-end">
          <button
            onClick={handleAdd}
            disabled={adding}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full
                       bg-[var(--quaternary-color)] text-[var(--primary-color)]
                       hover:translate-y-[-1px] active:translate-y-0 transition-transform
                       disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label={
              isAuthenticated ? "Add to cart" : "Sign in to add to cart"
            }
          >
            <LuShoppingBag />
            {adding ? "Adding..." : isAuthenticated ? "Add" : "Sign in"}
          </button>
        </div>
        {/* end CTA */}
      </div>
    </article>
  );
}

export default memo(ProductCard);
