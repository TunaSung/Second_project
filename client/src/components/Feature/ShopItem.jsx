import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdModeEdit } from "react-icons/md";
import { updateAvailable, updateMyShop, getMyShop } from "../../services/productService";
import { MdClose } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import '../../style/Swiper.css'

import { EffectFade, Pagination } from 'swiper/modules';
import { toast } from "react-toastify";

function ShopItem({productId, available, itemName, itemPrice, sale, itemStock, itemHashTags, itemImageUrls, setItems}){


    const [name, setName] = useState(itemName)
    const [price, setPrice] = useState(itemPrice)
    const [stock, setStock] = useState(itemStock)
    const [hashTags, setHashTags] = useState(itemHashTags)
    const [imageUrls, setImageUrls] = useState([])
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isAvailable, setIsAvailable] = useState(available)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    useEffect(() => {
        console.log("🟢 最新的 imageUrls", imageUrls);
    }, [imageUrls]);

    const handleConfirmOpen = () => {
        setIsConfirmOpen(!isConfirmOpen)
    }

    const toggleAvailabe = async (productId) => {
        try {
            const update = await updateAvailable(productId)
            setIsAvailable(!isAvailable)
            setIsConfirmOpen(false)
            toast.success(`商品已${!isAvailable ? '上架' : '下架'}`)
        } catch (err) {
            console.log("狀態更改失敗", err)
            toast.error("狀態更改失敗")
            
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            
            formData.append('productId', productId)
            formData.append('name', name)
            formData.append('price', price)
            formData.append('stock', stock)
            formData.append('hashTags', hashTags)
            
            if (imageUrls.length > 0) {
                imageUrls.forEach(file => {
                    formData.append('imageUrls', file)
                })
            }

            const upload = await updateMyShop(formData)
            toast.success('商品更改成功')

            setIsUpdateOpen(false)

            await getMyShop().then(setItems)

        } catch (error) {
            console.log(imageUrls)
            console.log('商品更改失敗', error)
            toast.error('商品更改失敗')
        }
    }

    const toggleImageChange = (e) => {
        const files = Array.from(e.target.files);
        console.log("選擇的圖片：", files);
        setImageUrls(files);
    }

    const handleClose = () => {
        setIsUpdateOpen(false)
        setName(itemName)
        setPrice(itemPrice)
        setStock(itemStock)
        setHashTags(itemHashTags)
        setImageUrls([])
    }

    return(
        <div id="cart-items">

            {/* Start update product */}
            {isUpdateOpen &&
            <motion.div className="fixed-mid p-4 w-120 aspect-square border z-200 bg-[#537D5D] rounded-2xl"
            animate={{scale: isUpdateOpen ? [0, 1.1, 0.9, 1] : [1, 0],
                opacity: isUpdateOpen ? [0, 1] : [0, 0]
            }}
            transition={{
                scale: {duration: 0.8, times: [0, 0.7, 0.85, 1], ease: 'easeInOut'},
                opacity: {duration: 0.6}
            }}
            >
                
                <form onSubmit={handleUpdate} className="w-full h-full p-3 flex flex-col justify-center items-center rounded-xl">
                    <MdClose onClick={handleClose} className="absolute right-3 top-3 scale-150 hover:text-red-500 transition-all duration-250 cursor-pointer"/>
                    <div className="mb-8 flex flex-col justify-center items-center">
                        <label htmlFor="edit-input"
                            className="p-10 border rounded-full cursor-pointer hover:bg-[#9EBC8A] transition-all duration-200"
                        >
                            <LuImagePlus className="scale-150"/>
                        </label>
                        <div>
                            {imageUrls.length > 0 ? (
                                <ul className="mt-4 h-10 space-x-1 text-gray-700 overflow-y-auto">
                                    {imageUrls.map((file, idx) => (
                                        <li key={idx}>{file.name}</li>
                                    ))}
                                </ul>
                            )
                            :
                            <ul className="mt-4 h-10 space-x-1 text-gray-700 overflow-y-auto">
                                {itemImageUrls.map((file, idx) => (
                                    <li key={idx}>{file}</li>
                                ))}
                            </ul>
                        }
                        </div>
                        <input
                            id="edit-input"
                            type="file"
                            name="imageUrls"
                            className="hidden"
                            onChange={toggleImageChange}
                            multiple
                        />
                    </div>

                    <div className="grid grid-cols-2">

                        <div className="flex flex-col gap-rwd">
                            <label htmlFor="editName">Name: </label>
                            <label htmlFor="editPrice">Price: </label>
                            <label htmlFor="editStock">Stock: </label>
                            <label htmlFor="editHashTags">Hashtag: </label>
                        </div>

                        <div className="flex flex-col gap-rwd">
                            <input type="text" id="editName" value={name} onChange={(e) => setName(e.target.value)}
                            className="border rounded-sm pl-1 focus:bg-[#f8f7cf] focus:text-[#537D5D]" required/>

                            <input type="number" id="editPrice" value={price} onChange={(e) => setPrice(e.target.value)}
                            className="border rounded-sm pl-1 focus:bg-[#f8f7cf] focus:text-[#537D5D]" required/>

                            <input type="number" id="editStock" value={stock} onChange={(e) => setStock(e.target.value)}
                            className="border rounded-sm pl-1 focus:bg-[#f8f7cf] focus:text-[#537D5D]" required/>

                            <input type="text" id="editHashTags" value={hashTags} onChange={(e) => setHashTags(e.target.value)}
                            className="border rounded-sm pl-1 focus:bg-[#f8f7cf] focus:text-[#537D5D]"/>
                        </div>
                    </div>
                    <button type="submit" className="mt-10 border py-2 px-6 rounded-2xl
                     hover:bg-[#f8f7cf] hover:text-[#537D5D] hover:border-[#9bda8b] transition-all duration-200">
                        Update
                    </button>
                </form>
            </motion.div>
            }
            {/* End update product */}

            <div id="container" className="mt-4 w-full border py-4 pl-10 hover:bg-[#537D5D] grid grid-cols-[3fr_1fr_1fr_1fr_2fr_1fr] items-center">
                <div className="flex items-center">
                    {isConfirmOpen ? 
                    <div className="fixed-mid w-80 h-30 p-5 z-100 flex flex-col justify-center items-center border bg-[#f8f7cf]">
                        <p className="text-black w-full mb-4">Confirm changing the product status?</p>
                        <div className="flex justify-center items-center gap-rwd">
                            <button onClick={() => toggleAvailabe(productId)} className="w-20 h-10 border bg-[#537D5D]">Confirm</button>
                            <button onClick={handleConfirmOpen} className="w-20 h-10 border bg-[#537D5D]">Cancal</button>
                        </div>
                    </div>
                    :
                    null
                    }
                    <button onClick={handleConfirmOpen} className='w-5 border aspect-square rounded-full drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]' 
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
                        {itemImageUrls.map((fileUrl, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-20 aspect-square bg-cover-set mr-3"
                                style={{backgroundImage: `url(${import.meta.env.VITE_API_URL}${fileUrl})`}}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <a href="#!">
                        <label htmlFor="cart-item">
                            <h3 id="cart-item-title" className="w-30 line-clamp-2">{itemName}</h3>
                        </label>
                    </a>
                </div>
                <div className="text-center">${itemPrice}</div>
                <div className="text-center">{sale}</div>
                <div id="amount" className="flex justify-center">
                    <p className="text-center">{itemStock}</p>
                </div>
                <div className="flex justify-center items-center flex-wrap h-25 overflow-y-scroll cart-scroll">
                    {itemHashTags.sort().reverse().map((tag, index) => (
                        <p
                            key={index}
                            className="text-xs inline px-1 rounded-3xl border bg-[#CAE8BD] text-[#1f4428] mr-1 "
                            >
                            {tag}
                        </p>
                    ))}
                </div>
                <div className="flex justify-center items-center gap-3">
                    <button onClick={() => setIsUpdateOpen(true)}>
                        <MdModeEdit className="hover:text-sky-400 scale-125"/>
                    </button>
                </div>
            </div>

            
        </div>
    )
}
export default ShopItem;