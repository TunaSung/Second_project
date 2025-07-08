import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { addToCart } from '../../services/cartService';
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext"

// Ui & icons
import Cloth from '../SVG/Cloth';
import { FaPlus, FaMinus } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { FaCartPlus } from 'react-icons/fa';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import '../../style/Swiper.css'

function ProductItem({product}){

    // useState
    const [isMsgHover, setIsMsgHover] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [amount, setAmount] = useState(1)
    const { toggleCart } = useAuth()
    
    // useAnimation
    const controlAddSvg  = useAnimation();
    const controlAddText = useAnimation();
    const controlAddBtn  = useAnimation();
    const controlAddCart = useAnimation();

    // Animation of add btn
    const handleAddClick = async (productId, amount) => {
        try {
            await addToCart(productId, amount)
            await toggleCart()
            toast.success('成功加入購物車')

            if (isAnimating) return;
            setIsAnimating(true);

            await controlAddSvg.start({
                height: ["40px", "120px", "40px"],
                opacity: [0, 1, 1, 0],
                transition: {
                    height: { duration: 0.5 },
                    opacity: { duration: 0.5, ease: "easeOut", times:[0, 0.2, 0.8, 1] },
                }
            });

            await Promise.all([
            controlAddCart.start({
                color: ["#ffffff", "#537D5D", "#537D5D", "#ffffff"],
                rotate: [0, -30, 30 ,0],
                transition: {
                    rotate: { duration: 1 },
                    color: { duration: 1.5, times: [0, 0.21, 0.8, 1] }
                }
            }),
            controlAddBtn.start({
                backgroundColor: ["#537D5D", "#ffffff", "#ffffff", "#537D5D"],
                transition: { duration: 1.5, times: [0, 0.2, 0.8, 1] }
            }),
            controlAddText.start({
                color: ["#ffffff", "#537D5D", "#537D5D", "#ffffff"],
                    transition: { duration: 1.5, times: [0, 0.2, 0.8, 1] }
            })
            ]);

            setIsAnimating(false);

        } catch (err) {
            console.error("加入購物車失敗", err);
            toast.error("加入購物車失敗")
        }
        
    };

    const togglePlus = () => {
        setAmount(amount + 1);
    };

    const toggleMinus = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    return (
        <div className="w-full h-full flex group">

        {/* start img */}
        {/* <div className='w-full h-full rounded-2xl bg-cover-set border group-hover:w-1/2 group-hover:rounded-r-none transition-all duration-200 z-100'
        style={{backgroundImage: `url('imgs/kpop/bts-be-jimin.jpg')`}}/> */}
        <div className='w-full h-full bg-cover-set rounded-2xl group-hover:w-1/2 transition-all duration-200 z-150' loading="lazy">
            <Swiper
                id="product-img"
                loop={true}
                effect={'fade'}
                grabCursor={true}
                pagination={{clickable: true}}
                modules={[ EffectFade, Pagination ]}
                className='w-full h-full' 
            >
                {product.imageUrls.map((fileUrl, index) => (
                    <SwiperSlide key={index}>
                        <div className='w-full h-full bg-cover-set rounded-2xl group-hover:rounded-r-none'
                        style={{backgroundImage: `url(${import.meta.env.VITE_API_URL}${fileUrl})`}}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        {/* end img */}

        {/* start info */}
        <div className=" absolute left-1/2 w-0 p-4 h-full flex flex-col bg-none opacity-0 rounded-r-2xl group-hover:w-1/2 group-hover:opacity-100 group-hover:bg-[#D2D0A0] transition-all duration-200 overflow-hidden">
            
            {/* start title */}
            <div className='flex justify-between mb-2'>
                <p className="text-3xl text-[#537D5D]">{product.name}</p>
                {/* start msg btn */}
                <button className="border w-8 h-8 px-2 rounded-full scale-100 hover:scale-125 transition-all duration-200 overflow-hidden"
                onMouseEnter={() => {setIsMsgHover(true)}}
                onMouseLeave={() => {setIsMsgHover(false)}}>
                    <motion.div className="absolute -left-1 -top-1 w-9 h-9 border" 
                    style={{backgroundImage: "linear-gradient(0deg,#D2D0A0 0%, #9EBC8A 33%, #73946B 66%, #537D5D 100%)"}}
                    animate={{y: isMsgHover ? ["100%", "0%"] : ["0%", "100%"]}}
                    transition={{
                        y: { duration: 0.3, ease: 'easeOut' },
                    }}
                    />
                    <TiMessages className="absolute-mid text-xl"/>
                </button>
                {/* end msg btn */}
            </div>
            {/* end title */}

            {/* start hashtags */}
            <div className="mb-2 flex flex-wrap">
                {product.hashTags.map((tag, index) => (
                    <p
                        key={index}
                        className="text-xs text-[#1f4428] inline px-1 rounded-3xl border bg-[#CAE8BD] mr-1"
                        >
                        {tag}
                    </p>
                ))}
            </div>
            {/* end hashtags */}

            {/* start price & buttons */}
            <div className="flex flex-col justify-between items-stretch mt-auto">
                
                {/* start price */}
                <div className="flex items-end mb-3">
                    <p className="text-white inline text-2xl mr-2">${product.price}</p>
                    <p className="text-red-600/60 text-sm inline">stock: {product.stock}</p>
                </div>
                {/* end price */}

                {/* start btn */}
                <div className="w-full flex items-center justify-between">
                    
                    {/* start msg btn */}
                    <div id="amount" className="grid grid-cols-[1fr_1.5fr_1fr] items-center border divide-x text-[#3e6547] border-[#73946B] divide-[#73946B]">
                        <button onClick={toggleMinus} className="h-full flex justify-center items-center cursor-pointer p-1 disabled:text-[#9EBC8A] disabled:cursor-default" disabled={amount === 1}><FaMinus /></button>
                        <div className="text-center">{amount}</div>
                        <button onClick={togglePlus} className="h-full flex justify-center items-center cursor-pointer p-1 disabled:text-[#9EBC8A] disabled:cursor-default" disabled={amount === product.stock}><FaPlus /></button>
                    </div>
                    {/* end msg btn */}
                    
                    {/* start add btn */}
                    <motion.button className="w-auto h-8 px-2 py-2 rounded-full flex items-center"
                    onClick={() => handleAddClick(product.id, amount)} 
                    initial={{backgroundColor: '#537D5D'}}
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
    );
}

export default ProductItem