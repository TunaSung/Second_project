import { useState, useEffect } from "react";
import { useAuth } from "../Context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

// UI & icons
import Cart from "../../pages/Cart";
import { IoMdCart } from "react-icons/io";
import { IoLogIn, IoSearch } from "react-icons/io5";
import AvatarIcon from "../Feature/AvatarIcon";

function Navbar() {
  // useState
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [ready, setReady] = useState(false);

  
  // useNavigate
  const navigate = useNavigate()

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
      if (search.trim() === '') {
          navigate("/product");
      } else {
          navigate(`/product?keyword=${encodeURIComponent(search.trim())}`);
      }
  };

  return (
    <nav className="w-full h-20 fixed top-0 right-0 bg-[#537D5D] z-110">
      {/* start cart */}
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      {/* end cart */}

      <div className="container-mid h-full grid grid-cols-[1fr_4fr_1fr] justify-center gap-rwd px-2">
        {/* start nav left (logo)*/}
        <Link to={"/"} className="my-2 bg-[#D2D0A0]"></Link>
        {/* end  nav left */}

        {/* start nav middle (category) */}
        <div
          className=" h-1/2 self-end "
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* start parent category */}
          <div className="h-full grid grid-cols-5 gap-rwd overflow-hidden">
            {ready ? (
              categories.map((parent, i) => (
                <button
                  key={i}
                  className="h-full text-center"
                  onMouseEnter={() => setHoverIndex(parent.id)}
                >
                  <Link to={`/product`} state={{ initialLabel: parent.id }}>
                    <motion.p
                      initial={{ y: 0, color: "D2D0A0" }}
                      animate={{
                        y: hoverIndex === parent.id ? -12 : 0,
                        color: hoverIndex === parent.id ? "#ffffff" : "#D2D0A0",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {parent.name}
                    </motion.p>
                  </Link>
                  <AnimatePresence>
                    <motion.div
                      className="navbar-menu-mid bg-[#D2D0A0]/95 h-[70%] aspect-square rotate-45"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoverIndex === parent.id ? 1 : 0 }}
                      transition={{ duration: 0.1 }}
                    ></motion.div>
                  </AnimatePresence>
                </button>
              ))
            ) : (
              <p className="col-start-3 text-sm text-[#D2D0A0]">分類載入中...</p>
            )}
          </div>
          {/* end parent category */}

          {/* start child category */}
          <motion.div
            className="absolute w-full navbar-items-mid bg-[#D2D0A0]/95 overflow-hidden rounded-2xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: hoverIndex !== null ? 1 : 0,
              height: hoverIndex !== null ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <ul className="grid grid-cols-5 gap-2 w-full items-center justify-center p-3">
              {hoverIndex !== null &&
                subcategories
                  .filter((child) => child.parentId === hoverIndex)
                  .map((sub, i) => (
                    <Link
                      to={`/product`}
                      state={{ initialLabel: sub.id }}
                      key={i}
                      className="text-center text-[#537D5D] hover:text-white max-lg:text-sm"
                    >
                      {sub.name}
                    </Link>
                  ))}
            </ul>
          </motion.div>
          {/* end child category */}
        </div>
        {/* end nav middle */}

        {/* start nav right (cart, avatar, search) */}
        <div className="grid grid-rows-2 gap-1 w-full my-2">
          <div className="flex justify-end items-center gap-1 w-full">
            <motion.div
              className="h-full flex justify-center items-center"
              animate={{ translateX: isMenuOpen ? -12 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoMdCart
                onClick={handleCartClick}
                className="text-2xl text-[#D2D0A0] hover:text-[#e8e679] transition-colors duration-200 cursor-pointer"
              />
            </motion.div>
            <div className="h-full w-1/5 flex justify-center items-center">
              {isAuthenticated ? (
                <AvatarIcon
                  isMenuOpen={isMenuOpen}
                  toggleMenuOpen={toggleMenuOpen}
                />
              ) : (
                <Link
                  to={"/sign"}
                  className="text-2xl cursor-pointer text-[#D2D0A0] hover:text-[#91c883] transition-colors duration-200"
                >
                  <IoLogIn />
                </Link>
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="h-full px-3 border-1 border-[#D2D0A0] rounded-2xl flex items-center justify-center"
          >
            <input
              type="text"
              value={search}
              onChange={toggleSearch}
              className="w-full outline-none text-[#D2D0A0] placeholder-white"
            />
            <button
              type="submit"
              className="flex justify-center items-center rounded-full"
            >
              <IoSearch className="text-2xl text-[#D2D0A0]" />
            </button>
          </form>
        </div>
        {/* end nav right (cart, avatar, search) */}
      </div>
    </nav>
  );
}

export default Navbar;
