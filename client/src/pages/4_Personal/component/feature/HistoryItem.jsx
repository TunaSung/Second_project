import { formatDate } from "../../../../components/Util/format";

// Icon
import { TiMessages } from "react-icons/ti";

//  Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "../../../../style/Swiper.css";
import { EffectFade, Pagination } from "swiper/modules";

function ShopItem({
  merchantTradeNo,
  amount,
  image,
  name,
  price,
  date,
  seller,
}) {
  return (
    <div id="cart-items">
      <div
        id="container"
        className="w-full py-4 pl-10 text-[#ededd6] bg-[var(--tertiary-color)] hover:text-[var(--quaternary-color)] hover:bg-[var(--primary-color)] grid grid-cols-[4fr_1fr_1fr_2fr] items-center transition-all duration-150"
      >
        <div className="flex items-center flex-wrap">
          {/* Start Seller & Product img */}
          <div className="flex flex-col gap-2 mr-5 justify-center items-center">
            {/* Start Seller name & msg */}
            <div className="w-full">
              <a href="#!" className="mr-3 text-sm">
                Seller: {seller}
              </a>
              <button>
                <TiMessages />
              </button>
            </div>
            {/* End Seller name & msg */}

            {/* Start Product img */}
            <Swiper
              id="my-shop-img"
              loop={image > 3}
              effect={"fade"}
              grabCursor={true}
              pagination={{ clickable: true }}
              modules={[EffectFade, Pagination]}
              className="w-20 aspect-square flex justify-center items-center mr-3"
            >
              {image.map((fileUrl, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="w-20 aspect-square bg-cover-set mr-3"
                    style={{
                      backgroundImage: `url(${
                        import.meta.env.VITE_API_URL
                      }${fileUrl})`,
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* End Product img */}

            {/* Start Merchant Trade No */}
            <p className="text-xs">{merchantTradeNo}</p>
            {/* End Merchant Trade No */}
          </div>
          {/* End Seller & Product img */}

          {/* Start Product name */}
          <a href="#!">
            <label htmlFor="cart-item">
              <h3 id="cart-item-title" className="max-w-50 line-clamp-2">
                {name}
              </h3>
            </label>
          </a>
          {/* End Product name */}
        </div>

        {/* Start Product Info */}
        <div className="text-center">{amount}</div>
        <div className="text-center">${amount * price}</div>
        <div className="text-center">{formatDate(date)}</div>
        {/* End Product Info */}
      </div>
    </div>
  );
}
export default ShopItem;
