import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../Context/authContext";

// UI & icon
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

// if click outside the component, close the menu
function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}

function AvatarIcon({ isMenuOpen, toggleMenuOpen }) {
  // useState
  const containerRef = useRef(null);
  const { avatarUrl, logout } = useAuth();
  const navigate = useNavigate();

  // If there is an avatarUrl, convert it to a full URL
  const avatarSrc = avatarUrl
    ? `${import.meta.env.VITE_API_URL}${avatarUrl}`
    : null;

  // If the user clicks outside the component, close the menu
  useOutsideClick(containerRef, () => {
    if (isMenuOpen) {
      toggleMenuOpen();
    }
  });

  // Handle logout
  const handleLogout = () => {
    toggleMenuOpen();
    logout();
    navigate("/");
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      {/* Start Avatar Button */}
      <motion.button
        onClick={toggleMenuOpen}
        className="z-100"
        animate={{ translateX: isMenuOpen ? -12 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Avatar
          size="small"
          icon={!avatarUrl && <UserOutlined />}
          src={avatarSrc}
        />
      </motion.button>
      {/* End Avatar Button */}

      {/* Start Menu */}
      <motion.div
        className="absolute left-0 top-0 w-36 h-36 grid grid-cols-[auto_1fr] overflow-hidden"
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        animate={{
          clipPath: isMenuOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
        }} // inset(T R B L)
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="w-8 h-full">
          <div className="absolute -right-[2px] translate-x-1/2 top-1 rotate-45 w-3/5 aspect-square bg-[#D2D0A0]" />
        </div>

        <div className="h-full bg-[#D2D0A0] rounded-sm text-sm">
          <div className="w-full text-center text-[#537D5D] cursor-default my-2">
            Hi~ Tuna
          </div>

          <Link
            to="/personal"
            className="block w-full py-2 text-center text-[#537D5D] hover:bg-[#73946B] hover:text-white"
            onClick={toggleMenuOpen}
          >
            My Account
          </Link>

          <Link
            to={"/my-shop"}
            className="block w-full py-2 text-center text-[#537D5D] hover:bg-[#73946B] hover:text-white"
            onClick={toggleMenuOpen}
          >
            My Shop
          </Link>

          <Link
            to={"/"}
            className="block w-full py-2 text-center text-[#537D5D] hover:bg-[#E14434] hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      </motion.div>
      {/* End Menu */}
    </div>
  );
}

export default AvatarIcon;
