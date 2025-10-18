import { useState, useEffect } from "react";
import { useAuth } from "../Context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// UI & icons
import Cart from "../../pages/6_Cart/Cart";
import { IoMdCart } from "react-icons/io";
import { IoLogIn, IoSearch } from "react-icons/io5";
import HamburgerMenu from "../Feature/HamburgerMenu";
import AvatarIcon from "../Feature/AvatarIcon";

function Navbar() {
  // useState
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);

  // useNavigate
  const navigate = useNavigate();

  const isWidth768 = useMediaQuery({ maxWidth: 768 });

  // login status and categories
  const { isAuthenticated, categories, subcategories } = useAuth();

  useEffect(() => {
    if (categories.length > 0) {
      setReady(true);
    }
  }, [categories]);

  // Open cart panel
  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Search input
  const toggleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      navigate("/product");
    } else {
      navigate(`/product?keyword=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
  <nav className="w-full h-30 md:h-20 fixed top-0 right-0 bg-[var(--primary-color)] drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)] z-110">
      {/* start cart */}
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      {/* end cart */}

      <div className="container-mid h-full grid grid-cols-[1fr_4fr_1fr] justify-center gap-rwd px-2">
        {/* start nav left (logo)*/}
        <div className="grid grid-rows-2 md:grid-rows-1 order-2 md:order-0 gap-2 py-2">
          <Link to={"/"} className="bg-[var(--quaternary-color)] text-white text-3xl flex justify-center items-center">
           Logo
          </Link>
          {isWidth768 && 
            <form
              onSubmit={handleSubmit}
              className="h-full px-3 border-1 border-[var(--quaternary-color)] rounded-2xl flex items-center justify-center"
            >
              <input
                type="text"
                value={search}
                onChange={toggleSearch}
                className="w-full outline-none text-[var(--quaternary-color)] placeholder-white"
              />
              <button
                type="submit"
                className="flex justify-center items-center rounded-full"
              >
                <IoSearch className="text-2xl text-[var(--quaternary-color)]" />
              </button>
            </form>
          }
        </div>
        {/* end  nav left */}

        {/* start nav middle (category) */}
        {/* start parent + child */}
        {isWidth768 ? (
          <HamburgerMenu categories={categories} parent={parent} />
        ) : (
          <div
            className="h-full"
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* parent categories */}
            <div className="h-full grid grid-cols-5 items-end gap-rwd overflow-hidden">
              {ready ? (
                categories.map((parent) => (
                  <div
                    key={parent.id}
                    className="text-center"
                    onMouseEnter={() => setHoverIndex(parent.id)}
                  >
                    <Link to="/product" state={{ initialLabel: parent.id }}>
                      <motion.p
                        initial={{ y: 0, color: "var(--quaternary-color)" }}
                        animate={{
                          y: hoverIndex === parent.id ? -12 : 0,
                          color:
                            hoverIndex === parent.id ? "var(--tertiary-color)" : "var(--quaternary-color)",
                        }}
                        transition={{ duration: 0.2 }}
                        className="select-none"
                      >
                        {parent.name}
                      </motion.p>
                    </Link>
                    
                    <AnimatePresence mode="popLayout">
                      {hoverIndex === parent.id && (
                        <motion.div
                          key="diamond"
                          className="navbar-menu-mid bg-[var(--quaternary-color)]/95 h-[70%] aspect-square rotate-45 mx-auto"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.12 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                ))
              ) : (
                <p className="col-start-3 text-sm text-[var(--quaternary-color)]">
                  分類載入中...
                </p>
              )}
            </div>

            {/* child categories */}
            <AnimatePresence>
              {hoverIndex !== null && (
                <motion.div
                  key="submenu"
                  className="absolute w-full navbar-items-mid bg-[var(--quaternary-color)]/95 overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="grid grid-cols-5 gap-2 w-full items-center justify-center p-3">
                    {subcategories
                      .filter((child) => child.parentId === hoverIndex)
                      .map((sub) => (
                        <li key={sub.id} className="text-center">
                          <Link
                            to="/product"
                            state={{ initialLabel: sub.id }}
                            className="text-[var(--primary-color)] hover:text-white max-lg:text-sm"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        {/* end parent + child */}

        {/* end nav middle */}

        {/* start nav right (cart, avatar, search) */}
        <div className="grid lg:grid-rows-2 gap-1 w-full order-2 py-0 md:py-2">
          <div className="grid grid-cols-2 lg:flex lg:justify-end items-center gap-3 lg:gap-2 w-full">
            <motion.div
              className="h-full flex justify-center items-center"
              animate={{ translateX: isWidth768 ? 0 : isMenuOpen ? -12 : 0 }}
              transition={{ duration: 0.1 }}
            >
              <IoMdCart
                onClick={handleCartClick}
                className="scale-200 lg:scale-150 text-[var(--quaternary-color)] hover:text-[#e8e679] transition-colors duration-200 cursor-pointer"
              />
            </motion.div>
            <div className="h-full flex justify-center items-center">
              {isAuthenticated ? (
                <AvatarIcon
                  isMenuOpen={isMenuOpen}
                  toggleMenuOpen={toggleMenuOpen}
                />
              ) : (
                <Link
                  to={"/sign"}
                  className="cursor-pointer text-[var(--quaternary-color)] hover:text-[#91c883] transition-colors duration-200"
                >
                  <IoLogIn className="scale-200 lg:scale-150" />
                </Link>
              )}
            </div>
          </div>

          {!isWidth768 &&
            <form
              onSubmit={handleSubmit}
              className="h-full px-3 border-1 border-[var(--quaternary-color)] rounded-2xl flex items-center justify-center"
            >
              <input
                type="text"
                value={search}
                onChange={toggleSearch}
                className="w-full outline-none text-[var(--quaternary-color)] placeholder-white"
              />
              <button
                type="submit"
                className="flex justify-center items-center rounded-full"
              >
                <IoSearch className="text-2xl text-[var(--quaternary-color)]" />
              </button>
            </form>
          }
        </div>
        {/* end nav right (cart, avatar, search) */}
      </div>
    </nav>
  );
}

export default Navbar;
