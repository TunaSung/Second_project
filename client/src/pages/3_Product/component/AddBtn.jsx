import { useState, useCallback } from "react";
import { useAuth } from "../../../components/Context/authContext";
import { useNavigate, useLocation } from "react-router-dom";

// library
import { motion, useAnimation } from "framer-motion";
import { toast } from "react-toastify";

// UI
import Cloth from "../../../components/SVG/Cloth";
import { FaCartPlus } from "react-icons/fa";
import { addToCart } from "../../../services/cartService";

function AddBtn({ productId, amount, stock }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { toggleCart, isAuthenticated } = useAuth();

  const controlAddSvg = useAnimation();
  const controlAddText = useAnimation();
  const controlAddBtn = useAnimation();
  const controlAddCart = useAnimation();

  const handleAddClick = useCallback(
    async (productId, qty) => {
      if (!isAuthenticated) {
        navigate("/sign", { replace: false, state: { from: location.pathname } });
        return;
      }
      if (busy || isAnimating) return;
      if (stock <= 0) {
        toast.info("此商品已無庫存");
        return;
      }

      setBusy(true);
      setIsAnimating(true);
      try {
        await addToCart(productId, qty);
        await toggleCart();
        toast.success("成功加入購物車");

        // 動畫
        await controlAddSvg.start({
          height: ["40px", "120px", "40px"],
          opacity: [0, 1, 1, 0],
          transition: {
            height: { duration: 0.5 },
            opacity: {
              duration: 0.5,
              ease: "easeOut",
              times: [0, 0.2, 0.8, 1],
            },
          },
        });

        await Promise.all([
          controlAddCart.start({
            color: ["#93855f", "#FFFFFF", "#FFFFFF", "#93855f"],
            rotate: [0, -30, 30, 0],
            transition: {
              rotate: { duration: 1 },
              color: { duration: 1.5, times: [0, 0.21, 0.8, 1] },
            },
          }),
          controlAddBtn.start({
            backgroundColor: [
              "var(--primary-color)",
              "#16610E",
              "#16610E",
              "var(--primary-color)",
            ],
            transition: { duration: 1.5, times: [0, 0.2, 0.8, 1] },
          }),
          controlAddText.start({
            color: ["#93855f", "#FFFFFF", "#FFFFFF", "#93855f"],
            transition: { duration: 1.5, times: [0, 0.2, 0.8, 1] },
          }),
        ]);
      } catch (error) {
        console.error("加入購物車失敗", error);
        toast.error(error?.response?.data?.message || "加入購物車失敗");
      } finally {
        setIsAnimating(false);
        setBusy(false);
      }
    },
    [
      busy,
      isAnimating,
      stock,
      controlAddBtn,
      controlAddCart,
      controlAddSvg,
      controlAddText,
      toggleCart,
    ]
  );

  return (
    <motion.button
      className="relative w-auto h-8 px-2 py-2 rounded-full flex items-center disabled:opacity-60 disabled:cursor-not-allowed"
      onClick={() => handleAddClick(productId, amount)}
      initial={{ backgroundColor: "var(--primary-color)" }}
      animate={controlAddBtn}
      disabled={busy || stock === 0}
    >
      {/* start cloth svg */}
      <motion.div
        className="z-10 absolute right-1"
        initial={{ height: "40px", opacity: 0 }}
        animate={controlAddSvg}
      >
        <Cloth />
      </motion.div>
      {/* end cloth svg */}

      {/* start text */}
      <motion.p
        className="text-sm inline"
        initial={{ color: "#93855f" }}
        animate={controlAddText}
      >
        Add to cart
      </motion.p>
      {/* end text */}

      {/* start cart icon */}
      <motion.div
        initial={{ rotate: 0, color: "#93855f" }}
        animate={controlAddCart}
      >
        <FaCartPlus className="ml-2" />
      </motion.div>
      {/* end cart icon */}
    </motion.button>
  );
}

export default AddBtn;
