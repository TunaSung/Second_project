// hooks
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Icon
import { SlMenu } from "react-icons/sl";

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Only trigger handler if the click is outside the ref element
        handler(event);
      }
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}

function HamburgerMenu({ categories }) {
  // State: controls whether the menu is open
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu when the Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Ref: tracks the component container for outside click detection
  const containerRef = useRef(null);

  // Toggle the menu open/closed
  const handleMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // Memoized callback to handle outside clicks (only closes when open)
  const handleOutsideClick = useCallback(() => {
    if (isOpen) handleMenuOpen();
  }, [isOpen]);

  // Attach the outside click listener
  useOutsideClick(containerRef, handleOutsideClick);

  return (
    <div ref={containerRef} className="h-full flex justify-center items-center">
      {/* Start menu icon btn */}
      <button
        onClick={handleMenuOpen}
  className="text-2xl text-[var(--quaternary-color)]"
        aria-label="Open menu"
      >
        <SlMenu />
      </button>
      {/* End menu icon btn */}

      {/* Start menu list */}
      <AnimatePresence initial={false}>
        {isOpen && 
          <motion.div className="fixed top-30 left-0 bg-[var(--quaternary-color)] rounded-b-xl drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
            }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            style={{ willChange: "clip-path" }}
          >
            {categories.map((parent, i) => (
              <Link key={`menu-${parent.name}`} to={`/product`} state={{ initialLabel: parent.id }}>
                <p className="text-[var(--primary-color)] text-center text-lg px-3 py-4">
                  {parent.name} 
                </p>
              </Link>
            ))}
          </motion.div>
        } 
      </AnimatePresence>
      {/* End menu list */}
    </div>
  );
}

export default HamburgerMenu;
