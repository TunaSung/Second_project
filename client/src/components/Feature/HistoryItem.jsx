import { TiMessages } from "react-icons/ti";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import '../../style/Swiper.css'

import { EffectFade, Pagination } from 'swiper/modules';

function ShopItem({merchantTradeNo, amount, image, name, price, date, seller}){

    const formatDate = (isoString) => {
        const date = new Date(isoString)
        return date.toLocaleString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Taipei"
        }).replace(/\//g, "-") // 年月日中橫線
    }

    return(
        <div id="cart-items">
            <div id="container" className="w-full py-4 pl-10 text-[#ededd6] bg-[#9EBC8A] hover:text-[#f1f0c7] hover:bg-[#537D5D] grid grid-cols-[4fr_1fr_1fr_2fr] items-center transition-all duration-150">
                <div className="flex items-center flex-wrap">
                    <div className="flex flex-col gap-2 mr-5 justify-center items-center">
                        <div className="w-full">
                            <a href="#!" className="mr-3 text-sm">Seller: {seller}</a>
                            <button><TiMessages/></button>
                        </div>
                        <Swiper
                            id="my-shop-img"
                            loop={image > 3}
                            effect={'fade'}
                            grabCursor={true}
                            pagination={{clickable: true}}
                            modules={[ EffectFade, Pagination ]}
                            className="w-20 aspect-square flex justify-center items-center mr-3"
                        >
                            {image.map((fileUrl, i) => (
                                <SwiperSlide key={i}>
                                    <div className="w-20 aspect-square bg-cover-set mr-3"
                                    style={{backgroundImage: `url(${import.meta.env.VITE_API_URL}${fileUrl})`}}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <p className="text-xs">{merchantTradeNo}</p>
                    </div>
                    <a href="#!">
                        <label htmlFor="cart-item">
                            <h3 id="cart-item-title" className="max-w-50 line-clamp-2">{name}</h3>
                        </label>
                    </a>
                </div>
                <div className="text-center">{amount}</div>
                <div className="text-center">${amount*price}</div>
                <div className="text-center">{formatDate(date)}</div>
            </div>
        </div>
    )
}
export default ShopItem;