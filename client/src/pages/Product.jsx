import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { getAllProduct } from "../services/productService";
import 'aos/dist/aos.css';

// UI & icons
import ProductItem from "../components/Feature/ProductItem";
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";

// Swiper 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';
import '../style/Swiper.css';
import { Mousewheel, FreeMode } from 'swiper/modules';


function Product() {

    // Get current product category from route state
    const location = useLocation();
    const labelIndex = location.state?.labelIndex ?? 1;

    // useState
    const [products, setProducts] = useState([])
    const [clickIndex, setClickIndex] = useState(labelIndex);
    const [hovered, setHovered] = useState(null);
    const [page, setPage] = useState(1);
    const isFirstRender = useRef(true)
    const prevPage = useRef(null);

    useEffect(() => {
        if (isFirstRender.current) { //剛進入頁面時先用這個擋window.scrollTo
            isFirstRender.current = false
        } else if (prevPage.current !== page){ 
            window.scrollTo(0,175);
        }
        prevPage.current = page; //會先跑這個再跑上面的else if
    },[page])

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                const data = await getAllProduct()
                setProducts(data)
            }
            fetchProduct()
        } catch (err) {
            console.log('商品載入失敗', err)
        }
    },[])

    if (products.length === 0) {
        return (
            <div className="w-full h-[50vh] flex justify-center items-center my-25">
                <l-dot-stream
                size="60"
                speed="2.5"
                color="black" 
                ></l-dot-stream>
            </div>
        )
    }

    // Grid dim
    // Dynamic adjustment 
    const cols = 5;
    const rows = Math.ceil((products.length > 15) ? 4 : products.length / cols); 
    const wrapperHeight = 200 * rows;
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);;
    const totalPage = (products.length < itemsPerPage) ? 1 : Math.ceil(products.length/itemsPerPage);
    
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
        <div id="product-list-page" className="h-full w-full bg-[#73946B]">

            {/* start title */}
            <div className="border-b border-[#D2D0A0] p-4 pt-35 flex justify-self-center">
                <h1 className="text-5xl text-[#eceab8] font-bold indie-flower-regular">Product List</h1>
            </div>
            {/* end title */}

            {/* start category */}
            <div className="mt-10 mb-0 h-20 container-mid grid grid-cols-5 items-end ">
                {labels.map(label => (
                    <button key={label.key} onClick={() => setClickIndex(label.key)} className={`border ${label.key === clickIndex ? `h-3/4 text-white text-2xl` : 'h-1/2 text-[#ECFAE5]'} 
                        w-[85%] transition-all duration-300 flex justify-self-center items-center justify-center 
                        rounded-t-xl font-bold border-b-0 bg-[#9EBC8A]`}
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
            <div className={`grid w-[72%] max-lg:w-[90%] max-md:w-[98%] mx-auto rounded-2xl transition-all duration-350 gap-1 border`}
            style={{ height: `${wrapperHeight}px`,gridTemplateRows: getRowSizes()}}
            >

                {/* start category swiper */}
                <div id="swiper-product-category" className="absolute top-5 h-40 -left-35 w-35 pl-0 border border-[#eceab8] border-r-black rounded-l-2xl bg-[#9EBC8A]">
                    <Swiper
                        loop={true}
                        direction={'vertical'}
                        slidesPerView={4}
                        spaceBetween={3}
                        mousewheel={{ forceToAxis: true, sensitivity: 2, releaseOnEdges: true }}
                        centeredSlides={true}
                        grabCursor={true}
                        modules={[Mousewheel, FreeMode]}
                        className="h-full w-full"
                    >
                        {labels.find(label => label.key === clickIndex).contents.map((content, index) => (
                            <SwiperSlide key={index} className="h-20 w-full flex items-center justify-center ">
                                <button className="transition-all duration-200 text-[#ECFAE5] hover:text-red-500 cursor-grab text-shadow-sm">
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
                        const product = currentProducts[index]
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

            {/* start page */}
            <div id="page" className="w-full grid grid-cols-3 justify-center py-15">
                <button id="previous" onClick={() => setPage(page-1)} className="flex justify-center items-center cursor-pointer disabled:text-[#ccc] disabled:cursor-default" disabled={(page === 1) ? true : false}>
                    <FaArrowLeft />
                    Previous
                </button>
                <div id="page-num" className="text-center">{`${page}/${totalPage}`}</div>
                <button id="next" onClick={() => setPage(page+1)} className={`flex justify-center items-center cursor-pointer disabled:text-[#ccc] disabled:cursor-default`} disabled={(page === totalPage) ? true : false}>
                    Next
                    <FaArrowRight />
                </button>
            </div>
            {/* end page */}
        
        </div>
    );
}

export default Product;
