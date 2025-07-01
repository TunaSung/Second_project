import { useState } from "react";
import { motion } from "framer-motion";
// UI
import ShopItem from "../components/Feature/ShopItem";
import { FaPlus } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";

// item example
const items = [
  {
    id: 1,
    name: "Vintage 牛仔外套",
    hashtag: "#vintage #denim",
    price: 1200,
    stock: 2,
    sale: 0
  },
  {
    id: 2,
    name: "復古格紋襯衫",
    hashtag: "#retro #plaid #shirt",
    price: 550,
    stock: 4,
    sale: 0
  },
  {
    id: 3,
    name: "二手皮革夾克",
    hashtag: "#leather #jacket",
    price: 1800,
    stock: 1,
    sale: 0
  },
  {
    id: 4,
    name: "韓系寬鬆針織衫",
    hashtag: "#kstyle #knitwear",
    price: 600,
    stock: 3,
    sale: 0
  },
  {
    id: 5,
    name: "街頭風連帽衛衣",
    hashtag: "#streetwear #hoodie",
    price: 700,
    stock: 6,
    sale: 0
  },
  {
    id: 6,
    name: "優雅波點洋裝",
    hashtag: "#elegant #polkadot #dress",
    price: 950,
    stock: 2,
    sale: 0
  }
];

function ProductInput() {

    const [fileNames, setFileNames] = useState([])
    const [isAddProductOpen, setIsAddProductOpen] = useState(false)

    const handleChange = (e) => {
        setFileNames([])
        const file = Array.from(e.target.files)
        setFileNames(file)

    }
    return (
        <div className="pt-30 bg-[#9EBC8A] text-[#f8f7cf]">
            
            {/* Start add product */}
            <motion.div className="fixed-mid p-4 w-120 aspect-square border z-200 bg-white rounded-2xl"
            animate={{scale: isAddProductOpen ? [0, 1.1, 0.9, 1] : [1, 0],
                opacity: isAddProductOpen ? [0, 1] : [0, 0]
            }}
            transition={{
                scale: {duration: 0.8, times: [0, 0.7, 0.85, 1], ease: 'easeInOut'},
                opacity: {duration: 0.6}
            }}
            >
                
                <form className="w-full h-full p-3 flex flex-col justify-center items-center rounded-xl">
                    <MdClose onClick={() => setIsAddProductOpen(false)} className="absolute right-3 top-3 scale-150 hover:text-red-500 transition-all duration-250 cursor-pointer"

                    />
                    <div className="mb-8 flex flex-col justify-center items-center">
                        <label htmlFor="file-input"
                            className="p-10 border rounded-full cursor-pointer"
                        >
                            <LuImagePlus className="scale-150"/>
                        </label>
                        {fileNames.length > 0 && (
                            <ul className="mt-4 h-10 space-x-1 text-gray-700 overflow-y-auto">
                            {fileNames.map((file, idx) => (
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
                            <label htmlFor="title">Name: </label>
                            <label htmlFor="price">Price: </label>
                            <label htmlFor="stock">Stock: </label>
                            <label htmlFor="hashtag">Hashtag: </label>
                        </div>

                        <div className="flex flex-col gap-rwd">
                            <input type="text" id="title" className="border"/>
                            <input type="text" id="price" className="border"/>
                            <input type="number" id="stock" className="border"/>
                            <input type="text" id="hashtag" className="border"/>
                        </div>
                    </div>
                    <button type="submit" onClick={() => setIsAddProductOpen(false)} className="mt-10 border py-2 px-6 rounded-2xl">Add to shop</button>
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
                    <div>
                        <input
                            type="checkbox"
                            className="mr-3 scale-150"
                        />
                    </div>
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
                    {items.map((item, index) => (
                        <ShopItem key={item.id} name={item.name} price={item.price} stock={item.stock} sale={item.sale}/> 
                    ))}
                </div>
                {/* End shop item */}

                
                {/* Start Select/Deselect All (bottom) */}
                <div id="classification" className="border w-full pl-10 pr-3 py-1 mt-5 flex justify-between">
                    <div className="flex items-center py-3">
                        <input
                            type="checkbox"
                            className="mr-3 scale-150"
                        />
                    </div>
                </div>
                {/* End Select/Deselect All (bottom) */}
                
            </div>
            {/* End my shop */}

        </div>
    )
}

export default ProductInput