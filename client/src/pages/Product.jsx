import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, delay, useAnimation } from "framer-motion";

// UI and icons
import { TiMessages } from "react-icons/ti";
import { FaCartPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import Cloth from "../components/SVG/Cloth";

// Swiper 
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';
import '../style/Swiper.css';
import { Mousewheel, EffectCoverflow, FreeMode } from 'swiper/modules';


function Product() {

    // Get current product category from route state
    const location = useLocation();
    const labelIndex = location.state?.labelIndex ?? 1;

    // useState
    const [clickIndex, setClickIndex] = useState(labelIndex);
    const [hovered, setHovered] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Animation controller
    const controlAddSvg = useAnimation();
    const controlAddText= useAnimation();
    const controlAddBtn= useAnimation();
    const controlAddCart= useAnimation();

    // Grid dim
    // Dynamic adjustment
    const rows = 4; 
    const cols = 5;
    const wrapperHeight = 200 * rows;
    
    // Product categories
    const tops = ["T-shirt", "Shirt", "Blouse", "Tank top", "Vest", "Sweater", "Jumper", "Hoodie", "Jacket", "Blazer", "Suit jacket", "Sleeveless top"];
    const bottoms = ["Pants", "Trousers", "Jeans", "Shorts", "Skirt", "Maxi skirt", "Mini skirt", "Skort"];
    const outerwear = ["Trench coat", "Coat", "Down jacket", "Leather jacket", "Wool coat", "Track jacket", "Windbreaker"];
    const underwear = ["Bra", "Underwear", "Panties", "Briefs", "Loungewear", "Pajamas", "Pyjamas", "Robe", "Sports bra"];
    const accessories = ["Socks", "Tights", "Stockings", "Gloves", "Scarf", "Hat", "Beanie", "Tie", "Neck scarf"];
    const labels = [{key:1, title: "Tops", contents: tops, img:"/imgs/category/cloth.jpg"}, 
        {key:2, title: "Bottoms", contents: bottoms, img:"/imgs/category/pants.jpg"}, 
        {key:3, title: "Outerwear", contents: outerwear, img:"/imgs/category/outerwear.jpg"}, 
        {key:4, title: "Underwear", contents: underwear, img:"/imgs/category/underwear.jpg"}, 
        {key:5, title: "Accessories", contents: accessories, img:"/imgs/category/accessories.jpg"}]
    const hashTags = ["#GentlyUsed", "#XL", "#Fashion", "#Sale", "#Discount"];

    // Dynamic grid size
    const getRowSizes = () => {
        return Array.from({ length: rows }, (_, i) =>
        hovered ? (hovered.row === i ? "1.5fr" : "1fr") : "1fr"
        ).join(" ");
    };
    const getColSizes = (rowIndex) => {
        return Array.from({ length: cols }, (_, i) =>
        hovered && hovered.row === rowIndex ? (hovered.col === i ? "4fr" : "1fr") : "1fr"
        ).join(" ");
    };

    // Animation of add to cart
    const handleAddClick = async() => {
        
        if (isAnimating) return;

        setIsAnimating(true);

        await controlAddSvg.start({
            height: ["40px", "120px", "40px"],
            opacity: [0, 1, 1, 0],
            transition: {
                height: { duration: 0.5 },
                opacity: { duration: 0.5, ease: "easeOut", times:[0, 0.2, 0.8, 1] },
            },
        });

        await Promise.all([
            controlAddCart.start({
                color: ["#ffffff", "#03A609", "#03A609", "#ffffff"],
                rotate: [0, -30, 30 ,0],
                transition: {
                    rotate: { duration: 1 },
                    color: { duration: 1.5, times: [0, 0.21, 0.8, 1] }
                }
            }),
            controlAddBtn.start({
                backgroundColor: ["#03A609", "#ffffff", "#ffffff", "#03A609"],
                transition: { duration: 1.5, times: [0, 0.2, 0.8, 1] }
            }),
            controlAddText.start({
                color: ["#ffffff", "#03A609", "#03A609", "#ffffff"],
                transition: { duration: 1.5, times: [0, 0.2, 0.8, 1] }
            }),
        ])

        setIsAnimating(false);
    }



    return (
        <div id="product-list-page" style={{ 
                background: "linear-gradient(178deg,rgba(211, 211, 211, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(107, 142, 35, 1) 100%)"
            }}>

            {/* start title */}
            <div className="border-b p-4 pt-35 flex justify-self-center">
                <h1 className="text-5xl font-bold indie-flower-regular">Product List</h1>
            </div>
            {/* end title */}

            {/* start category */}
            <div className="mt-10 mb-0 h-20 container-mid grid grid-cols-5 items-end ">
                {labels.map(label => (
                    <button key={label.key} onClick={() => setClickIndex(label.key)} className={`border ${label.key === clickIndex ? `h-3/4 text-white text-2xl` : 'h-1/2'} 
                        w-[85%] transition-all duration-300 flex justify-self-center items-center justify-center rounded-t-xl font-bold border-b-0`}>

                            <img
                            src={label.img}
                            loading="lazy"
                            className={`
                                absolute w-full h-full rounded-t-xl object-cover transition-opacity duration-300
                                ${label.key === clickIndex ? 'opacity-100' : 'opacity-0'}
                            `}
                            />


                            <span className="relative z-10 text-shadow-sm">{label.title}</span>
                    </button>
                ))}
            </div>
            {/* end category */}

            {/* start product list */}
            <div className={`grid container-mid transition-all duration-350 gap-1`}
            style={{ height: `${wrapperHeight}px`,gridTemplateRows: getRowSizes()}}
            >

                {/* start category swiper */}
                <div id="swiper-product-category" className="absolute top-5 h-1/4 -left-31 w-35 pl-0 border border-r-0 rounded-l-2xl">
                    <Swiper
                        loop={true}
                        effect={'coverflow'}
                        direction={'vertical'}
                        slidesPerView={3}
                        spaceBetween={3}
                        mousewheel={{ forceToAxis: true, sensitivity: 2, releaseOnEdges: true }}
                        centeredSlides={true}
                        grabCursor={true}
                        coverflowEffect={{ stretch: 15, depth: 100, slideShadows: false }}
                        modules={[Mousewheel, FreeMode, EffectCoverflow]}
                        className="h-full w-full"
                    >
                        {labels.find(label => label.key === clickIndex).contents.map((content, index) => (
                            <SwiperSlide key={index} className="h-20 w-full flex items-center justify-center ">
                                <button className="transition-all duration-200 font-bold cursor-grab text-shadow-sm">
                                    {content}
                                </button>
                            </SwiperSlide>
                            ))}

                    </Swiper>
                </div>
                {/* end category swiper */}


                {/* start product grid */}
                {Array.from({ length: rows }, (_, row) => (
                <div key={row} className="grid transition-all duration-300 gap-2 z-20"
                style={{ gridTemplateColumns: getColSizes(row) }}
                >
                    {Array.from({ length: cols }, (_, col) => {
                    return (
                        <div key={`${row}-${col}`} className="flex h-full w-full items-center justify-center text-sm font-bold transition-all duration-100"
                        onMouseEnter={() => setHovered({ row, col })}
                        onMouseLeave={() => setHovered(null)}
                        >
                        <div className="w-full h-full flex group">
                            {/* start img */}
                            <div className='w-full h-full rounded-2xl bg-[url("/imgs/kpop/aespa-karina-hot-mess2.jpg")] bg-cover-set group-hover:w-1/2 group-hover:rounded-r-none transition-all duration-200 z-100' 
                            loading="lazy"/>
                            {/* end img */}

                            {/* start info */}
                            <div className=" absolute left-1/2 w-0 p-4 h-full flex flex-col bg-none opacity-0 rounded-r-2xl group-hover:w-1/2 group-hover:opacity-100 group-hover:bg-gray-400 transition-all duration-200 overflow-hidden">
                                
                                {/* start title */}
                                <p className="text-3xl mb-2">Product Name</p>
                                {/* end title */}

                                {/* start hashtags */}
                                <div className="mb-2 flex flex-wrap">
                                    {hashTags.map((tag, index) => (
                                        <p
                                            key={index}
                                            className="text-xs inline px-1 rounded-3xl border bg-gray-300 mr-1"
                                            >
                                            {tag}
                                        </p>
                                    ))}
                                </div>
                                {/* end hashtags */}

                                {/* start price & buttons */}
                                <div className="flex flex-col justify-between items-stretch mt-auto">
                                    
                                    {/* start price */}
                                    <div className="flex items-center mb-3">
                                        <p className="text-red-600/60 line-through text-xl inline mr-1">$1222</p>
                                        <p className="text-white inline text-2xl mr-1">/ $999</p>
                                    </div>
                                    {/* end price */}

                                    {/* start btn */}
                                    <div className="w-full flex items-center justify-between">
                                        
                                        {/* start msg btn */}
                                        <button className="border w-8 px-2 aspect-square rounded-full scale-100 hover:scale-125 transition-all duration-200"
                                        style={{background: 'linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 0.75) 50%, rgba(237, 221, 83, 1) 100%)'}}>
                                            <TiMessages className="absolute-mid text-xl"/>
                                        </button>
                                        {/* end msg btn */}
                                        
                                        {/* start add btn */}
                                        <motion.button className="w-auto h-8 px-2 py-2 rounded-full flex items-center"
                                        onClick={handleAddClick} 
                                        initial={{backgroundColor: '#03A609'}}
                                        animate={controlAddBtn}
                                        >
                                            {/* cloth svg */}
                                            <motion.div className="z-10 absolute right-1"
                                            initial={{height: '40px', opacity: 0}}
                                            animate={controlAddSvg}
                                            >
                                                <Cloth/>
                                            </motion.div>

                                            {/* text */}
                                            <motion.p className="text-lg inline"
                                            initial={{color: "#ffffff"}}
                                            animate={controlAddText}
                                            >
                                                Add to cart
                                            </motion.p>

                                            {/* cart icon */}
                                            <motion.div
                                            initial={{rotate: 0, color: "#ffffff"}}
                                            animate={controlAddCart}
                                            >
                                                <FaCartPlus className="ml-2"/>
                                            </motion.div>

                                        </motion.button>
                                        {/* end add btn */}

                                    </div>
                                    {/* end btn */}

                                </div>
                                {/* end price & buttons */}

                            </div>
                            {/* end info */}

                        </div>
                    </div>
                    );
                    })}
                </div>
                ))}
                {/* end product grid */}

            </div>
            {/* end product list */}

            <div className="pb-30"/>
        
        </div>
    );
}

export default Product;
