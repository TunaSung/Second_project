import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
// import { updateCartItemQuantity, removeCartItem } from "../../service/cartService"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import '../../style/Swiper.css'

import { EffectFade, Pagination } from 'swiper/modules';

function ShopItem({isAvailable, name, price, sale, stock, hashTags, imageUrls}){

    const [isDelete, setIsDelete] = useState(false)

    const handleDelete = async () => {
        setIsDelete(!isDelete)
        setAmount(0)
    };

    if (isDelete) {
        return null
    }


    return(
        <div id="cart-items">
            <div id="container" className="mt-4 w-full border py-4 pl-10 hover:bg-[#537D5D] grid grid-cols-[3fr_1fr_1fr_1fr_2fr_1fr] items-center">
                <div className="flex items-center">
                    <button className='w-5 border aspect-square rounded-full' 
                    style={{backgroundColor: isAvailable ? 'green' : 'red'}}
                    />
                    <Swiper
                        id="my-shop-img"
                        loop={true}
                        effect={'fade'}
                        grabCursor={true}
                        pagination={{clickable: true}}
                        modules={[ EffectFade, Pagination ]}
                        className="w-20 aspect-square flex justify-center items-center"
                    >
                        {imageUrls.map((fileUrl, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-20 aspect-square bg-cover-set mr-3"
                                style={{backgroundImage: `url(${import.meta.env.VITE_API_URL}${fileUrl})`}}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <a href="#!">
                        <label htmlFor="cart-item">
                            <h3 id="cart-item-title" className="w-30 line-clamp-2">{name}</h3>
                        </label>
                    </a>
                </div>
                <div className="text-center">${price}</div>
                <div className="text-center">{sale}</div>
                <div id="amount" className="flex justify-center">
                    <p className="text-center">{stock}</p>
                </div>
                <div className="flex justify-center items-center flex-wrap h-25 overflow-y-scroll cart-scroll">
                    {hashTags.sort().reverse().map((tag, index) => (
                        <p
                            key={index}
                            className="text-xs inline px-1 rounded-3xl border bg-[#CAE8BD] text-[#1f4428] mr-1 "
                            >
                            {tag}
                        </p>
                    ))}
                </div>
                <div className="flex justify-center items-center gap-3">
                    <button>
                        <MdModeEdit className="hover:text-sky-400 scale-125"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ShopItem;