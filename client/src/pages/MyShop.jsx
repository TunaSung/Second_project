import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../components/Context/authContext";

// API Services
import { uploadProduct, getMyShop } from "../services/productService";

// UI
import ShopItem from "../components/Feature/ShopItem";
import { FaPlus } from "react-icons/fa";
import ProductForm from "../components/Feature/ShopEdit";

function MyShop() {
  // useState
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [hashTags, setHashTags] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [items, setItems] = useState([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // useAuth
  const { categories, subcategories } = useAuth();

  // get my shop items
  useEffect(() => {
    const fetchMyShop = async () => {
      try {
        const myShop = await getMyShop();
        setItems(myShop);
      } catch (err) {
        console.log("資料匯入失敗", err);
        toast.error("資料匯入失敗", err);
      }
    };
    fetchMyShop();
  }, []);

  // close form and reset state
  const handleClose = () => {
    setIsAddProductOpen(false);
    setName("");
    setPrice(0);
    setStock(0);
    setHashTags("");
    setImageUrls([]);
  };

  return (
    <div className="pt-30 bg-[#9EBC8A] text-[#f8f7cf]">
      {/* Start add product */}
      {isAddProductOpen && (
        <ProductForm
          isEdit={false}
          onClose={handleClose}
          onSubmit={uploadProduct}
          onSubmitSuccess={() => getMyShop().then(setItems)}
          categories={categories}
          subcategories={subcategories}
        />
      )}
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
      <div
        id="container"
        className="container-mid flex justify-center items-center pb-15 flex-col max-md:text-sm"
      >
        {/* Start subtitle */}
        <div
          id="classification"
          className="border w-full pl-10 py-4 mt-4 grid grid-cols-[3fr_1fr_1fr_1fr_2fr_1fr]"
        >
          <h3 className="text-start">Status</h3>
          <h3 className="text-center">Price</h3>
          <h3 className="text-center">Sale</h3>
          <h3 className="text-center">Stock</h3>
          <h3 className="text-center">Hashtag</h3>
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="flex justify-center items-center justify-self-center w-1/3 hover:text-[#537D5D]"
          >
            <FaPlus />
          </button>
        </div>
        {/* End subtitle */}

        {/* Start shop item */}
        <div id="cart-item" className="w-full ">
          {Array.isArray(items) &&
            items.map((item) => (
              <ShopItem
                key={item.id}
                productId={item.id}
                itemName={item.name}
                itemPrice={item.price}
                itemStock={item.stock}
                itemHashTags={item.hashTags}
                itemImageUrls={item.imageUrls}
                itemCategoryId={item.categoryId}
                sale={item.sale}
                available={item.isAvailable}
                setItems={setItems}
                categories={categories}
                subcategories={subcategories}
              />
            ))}
        </div>
        {/* End shop item */}

        {/* Start Select/Deselect All (bottom) */}
        <div
          id="classification"
          className="border w-full pl-10 pr-3 py-1 mt-5 flex justify-between"
        >
          <div className="flex items-center py-3">
            <h3 className="text-start">Status</h3>
          </div>
        </div>
        {/* End Select/Deselect All (bottom) */}
      </div>
      {/* End my shop */}
    </div>
  );
}

export default MyShop;
