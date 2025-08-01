import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

// UI and icons
import Hero from '../components/Layout/Hero';
import EventCard from "../components/Feature/EventCard";
import ProductCard from "../components/Feature/ProductCard";
import { IoSearch } from "react-icons/io5";
import AOS from 'aos';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';    
import 'swiper/css/pagination';         
import 'swiper/css/effect-coverflow';
import '../style/Swiper.css'; // Custom styles for Swiper
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';



function Home() {

    // Initialize AOS
    useEffect(() => {
        AOS.init({ once: false, duration: 1000, easing: 'ease-in-out' });
    })

    // useState
    const [search, setSearch] = useState("");
    const navigate = useNavigate()

    // Search input
    const toggleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim() === '') {
            navigate("/product");
        } else {
            navigate(`/product?keyword=${encodeURIComponent(search.trim())}`);
        }
    };
    
    // Framer scroll animate
    const scrollRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start center", "end center"]
    })
    const useScrollTransform = (scrollStart, scrollEnd, moveStart, moveEnd) => {
        return useTransform(scrollYProgress, [scrollStart, scrollEnd], [moveStart, moveEnd])
    }

    return (
        <div id="home-page" className="overflow-hidden">

            {/* start kpop swiper */}
            <Swiper
                id="kpop-swiper"
                loop={true}
                slidesPerView={1}
                spaceBetween={0}
                centeredSlides={false}
                speed={600}
                autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                lazy={{ loadOnTransitionStart: true, loadPrevNext: true }}
                modules={[Autoplay, Pagination, Navigation]}
                className='w-screen h-screen'
            >

                {/* search bar */}
                <div className="absolute-mid w-1/3 h-1/5 flex items-center justify-center bg-white/70 border z-50 p-5">
                    <form onSubmit={handleSubmit} className="border w-full bg-white flex items-center justify-center">
                    <input
                        value={search}
                        onChange={toggleSearch}
                        placeholder="Enter product name"
                        className="h-15 w-full px-2 text-xl focus:outline-0"
                    />
                    <button
                        type="submit"
                        className="h-15 aspect-5/3 bg-[#D2D0A0] text-[#537D5D] flex items-center justify-center hover:text-white hover:text-lg transition-all duration-300"
                    >
                        <IoSearch />Search
                    </button>
                    </form>
                </div>

                {/* kpop slide */}
                <SwiperSlide className='w-full h-full'>
                    <div className='h-full w-full bg-cover-set bg-[url("/imgs/kpop/aespa-karina-hot-mess.webp")]'/>
                </SwiperSlide>
                <SwiperSlide className='w-full h-full'>
                    <div className='h-full w-full bg-cover-set bg-[url("/imgs/kpop/aespa-winter-hot-mess.webp")]'/>
                </SwiperSlide>
                <SwiperSlide className='w-full h-full'>
                    <div className='h-full w-full bg-cover-set bg-[url("/imgs/kpop/ningning-aespa-hot-mess.webp")]'/>
                </SwiperSlide>
                <SwiperSlide className='w-full h-full'>
                    <div className='h-full w-full bg-cover-set bg-[url("/imgs/kpop/giselle-aespa-hot-mess.webp")]'/>
                </SwiperSlide>

            </Swiper>
            {/* end kpop swiper */}
            
            {/* start wrapper of main */}
            <div className="bg-[#73946B]">

                {/* start welcome */}
                <Hero>
                    <motion.div ref={scrollRef} className='mt-20 container-mid h-[100vh] grid grid-cols-[6fr_5fr_4fr_3fr_2fr] gap-2'
                    style={{y: useScrollTransform(0.1, 0.6, "0%", "50%")}}
                    >
                        <motion.div className="m-0 absolute left-1/2 -translate-x-1/2 top-1/4 w-auto h-10"
                        loading="lazy"
                        style={{ opacity: useScrollTransform(0.6, 0.7, 0, 1) }}
                        >
                            <h1 className="text-4xl font-bold text-center text-[#D2D0A0] indie-flower-regular">Sustainable Chic Starts Here</h1>
                        </motion.div>
                        <motion.div className="w-full h-70 rounded-2xl bg-cover-set "
                        loading="lazy"
                        style={{ 
                            backgroundImage: 'url("/imgs/kpop/bts-kpop-v-butter.webp")',
                            scale: useScrollTransform(0.25, 0.5, "100%", "60%"),
                            y: useScrollTransform(0.23, 0.8, "0%", "50%"),
                            x: useScrollTransform(0.23, 0.8, "0%", "-30%") }}
                        />
                        <motion.div className="w-full h-70 rounded-2xl bg-cover-set"
                        loading="lazy"
                        style={{ 
                            backgroundImage: 'url("/imgs/kpop/tzuyu-twice-with-youth.webp")',
                            scale: useScrollTransform(0.25, 0.48, "100%", "50%"),
                            y: useScrollTransform(0.23, 0.8, "0%", "-50%"),
                            x: useScrollTransform(0.23, 0.83, "0%", "-30%") }}
                        />
                        <motion.div className="w-full h-70 rounded-2xl bg-cover-set"
                        loading="lazy"
                        style={{ 
                            backgroundImage: 'url("/imgs/kpop/bts-butter-jungkook.webp")',
                            scale: useScrollTransform(0.25, 0.5, "100%", "60%"),
                            y: useScrollTransform(0.23, 0.8, "0%", "70%") }}
                        />
                        <motion.div className="w-full h-70 rounded-2xl bg-cover-set"
                        loading="lazy"
                        style={{ 
                            backgroundImage: 'url("/imgs/kpop/karina-aespa-dirty-work2.webp")',
                            height: useScrollTransform(0.25, 0.7, 280, 168), 
                            width: useScrollTransform(0.25, 0.5, 160.6, 128),
                            y: useScrollTransform(0.23, 0.8, "0%", "-32%"),
                            x: useScrollTransform(0.23, 0.8, "0%", "20%") }}
                        />
                        <motion.div className="w-full h-70 rounded-2xl bg-cover-set"
                        style={{ 
                            backgroundImage: 'url("/imgs/kpop/bts-be-jimin.webp")',
                            height: useScrollTransform(0.25, 0.5, 280, 168), 
                            width: useScrollTransform(0.25, 0.5, 107.6, 128),
                            y: useScrollTransform(0.23, 0.8, "0%", "15%"),
                            x: useScrollTransform(0.23, 0.8, "0%", "40%") }}
                        />
                    </motion.div>
                </Hero>
                {/* end welcome */}
                
                <Hero>
                    {/* start new event swiper */}
                    <div id= 'new-item' data-aos="fade-up" data-aos-offset='50' className='w-screen h-100 flex items-center justify-center overflow-hidden'>
                        <div className='absolute w-screen h-10 left-0 top-0 z-500'>
                            <svg width='100%' height='40' viewBox='0 0 100 10' preserveAspectRatio="none"  xmlns='http://www.w3.org/2000/svg'>
                                <path d='M0 0 A50 10 0 0 0 9.5 6' stroke="#D2D0A0" strokeWidth={0.5} fill="none"/>
                                <path d='M24.8 8 A50 10 0 0 0 100 0' stroke="#D2D0A0" strokeWidth={0.5} fill="none"/>
                            </svg>
                            <div className="absolute text-[#D2D0A0] text-3xl left-[10%] top-[10px] exile-regular">NEW EVENTS</div>
                        </div>
                        <Swiper
                            effect={'coverflow'}
                            loop={true}
                            loopedSlides={3}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{ depth: 150, }} //預設值rotate: 50, stretch: 0, depth: 100, slideShadows: true }}
                            lazy='true'
                            modules={[EffectCoverflow]}
                            className=" w-1/4 h-83 max-sm:h-64"
                        >
                            <SwiperSlide className='w-auto'>
                                <EventCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <EventCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <EventCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <EventCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <EventCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <EventCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <EventCard/>
                            </SwiperSlide>
                        </Swiper>
                        <div className='absolute border-3 border-[#D2D0A0] bottom-[-10%] w-screen h-20 rounded-[50%]'/>
                    </div>
                    {/* end new event swiper */}

                    {/* start new arrival swiper */}
                    <div id='new-item' data-aos="fade-up" data-aos-offset='150' className='w-screen h-98 -mt-10 flex items-center justify-center '>
                        <Swiper
                            effect={'coverflow'}
                            loop={true}
                            loopedSlides={3}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 150,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            lazy={{ loadOnTransitionStart: true, loadPrevNext: true }}
                            modules={[EffectCoverflow]}
                            className=" w-1/4 h-83 max-sm:h-64"
                        >
                            <SwiperSlide className='w-auto'>
                                <ProductCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <ProductCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <ProductCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <ProductCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <ProductCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <ProductCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <ProductCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <ProductCard/>
                            </SwiperSlide>
                            <SwiperSlide className='w-auto'>
                                <ProductCard/>
                            </SwiperSlide>
                        </Swiper>
                        <div className='absolute w-screen h-10 left-0 bottom-0 z-500'>
                            <svg width='100%' height='40' viewBox='0 0 100 10' preserveAspectRatio="none"  xmlns='http://www.w3.org/2000/svg'>
                                <path d='M0 0 A50 10 0 0 0 72.3 8' stroke="#D2D0A0" strokeWidth={0.5} fill="none"/>
                                <path d='M90.5 7 A50 10 0 0 0 100 0' stroke="#D2D0A0" strokeWidth={0.5} fill="none"/>
                            </svg>
                            <div className="absolute text-[#D2D0A0] text-3xl right-[10%] top-[10px] exile-regular">NEW ARRIVALS</div>
                        </div>
                    </div>
                    {/* end new arrival swiper */}
                </Hero>

            </div>
            {/* end wrapper of main */}
            
        </div>
    )
}

export default Home;