import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "../../pages/Cart";
import { useAuth } from "../Context/authContext";

// UI and icons
import { IoMdCart } from "react-icons/io";
import { IoLogIn, IoSearch } from "react-icons/io5";
import AvatarIcon from "../Feature/AvatarIcon";


function Navbar() {

    // useState
    const [hoverIndex, setHoverIndex] = useState(null)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [search, setSearch] = useState("");

    const { isAuthenticated } = useAuth()

    // Product categories
    const tops = ["T-shirt", "Shirt", "Blouse", "Tank top", "Vest", "Sweater", "Jumper", "Hoodie", "Jacket", "Blazer", "Suit jacket", "Sleeveless top"];
    const bottoms = ["Pants", "Trousers", "Jeans", "Shorts", "Skirt", "Maxi skirt", "Mini skirt", "Skort"];
    const outerwear = ["Trench coat", "Coat", "Down jacket", "Leather jacket", "Wool coat", "Track jacket", "Windbreaker"];
    const underwear = ["Bra", "Underwear", "Panties", "Briefs", "Loungewear", "Pajamas", "Pyjamas", "Robe", "Sports bra"];
    const accessories = ["Socks", "Tights", "Stockings", "Gloves", "Scarf", "Hat", "Beanie", "Tie", "Neck scarf"];
    const labels = [{key:1, title: "Tops", contents: tops}, 
        {key:2, title: "Bottoms", contents: bottoms}, 
        {key:3, title: "Outerwear", contents: outerwear}, 
        {key:4, title: "Underwear", contents: underwear}, 
        {key:5, title: "Accessories", contents: accessories}]

    // functions
    const handleCartClick = () => {
        setIsCartOpen(true)
    }

    const toggleSearch = (e) => {
        setSearch(e.target.value);
    };



    return(
        <nav className="w-full h-20 top-0 right-0 bg-[#537D5D] z-110">

            {/* start cart */}
            <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
            {/* end cart */}


            <div className="container-mid h-full grid grid-cols-[1fr_4fr_1fr] justify-center gap-rwd px-2">

                {/* start nav left (logo)*/}
                <Link to={'/'} className="my-2 bg-[#D2D0A0]"></Link>
                {/* end  nav left */}

                {/* start nav middle (category) */}
                <div className=" h-1/2 self-end "
                onMouseLeave={() => setHoverIndex(null)}>
                    <div className="h-full grid grid-cols-5 gap-rwd overflow-hidden">
                        {labels.map(label => (
                            <button key={label.key} className="h-full text-center"
                            onMouseEnter={() => setHoverIndex(label.key)}>
                                <Link to={`/product`} state={{labelIndex: label.key}}>
                                    <motion.p
                                    initial={{y: 0, color: "D2D0A0"}}
                                    animate={{y: hoverIndex === label.key ? -12 : 0, color: hoverIndex === label.key ? "#ffffff" : "#D2D0A0"}}
                                    transition={{duration: 0.2}}
                                    >
                                        {label.title}
                                    </motion.p>
                                </Link>
                                <AnimatePresence>
                                    <motion.div className="navbar-menu-mid bg-[#D2D0A0]/95 h-[70%] aspect-square rotate-45"
                                    initial={{opacity: 0}}
                                    animate={{opacity: hoverIndex === label.key ? 1 : 0}}
                                    transition={{duration: 0.1}}
                                    ></motion.div>
                                </AnimatePresence>
                            </button>
                        ))}
                    </div>
                    <motion.div className="absolute w-full navbar-items-mid bg-[#D2D0A0]/95 overflow-hidden rounded-2xl"
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: hoverIndex !== null ? 1 : 0, height: hoverIndex !== null ? "auto" : 0}}
                    transition={{duration: 0.2}}>
                        <ul className="grid grid-cols-5 gap-2 w-full items-center justify-center p-3">
                            {hoverIndex !== null && (
                                labels.find(label => label.key === hoverIndex).contents.map((content, index) => (
                                    <a href="#" key={index} className="text-center text-[#537D5D] hover:text-white max-lg:text-sm">{content}</a>
                                ))
                            )}
                        </ul>
                    </motion.div>
                </div>
                {/* end nav middle */}

                {/* start nav right (icon, search)*/}
                <div className="grid grid-rows-2 gap-1 w-full my-2">
                    <div className="flex justify-end items-center w-full">
                        <div className="h-full flex justify-center items-center">
                            <IoMdCart onClick={handleCartClick} className="text-2xl text-[#D2D0A0] hover:text-amber-300 transition-colors duration-200 cursor-pointer"/>
                        </div>
                        <div className="col-start-3 h-full w-1/4 flex justify-center items-center">
                            {isAuthenticated ? <AvatarIcon/>
                             :
                            <Link to={'/sign'} className="text-2xl cursor-pointer text-[#D2D0A0] hover:text-emerald-400 transition-colors duration-200">
                                <IoLogIn/>
                            </Link>
                            }
                            
                        </div>
                    </div>
                    
                    <form action="" className="h-full px-3 border-1 border-[#D2D0A0] rounded-2xl flex items-center justify-center">
                        <input type="text" value={search} onChange={toggleSearch} className="w-full outline-none text-white placeholder-white"/>
                        <button type="submit" className="flex justify-center items-center rounded-full">
                            <IoSearch className="text-2xl text-[#D2D0A0]"/>
                        </button>
                    </form>
                </div>
                {/* end nav right */}
            </div>

        </nav>
    )
}

export default Navbar