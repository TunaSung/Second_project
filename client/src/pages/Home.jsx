import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform} from "framer-motion";

// UI and icon
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

    // Search input
    const toggleSearch = (e) => {
        setSearch(e.target.value);
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
        <div id="home-page">

            {/* start jumbotron swiper */}
            <Swiper
                id="jumbotron-swiper"
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
                lazy={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='w-screen h-screen'
            >

                {/* search bar */}
                <div className="absolute-mid w-1/3 h-1/5 flex items-center justify-center bg-white/70 border z-50 p-5">
                    <form action="" className=" border w-full bg-white flex items-center justify-center">
                        <input value={search} onChange={toggleSearch} placeholder="Enter product name" className="h-15 w-full border px-2 text-xl"/>
                        <Link to={'/product'} className="h-15 aspect-5/3 bg-yellow-500 flex items-center justify-center hover:text-white hover:text-lg transition-all duration-300"><IoSearch />Search</Link>
                    </form>
                </div>

                {/* jumbotron slide */}
                <SwiperSlide className='w-full h-full'>
                    <div className='h-full w-full bg-cover-set bg-[url("imgs/jumbotron/aespa-karina-hot-mess.jpg")]'/>
                </SwiperSlide>
                <SwiperSlide className='w-full h-full'>
                    <div className='h-full w-full bg-cover-set bg-[url("imgs/jumbotron/aespa-winter-hot-mess.jpg")]'/>
                </SwiperSlide>
                <SwiperSlide className='w-full h-full'>
                    <div className='h-full w-full bg-cover-set bg-[url("imgs/jumbotron/ningning-aespa-hot-mess.jpg")]'/>
                </SwiperSlide>
                <SwiperSlide className='w-full h-full'>
                    <div className='h-full w-full bg-cover-set bg-[url("imgs/jumbotron/giselle-aespa-hot-mess.jpg")]'/>
                </SwiperSlide>

            </Swiper>
            {/* end jumbotron swiper */}
            
            {/* start wrapper of main */}
            <div style={{ 
                backgroundColor: "#D3D3D3",
                backgroundImage: "linear-gradient(178deg,rgba(211, 211, 211, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(107, 142, 35, 1) 100%)"
            }}>

                {/* start welcome */}
                <Hero>
                    <motion.div ref={scrollRef} className='mt-20 container-mid h-[100vh] grid grid-cols-[6fr_5fr_4fr_3fr_2fr] gap-2'
                    style={{y: useScrollTransform(0.1, 0.6, "0%", "50%")}}
                    >
                        <motion.div className="m-0 absolute left-1/2 -translate-x-1/2 top-1/4 w-auto h-10"
                        style={{ opacity: useScrollTransform(0.6, 0.85, 0, 1) }}
                        >
                            <h1 className="text-4xl text-center indie-flower-regular">Sustainable Chic Starts Here</h1>
                        </motion.div>
                        <motion.div className="border-1 w-full h-70 rounded-2xl"
                        style={{ scale: useScrollTransform(0.25, 0.5, "100%", "60%"),
                            y: useScrollTransform(0.23, 0.8, "0%", "50%"),
                            x: useScrollTransform(0.23, 0.8, "0%", "-30%") }}
                        />
                        <motion.div className="border-1 w-full h-70 rounded-2xl"
                        style={{ scale: useScrollTransform(0.25, 0.48, "100%", "50%"),
                            y: useScrollTransform(0.23, 0.8, "0%", "-50%"),
                            x: useScrollTransform(0.23, 0.83, "0%", "-30%") }}
                        />
                        <motion.div className="border-1 w-full h-70 rounded-2xl"
                        style={{ scale: useScrollTransform(0.25, 0.5, "100%", "60%"),
                            y: useScrollTransform(0.23, 0.8, "0%", "70%") }}
                        />
                        <motion.div className="border-1 w-full h-70 rounded-2xl"
                        style={{ height: useScrollTransform(0.25, 0.7, 280, 168), 
                            width: useScrollTransform(0.25, 0.5, 160.6, 128),
                            y: useScrollTransform(0.23, 0.8, "0%", "-32%"),
                            x: useScrollTransform(0.23, 0.8, "0%", "20%") }}
                        />
                        <motion.div className="border-1 w-full h-70 rounded-2xl"
                        style={{ height: useScrollTransform(0.25, 0.5, 280, 168), 
                            width: useScrollTransform(0.25, 0.5, 107.6, 128),
                            y: useScrollTransform(0.23, 0.8, "0%", "15%"),
                            x: useScrollTransform(0.23, 0.8, "0%", "40%") }}
                        />
                    </motion.div>
                </Hero>
                {/* end welcome */}
                
                <Hero>
                    {/* start new event swiper */}
                    <div id= 'new-item' data-aos="fade-up" data-aos-offset='50' className=' w-screen h-100 flex items-center justify-center overflow-hidden'>
                        <div className='absolute w-screen h-10 left-0 top-0 z-500'>
                            <svg width='100%' height='40' viewBox='0 0 100 10' preserveAspectRatio="none"  xmlns='http://www.w3.org/2000/svg'>
                                <path d='M0 0 A50 10 0 0 0 9.5 6' stroke="#000" strokeWidth={0.5} fill="none"/>
                                <path d='M23.5 8 A50 10 0 0 0 100 0' stroke="#000" strokeWidth={0.5} fill="none"/>
                            </svg>
                            <div className="absolute text-3xl left-[10%] top-[10px] exile-regular">NEW EVENTS</div>
                        </div>
                        <Swiper
                            effect={'coverflow'}
                            loop={true}
                            loopedSlides={3}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{ depth: 150, }} //預設值rotate: 50, stretch: 0, depth: 100, slideShadows: true }}
                            lazy={true}
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
                        <div className=' absolute border-3 bottom-[-10%] w-screen h-20 rounded-[50%]'/>
                    </div>
                    {/* end new event swiper */}

                    {/* start new arrival swiper */}
                    <div id='new-item' data-aos="fade-up" data-aos-offset='150' className='w-screen h-98 -mt-10 flex items-center justify-center '>
                        <div className='absolute right-40 bottom-0 px-3 bg-[#ffffff] z-50'>
                        </div>
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
                            lazy={true}
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
                                <path d='M0 0 A50 10 0 0 0 73.8 8' stroke="#000" strokeWidth={0.5} fill="none"/>
                                <path d='M90.5 7 A50 10 0 0 0 100 0' stroke="#000" strokeWidth={0.5} fill="none"/>
                            </svg>
                            <div className="absolute text-3xl right-[10%] top-[10px] exile-regular">NEW ARRIVALS</div>
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