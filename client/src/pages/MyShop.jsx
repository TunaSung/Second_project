import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { uploadProduct, getMyShop } from "../services/productService";
import { toast } from "react-toastify";
// UI
import ShopItem from "../components/Feature/ShopItem";
import { FaPlus } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";

function ProductInput() {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [imageUrls, setImageUrls] = useState([])
    const [hashTags, setHashTags] = useState('')
    const [items, setItems] = useState([])
    const [isAddProductOpen, setIsAddProductOpen] = useState(false)
    
    useEffect(() => {
        const fetchMyShop = async () => {
            try {
                const myShop = await getMyShop()
                console.log(myShop)
                setItems(myShop)
            } catch (err) {
                console.log('資料匯入失敗', err)
                toast.error('資料匯入失敗', err)
            }
        }
        fetchMyShop()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(name, price, stock, hashTags, imageUrls)
        try {
            const formData = new FormData()

            formData.append('name', name)
            formData.append('price', price)
            formData.append('stock', stock)
            formData.append('hashTags', hashTags)
            
            imageUrls.forEach((file) => {
                formData.append('imageUrls', file)
            })

            const upload = await uploadProduct(formData)
            toast.success('商品上傳成功')

            setIsAddProductOpen(false)
            setName("")
            setPrice(0)
            setStock(0)
            setHashTags('')
            setImageUrls([])

            await getMyShop().then(setItems)

        } catch (error) {
            console.log('商品上傳失敗', error)
            toast.error('商品上傳失敗')
        }
    }

    const handleChange = (e) => {
        setImageUrls([])
        const file = Array.from(e.target.files)
        setImageUrls(file)
    }

    const handdleClose = () => {
        setIsAddProductOpen(false)
        setName('')
        setPrice(0)
        setStock(0)
        setHashTags('')
        setImageUrls([])
    }

    return (
        <div className="pt-30 bg-[#9EBC8A] text-[#f8f7cf]">
            
            {/* Start add product */}
            <motion.div className="fixed-mid p-4 w-120 aspect-square border z-200 bg-[#537D5D] rounded-2xl"
            animate={{scale: isAddProductOpen ? [0, 1.1, 0.9, 1] : [1, 0],
                opacity: isAddProductOpen ? [0, 1] : [0, 0]
            }}
            transition={{
                scale: {duration: 0.8, times: [0, 0.7, 0.85, 1], ease: 'easeInOut'},
                opacity: {duration: 0.6}
            }}
            >
                
                <form onSubmit={handleSubmit} className="w-full h-full p-3 flex flex-col justify-center items-center rounded-xl">
                    <MdClose onClick={handdleClose} className="absolute right-3 top-3 scale-150 hover:text-red-500 transition-all duration-250 cursor-pointer"/>
                    <div className="mb-8 flex flex-col justify-center items-center">
                        <label htmlFor="file-input"
                            className="p-10 border rounded-full cursor-pointer hover:bg-[#9EBC8A] transition-all duration-200"
                        >
                            <LuImagePlus className="scale-150"/>
                        </label>
                        {imageUrls.length > 0 && (
                            <ul className="mt-4 h-10 space-x-1 text-gray-700 overflow-y-auto">
                            {imageUrls.map((file, idx) => (
                                <li key={idx}>{file.name}</li>   // 用 file.name 顯示檔名
                            ))}
                            </ul>
                        )}
                        <input
                            id="file-input"
                            type="file"
                            className="hidden"
                            onChange={handleChange}
                            multiple
                            required
                        />
                        {/* <input type="file" id="avatar" accept="image/*" className="p-1 border" required /> */}
                    </div>

                    <div className="grid grid-cols-2">

                        <div className="flex flex-col gap-rwd">
                            <label htmlFor="name">Name: </label>
                            <label htmlFor="price">Price: </label>
                            <label htmlFor="stock">Stock: </label>
                            <label htmlFor="hashTags">Hashtag: </label>
                        </div>

                        <div className="flex flex-col gap-rwd">
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                            className="border rounded-sm pl-1 focus:bg-[#f8f7cf] focus:text-[#537D5D]" required/>

                            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)}
                            className="border rounded-sm pl-1 focus:bg-[#f8f7cf] focus:text-[#537D5D]" required/>

                            <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)}
                            className="border rounded-sm pl-1 focus:bg-[#f8f7cf] focus:text-[#537D5D]" required/>

                            <input type="text" id="hashTags" value={hashTags} onChange={(e) => setHashTags(e.target.value)}
                            className="border rounded-sm pl-1 focus:bg-[#f8f7cf] focus:text-[#537D5D]"/>
                        </div>
                    </div>
                    <button type="submit" className="mt-10 border py-2 px-6 rounded-2xl
                     hover:bg-[#f8f7cf] hover:text-[#537D5D] hover:border-[#9bda8b] transition-all duration-200">
                        Add to shop
                    </button>
                </form>
            </motion.div>
            {/* End add product */}

            {/* Start title */}
            <div className="border-b p-4 flex justify-self-center">
                <h1 className="text-5xl font-bold indie-flower-regular">My Shop</h1>
            </div>
            {/* End title */}

            {/* Start to do list */}
            <div className="container-mid mt-20">
                <div className="w-full border p-5 bg-[#73946B]">

                    {/* Start title */}
                    <p className="text-xl font-bold mb-1">To Do List</p>
                    {/* End title */}
                    

                    {/* Start btn */}
                    <div className="w-full h-20 grid grid-cols-4 gap-5">
                        <button className="rounded-2xl hover:bg-[#9EBC8A] transition-colors duration-250">
                            <p className="font-bold text-xl text-white mb-1">0</p>
                            <p className="text-xs">To-Process Shipment</p>
                        </button>
                        <button className="rounded-2xl hover:bg-[#9EBC8A] transition-colors duration-250">
                            <p className="font-bold text-xl text-white mb-1">0</p>
                            <p className="text-xs">Processed Shipment</p>
                        </button>
                        <button className="rounded-2xl hover:bg-[#9EBC8A] transition-colors duration-250">
                            <p className="font-bold text-xl text-white mb-1">0</p>
                            <p className="text-xs">Return/Refund/Cancel</p>
                        </button>
                        <button className="rounded-2xl hover:bg-[#9EBC8A] transition-colors duration-250">
                            <p className="font-bold text-xl text-white mb-1">0</p>
                            <p className="text-xs">Banned / Deboosted Products</p>
                        </button>
                    </div>
                    {/* End btn */}

                </div>
            </div>
            {/* End to do list */}

            {/* Start my shop */}
            <div id="container" className="container-mid flex justify-center items-center pb-15 flex-col max-md:text-sm">

                {/* Start subtitle */}
                <div id="classification" className="border w-full pl-10 py-4 mt-4 grid grid-cols-[3fr_1fr_1fr_1fr_2fr_1fr]">
                    <h3 className="text-start">Status</h3>
                    <h3 className="text-center">Price</h3>
                    <h3 className="text-center">Sale</h3>
                    <h3 className="text-center">Stock</h3>
                    <h3 className="text-center">Hashtag</h3>
                    <button onClick={() => setIsAddProductOpen(true)} className="flex justify-center items-center justify-self-center w-1/3 hover:text-[#537D5D]">
                        <FaPlus />
                    </button>
                </div>
                {/* End subtitle */}

                {/* Start shop item */}
                <div id="cart-item" className="w-full ">
                    {Array.isArray(items) && items.map((item) => (
                        <ShopItem
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            stock={item.stock}
                            hashTags={item.hashTags}
                            imageUrls={item.imageUrls}
                            sale={item.sale}
                            isAvailable={item.isAvailable}
                        />
                    ))}
                </div>
                {/* End shop item */}

                
                {/* Start Select/Deselect All (bottom) */}
                <div id="classification" className="border w-full pl-10 pr-3 py-1 mt-5 flex justify-between">
                    <div className="flex items-center py-3">
                        <h3 className="text-start">Status</h3>
                    </div>
                </div>
                {/* End Select/Deselect All (bottom) */}
                
            </div>
            {/* End my shop */}

        </div>
    )
}

export default ProductInput