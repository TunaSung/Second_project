import { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams, useNavigate  } from "react-router-dom";
import { useAuth } from "../components/Context/authContext";
import "aos/dist/aos.css";

// API Service
import { getProduct, searchProductsByName } from "../services/productService";

// UI & icons
import ProductItem from "../components/Feature/ProductItem";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";
import "../style/Swiper.css";
import { Mousewheel, FreeMode } from "swiper/modules";

function Product() {

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const navigate = useNavigate();

  // Get current product category from route state
  const location = useLocation();
  const initialLabel = location.state?.initialLabel ?? 1;
  const { categories, subcategories } = useAuth();
  const initialSub = subcategories.find((s) => s.id === initialLabel);
  const initialParent = initialSub ? initialSub.parentId : initialLabel;

  // State of product list & category
  const [products, setProducts] = useState(null);
  const [parentId, setParentId] = useState(initialParent);
  const [categorize, setCategorize] = useState(initialLabel);

  const [hovered, setHovered] = useState(null);
  const [page, setPage] = useState(1);
  const isFirstRender = useRef(true);
  const prevPage = useRef(null);

  // Scroll to top when page changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (prevPage.current !== page) {
      window.scrollTo(0, 175);
    }
    prevPage.current = page;
  }, [page]);

  // Fetch product data when component mounts or category changes
  useEffect(() => {
    const fetchProduct = async () => {
    try {
      if (keyword) {
        const result = await searchProductsByName(keyword);
        setProducts(result);
      } else {
        const result = await getProduct(categorize);
        setProducts(result);
      }
    } catch (err) {
      console.log("商品資料載入失敗", err);
    }
  };

  fetchProduct();
  }, [categorize]);

  // If products is null, show loading animation
  if (!products) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center my-25">
        <l-dot-stream size="60" speed="2.5" color="black"></l-dot-stream>
      </div>
    );
  }

  // Handle parent and child category selection
  const handleParentCategory = (id) => {
    setParentId(id);
    setCategorize(id);
    setPage(1);
    navigate('/product');
  };
  const handleChildCategory = (id) => {
    setCategorize(id);
    setPage(1);
    navigate('/product');
  };

  // Grid dim
  // Dynamic adjustment
  const cols = 5;
  const rows = Math.ceil(
    products && products.length > 15
      ? 4
      : products && products.length !== 0
      ? products.length / cols
      : 1
  );
  const wrapperHeight = 200 * rows;
  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products
  ? products.slice(startIndex, endIndex)
  : [];
  const totalPage =
    products.length < itemsPerPage
      ? 1
      : Math.ceil(products.length / itemsPerPage);

  // Dynamic grid size
  const getRowSizes = () => {
    return Array.from({ length: rows }, (_, i) =>
      hovered ? (hovered.row === i ? "1.5fr" : "1fr") : "1fr"
    ).join(" ");
  };
  const getColSizes = (rowIndex) => {
    return Array.from({ length: cols }, (_, i) =>
      hovered && hovered.row === rowIndex
        ? hovered.col === i
          ? "4fr"
          : "1fr"
        : "1fr"
    ).join(" ");
  };

  return (
    <div id="product-list-page" className="h-full w-full bg-[#73946B]">
      {/* start title */}
      <div className="border-b border-[#D2D0A0] p-4 pt-35 flex justify-self-center">
        <h1 className="text-5xl text-[#eceab8] font-bold indie-flower-regular">
          Product List
        </h1>
      </div>
      {/* end title */}

      {/* start category */}
      <div className="mt-10 mb-0 h-20 container-mid grid grid-cols-5 items-end ">
        {categories.map((label, i) => (
          <button
            key={i}
            onClick={() => handleParentCategory(label.id)}
            className={`border w-[85%] transition-all duration-300 rounded-t-xl font-bold border-b-0 bg-[#9EBC8A]
                    ${
                      label.id === parentId
                        ? `h-3/4 text-white text-2xl`
                        : "h-1/2 text-[#ECFAE5]"
                    } 
                    flex justify-self-center items-center justify-center`}
          >
            <img
              src={label.img}
              loading="lazy"
              className={`
                            absolute w-full h-full rounded-t-xl object-cover transition-opacity duration-300
                            ${
                              label.id === parentId
                                ? "opacity-100"
                                : "opacity-0"
                            }
                        `}
            />
            <span className="relative z-10 text-shadow-sm">{label.name}</span>
          </button>
        ))}
      </div>
      {/* end category */}

      {/* start product list */}
      <div
        className={`grid w-[72%] max-lg:w-[90%] max-md:w-[98%] mx-auto rounded-2xl transition-all duration-350 gap-1 border`}
        style={{
          height: `${wrapperHeight}px`,
          gridTemplateRows: getRowSizes(),
        }}
      >
        {/* start category swiper */}
        <div
          id="swiper-product-category"
          className="absolute top-5 h-40 -left-35 w-35 pl-0 border border-[#eceab8] border-r-black rounded-l-2xl bg-[#9EBC8A]"
        >
          <Swiper
            loop={true}
            direction={"vertical"}
            slidesPerView={4}
            spaceBetween={3}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 2,
              releaseOnEdges: true,
            }}
            centeredSlides={true}
            grabCursor={true}
            modules={[Mousewheel, FreeMode]}
            className="h-full w-full"
          >
            {subcategories
              .filter((child) => child.parentId === parentId)
              .map((sub, i) => (
                <SwiperSlide
                  key={i}
                  className="h-20 w-full flex items-center justify-center "
                >
                  <button
                    onClick={() => handleChildCategory(sub.id)}
                    className="transition-all duration-200 text-[#ECFAE5] hover:text-red-500 cursor-grab text-shadow-sm"
                  >
                    {sub.name}
                  </button>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        {/* end category swiper */}

        {currentProducts.length === 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ height: `${wrapperHeight}px` }}
          >
            <p className="text-2xl font-bold text-[#f8f7cf]">
              Currently, there are no products in this category (ಥ _ ಥ)
            </p>
          </div>
        )}
        {/* start product grid */}
        {Array.from({ length: rows }, (_, row) => (
          <div
            key={row}
            className="grid transition-all duration-300 gap-2 z-20"
            style={{ gridTemplateColumns: getColSizes(row) }}
          >
            {Array.from({ length: cols }, (_, col) => {
              const index = row * cols + col;
              const product = currentProducts[index];
              if (!product) return <div key={col} />; //多出來的地方用空格佔位

              return (
                <div
                  key={`${row}-${col}`}
                  className="flex h-full w-full items-center justify-center text-sm font-bold transition-all duration-100"
                  onMouseEnter={() => setHovered({ row, col })}
                  onMouseLeave={() => setHovered(null)}
                >
                  <ProductItem product={product} />
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
        <button
          id="previous"
          onClick={() => setPage(page - 1)}
          className="flex justify-center items-center cursor-pointer disabled:text-[#ccc] disabled:cursor-default"
          disabled={page === 1 ? true : false}
        >
          <FaArrowLeft />
          Previous
        </button>
        <div
          id="page-num"
          className="text-center"
        >{`${page}/${totalPage}`}</div>
        <button
          id="next"
          onClick={() => setPage(page + 1)}
          className={`flex justify-center items-center cursor-pointer disabled:text-[#ccc] disabled:cursor-default`}
          disabled={page === totalPage ? true : false}
        >
          Next
          <FaArrowRight />
        </button>
      </div>
      {/* end page */}
    </div>
  );
}

export default Product;
