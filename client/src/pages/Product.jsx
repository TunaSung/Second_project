import { useState } from "react";
import { useLocation } from 'react-router-dom';

// UI & icons
import ProductItem from "../components/Feature/ProductItem";

// Swiper 
import { Swiper, SwiperSlide } from 'swiper/react';
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

    // example
    const products = Array.from({ length: 17 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i+1}`,
        price: 999,
        stock: 1,
        hashTag:  ["#GentlyUsed", "#XL", "#Fashion", "#Sale", "#Discount"],
        imgUrl: '/imgs/kpop/aespa-karina-hot-mess2.jpg'
    }));

    // Grid dim
    // Dynamic adjustment 
    const cols = 5;
    const rows = Math.ceil(products.length / cols); 
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
                        w-[85%] transition-all duration-300 flex justify-self-center items-center justify-center rounded-t-xl font-bold border-b-0`}
                    >

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
                        const index = row * cols + col
                        const product = products[index]
                        if (!product) return <div key={col} /> //多出來的地方用空格佔位

                        return (
                            <div key={`${row}-${col}`} className="flex h-full w-full items-center justify-center text-sm font-bold transition-all duration-100"
                            onMouseEnter={() => setHovered({ row, col })}
                            onMouseLeave={() => setHovered(null)}
                            >
                                <ProductItem product={product}/>
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
