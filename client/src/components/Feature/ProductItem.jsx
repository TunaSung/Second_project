import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Ui & icons
import Cloth from '../SVG/Cloth';
import { TiMessages } from "react-icons/ti";
import { FaCartPlus } from 'react-icons/fa';

function ProductItem( {product} ){

    // useState
    const [isMsgHover, setIsMsgHover] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // useAnimation
    const controlAddSvg  = useAnimation();
    const controlAddText = useAnimation();
    const controlAddBtn  = useAnimation();
    const controlAddCart = useAnimation();

    // Animation of add btn
    const handleAddClick = async () => {
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
    };

    return (
        <div className="w-full h-full flex group">

        {/* start img */}
        <div className='w-full h-full rounded-2xl bg-cover-set group-hover:w-1/2 group-hover:rounded-r-none transition-all duration-200 z-100' loading="lazy"
        style={{backgroundImage: `url('${product.imgUrl}')`}}/>
        {/* end img */}

        {/* start info */}
        <div className=" absolute left-1/2 w-0 p-4 h-full flex flex-col bg-none opacity-0 rounded-r-2xl group-hover:w-1/2 group-hover:opacity-100 group-hover:bg-[#D2D0A0] transition-all duration-200 overflow-hidden">
            
            {/* start title */}
            <p className="text-3xl text-[#537D5D] mb-2">{product.name}</p>
            {/* end title */}

            {/* start hashtags */}
            <div className="mb-2 flex flex-wrap">
                {product.hashTag.map((tag, index) => (
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
                    <button className="border w-8 px-2 aspect-square rounded-full scale-100 hover:scale-125 transition-all duration-200 overflow-hidden"
                    onMouseEnter={() => {setIsMsgHover(true)}}
                    onMouseLeave={() => {setIsMsgHover(false)}}>
                        <motion.div className="absolute -left-1 -top-1 w-9 aspect-square border" 
                        style={{background: 'linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 0.75) 50%, rgba(237, 221, 83, 1) 100%)'}}
                        animate={{y: isMsgHover ? ["100%", "0%"] : ["0%", "100%"]}}
                        transition={{
                            y: { duration: 0.3, ease: 'easeOut' },
                        }}
                        />
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
    );
}

export default ProductItem