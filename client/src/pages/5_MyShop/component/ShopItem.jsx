import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// API services
import {
  updateAvailable,
  updateMyShop,
  getMyShop,
} from "../../../services/productService";

// UI & icons
import { MdModeEdit } from "react-icons/md";
import ProductForm from "./ShopEdit";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "../../../style/Swiper.css";
import { EffectFade, Pagination } from "swiper/modules";

function ShopItem({
  categories,
  subcategories,
  productId,
  available,
  itemName,
  itemPrice,
  sale,
  itemStock,
  itemHashTags,
  itemImageUrls,
  itemCategoryId,
  setItems,
}) {
  // useState
  const [name, setName] = useState(itemName);
  const [price, setPrice] = useState(itemPrice);
  const [stock, setStock] = useState(itemStock);
  const [hashTags, setHashTags] = useState(itemHashTags);
  const [imageUrls, setImageUrls] = useState([]);
  const [categoryId, setCategoryId] = useState(itemCategoryId);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(available);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // useEffect to log imageUrls changes
  useEffect(() => {
    console.log("🟢 最新的 imageUrls", imageUrls);
  }, [imageUrls]);

  useEffect(() => {
    const child = subcategories.find((sub) => sub.id === itemCategoryId);
    setChildName(child.name);
    const parent = categories.find((cat) => cat.id === child.parentId);
    setParentName(parent.name);
  }, []);

  // useEffect to log other state changes
  const handleConfirmOpen = () => {
    setIsConfirmOpen(!isConfirmOpen);
  };

  //   Function to toggle availability
  const toggleAvailabe = async (productId) => {
    try {
      const update = await updateAvailable(productId);
      setIsAvailable(!isAvailable);
      setIsConfirmOpen(false);
      toast.success(`商品已${!isAvailable ? "上架" : "下架"}`);
    } catch (err) {
      console.log("狀態更改失敗", err);
      toast.error("狀態更改失敗");
    }
  };

  // Function to handle form submission
  const handleClose = () => {
    setIsUpdateOpen(false);
    setName(itemName);
    setPrice(itemPrice);
    setStock(itemStock);
    setHashTags(itemHashTags);
    setCategoryId(itemCategoryId);
    setImageUrls([]);
  };

  return (
    <div id="cart-items">
      {/* Start update product */}
      {isUpdateOpen && (
        <ProductForm
          isEdit={true}
          initialValues={{
            id: productId,
            name: itemName,
            price: itemPrice,
            stock: itemStock,
            hashTags: itemHashTags,
            categoryId: itemCategoryId,
          }}
          onClose={handleClose}
          onSubmit={updateMyShop}
          onSubmitSuccess={() => getMyShop().then(setItems)}
          categories={categories}
          subcategories={subcategories}
        />
      )}
      {/* End update product */}

      {/* Start Product details */}
      <div
        id="container"
        className="mt-4 w-full border py-4 pl-10 hover:bg-[#537D5D] grid grid-cols-[3fr_1fr_1fr_1fr_2fr_1fr] items-center"
      >
        <div className="flex items-center pl-2">
          {/* Start Edit Available Confirm Open */}
          {isConfirmOpen ? (
            <div className="fixed-mid w-80 h-30 p-5 z-100 flex flex-col justify-center items-center border bg-[#f8f7cf]">
              <p className="text-black w-full mb-4">
                Confirm changing the product status?
              </p>
              <div className="flex justify-center items-center gap-rwd">
                <button
                  onClick={() => toggleAvailabe(productId)}
                  className="w-20 h-10 border bg-[#537D5D]"
                >
                  Confirm
                </button>
                <button
                  onClick={handleConfirmOpen}
                  className="w-20 h-10 border bg-[#537D5D]"
                >
                  Cancal
                </button>
              </div>
            </div>
          ) : null}
          {/* End Edit Available Confirm Open */}

          {/* Start Edit Open */}
          <button
            onClick={handleConfirmOpen}
            className="w-5 border aspect-square rounded-full drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]"
            style={{ backgroundColor: isAvailable ? "green" : "red" }}
          />
          {/* End Edit Open */}

          {/* Start Image Carousel */}
          <Swiper
            id="my-shop-img"
            loop={itemImageUrls > 3}
            effect={"fade"}
            grabCursor={true}
            pagination={{ clickable: true }}
            modules={[EffectFade, Pagination]}
            className="w-20 aspect-square flex justify-center items-center"
          >
            {itemImageUrls.map((fileUrl, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-20 aspect-square bg-cover-set mr-3"
                  style={{
                    backgroundImage: `url(${fileUrl})`,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* End Image Carousel */}

          {/* Start Item's Name */}
          <a href="#!" className="w-3/5">
            <label htmlFor="cart-item" className="">
              <h3 id="cart-item-title" className="line-clamp-1">
                {itemName}
              </h3>
              <p className="text-xs line-clamp-1">
                {parentName} : {childName}
              </p>
            </label>
          </a>
          {/* End Item's Name */}
        </div>

        {/* Start Item's Price */}
        <div className="text-center">${itemPrice}</div>
        {/* End Item's Price */}

        {/* Start Item's Sale */}
        <div className="text-center">{sale}</div>
        {/* End Item's Sale */}

        {/* Start Item's Stock */}
        <div id="amount" className="flex justify-center">
          <p className="text-center">{itemStock}</p>
        </div>
        {/* End Item's Stock */}

        {/* Start Item's HashTags */}
        <div className="flex justify-center items-center flex-wrap h-25 overflow-y-scroll cart-scroll">
          {itemHashTags
            .sort()
            .reverse()
            .map((tag, index) => (
              <p
                key={index}
                className="text-xs inline px-1 rounded-3xl border bg-[#CAE8BD] text-[#1f4428] mr-1 "
              >
                {tag}
              </p>
            ))}
        </div>
        {/* End Item's HashTags */}
 
        {/* Start Edit Button */}
        <div className="flex justify-center items-center gap-3">
          <button onClick={() => setIsUpdateOpen(true)}>
            <MdModeEdit className="hover:text-[#91C8E4] scale-125" />
          </button>
        </div>
        {/* End Edit Button */}
      </div>
      {/* End Product details */}
    </div>
  );
}
export default ShopItem;
