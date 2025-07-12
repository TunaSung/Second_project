import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdModeEdit } from "react-icons/md";
import { updateAvailable, updateMyShop, getMyShop } from "../../services/productService";
import { useAuth } from '../Context/authContext'
import { MdClose } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import ProductForm from "./ShopEdit";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import '../../style/Swiper.css'

import { EffectFade, Pagination } from 'swiper/modules';
import { toast } from "react-toastify";

function ShopItem({categories, subcategories, productId, available, itemName, itemPrice, sale, itemStock, itemHashTags, itemImageUrls, itemCategoryId, setItems}){


    const [name, setName] = useState(itemName)
    const [price, setPrice] = useState(itemPrice)
    const [stock, setStock] = useState(itemStock)
    const [hashTags, setHashTags] = useState(itemHashTags)
    const [imageUrls, setImageUrls] = useState([])
    const [categoryId, setCategoryId] = useState(itemCategoryId)
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
            formData.append('category', categoryId)

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
                <ProductForm
                    isEdit={true}
                    initialValues={{
                    id: productId,
                    name: itemName,
                    price: itemPrice,
                    stock: itemStock,
                    hashTags: itemHashTags,
                    categoryId: itemCategoryId
                    }}
                    onClose={handleClose}
                    onSubmit={updateMyShop}
                    onSubmitSuccess={() => getMyShop().then(setItems)}
                    categories={categories}
                    subcategories={subcategories}
                />
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