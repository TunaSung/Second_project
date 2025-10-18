import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Context/authContext";
import { useMediaQuery } from "react-responsive";

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
  const { currentUser, avatarUrl, logout } = useAuth();

  const isWidth640 = useMediaQuery({ maxWidth: 640 });

  // useNavigate
  const navigate = useNavigate();

  // If there is an avatarUrl, convert it to a full URL
  const avatarSrc = avatarUrl
    ? `${avatarUrl}`
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
    <div ref={containerRef} className="w-full h-full flex justify-center items-center">
      {/* Start Avatar Button */}
      <motion.button
        onClick={toggleMenuOpen}
        className="z-100"
        animate={{ translateX: isWidth640 
          ? 0
          : (isMenuOpen ? -12 : 0 )
        }}
        transition={{ duration: 0.1 }}
      >
        <Avatar
          size= {`${isWidth640 ? 'base' : 'small'}`}
          icon={!avatarUrl && <UserOutlined />}
          src={avatarSrc}
        />
      </motion.button>
      {/* End Avatar Button */}

      {/* Start Menu */}
      <AnimatePresence>
        <motion.div
          className="absolute right-0 sm:left-0 top-full sm:top-0 w-36 grid grid-cols-[auto_1fr] overflow-hidden drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"
          initial={{ clipPath: isWidth640 ? "inset(0% 0% 100% 0%)" : "inset(0% 100% 0% 0%)" }}
          animate={{
            clipPath: isMenuOpen 
            ? "inset(0% 0% 0% 0%)" 
            : (isWidth640 ? "inset(0% 0% 100% 0%)" : "inset(0% 100% 0% 0%)")
          }} // inset(T R B L)
          transition={{ duration: 0.1, ease: "easeOut" }}
        >
          <div className="w-8 h-full">
            {isWidth640 ? 
            <></>
            :
            <div className="absolute -right-[2px] translate-x-1/2 top-1 rotate-45 w-3/5 aspect-square bg-[var(--tertiary-color)]" />
            }
          </div>

          <div className="h-full bg-[var(--tertiary-color)] rounded-b-2xl sm:rounded-sm text-sm">
            <div className="w-full text-lg sm:text-base text-center text-[var(--primary-color)] cursor-default my-2">
              Hi~ {currentUser.username}
            </div>

            <Link
              to="/personal"
              className="block w-full py-2 text-lg sm:text-base text-center text-[var(--primary-color)] hover:bg-[var(--secondary-color)] hover:text-white"
              onClick={toggleMenuOpen}
            >
              My Account
            </Link>

            <Link
              to={"/my-shop"}
              className="block w-full py-2 text-lg sm:text-base text-center text-[var(--primary-color)] hover:bg-[var(--secondary-color)] hover:text-white"
              onClick={toggleMenuOpen}
            >
              My Shop
            </Link>

            <Link
              to={"/"}
              className="block w-full py-2 text-lg sm:text-base text-center text-[var(--primary-color)] hover:bg-[#E14434] hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* End Menu */}
    </div>
  );
}

export default AvatarIcon;
