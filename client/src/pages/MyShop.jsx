// UI
import ShopItem from "../components/Feature/ShopItem";

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
    return (
        <div className="">

            {/* Start title */}
            <div className="border-b p-4 pt-35 flex justify-self-center">
                <h1 className="text-5xl font-bold indie-flower-regular">My Shop</h1>
            </div>
            {/* End title */}

            {/* Start to do list */}
            <div className="container-mid mt-20">
                <div className="w-full border p-5">

                    {/* Start title */}
                    <p className="text-xl font-bold mb-1">To Do List</p>
                    {/* End title */}
                    

                    {/* Start btn */}
                    <div className="w-full h-20 grid grid-cols-4 gap-5">
                        <button className="rounded-2xl hover:bg-gray-100 transition-colors duration-250">
                            <p className="font-bold text-xl text-blue-600 mb-1">0</p>
                            <p className="text-xs">To-Process Shipment</p>
                        </button>
                        <button className="rounded-2xl hover:bg-gray-100 transition-colors duration-250">
                            <p className="font-bold text-xl text-blue-600 mb-1">0</p>
                            <p className="text-xs">Processed Shipment</p>
                        </button>
                        <button className="rounded-2xl hover:bg-gray-100 transition-colors duration-250">
                            <p className="font-bold text-xl text-blue-600 mb-1">0</p>
                            <p className="text-xs">Return/Refund/Cancel</p>
                        </button>
                        <button className="rounded-2xl hover:bg-gray-100 transition-colors duration-250">
                            <p className="font-bold text-xl text-blue-600 mb-1">0</p>
                            <p className="text-xs">Banned / Deboosted Products</p>
                        </button>
                    </div>
                    {/* End btn */}

                </div>
            </div>
            {/* End to do list */}

            {/* Start my shop */}
            <div id="container" className="container-mid flex justify-center items-center mb-15 flex-col max-md:text-sm">

                {/* Start subtitle */}
                <div id="classification" className="border w-full pl-10 py-4 mt-4 grid grid-cols-[3fr_1fr_1fr_1fr_2fr_1fr]">
                    <div>
                        <input
                            type="checkbox"
                            className="mr-3 scale-150"
                        />
                        Select/Deselect All
                    </div>
                    <div className="text-center">Price</div>
                    <div className="text-center">Sale</div>
                    <div className="text-center">Stock</div>
                    <div className="text-center">Hashtag</div>
                    <button className="text-center hover:text-green-400">Add product</button>
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
                        Select/Deselect All
                    </div>
                </div>
                {/* End Select/Deselect All (bottom) */}
                
            </div>
            {/* End my shop */}

        </div>
    )
}

export default ProductInput