import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import CardItem from "../components/Feature/CardItem";
import { useAuth } from "../components/Context/authContext"
import { useState } from "react";

function Cart({ isClicked, setIsClicked }) {

    const { cartList } = useAuth()
    const subTotal = cartList.reduce((sum, item) => sum + item.amount * item.product.price, 0);

    return (
        <motion.div id="cart-page" className="fixed right-0 h-full shadow-2xl grid grid-rows-[auto_1fr_auto] rounded-l-xl z-200 bg-[#D2D0A0] overflow-hidden transition-all duration-150"
        style={{ width: isClicked ? "30%" : "0%"}}>

            {/* start header */}
            <div className="mb-2 h-26 px-8 cart-container">
                <div className="border-b py-8 w-full h-full flex items-center justify-between">
                    {/* start title & quantity */}
                    <div className="flex">
                        <h1 className="text-5xl text-[#537D5D] indie-flower-regular mr-3 font-bold">Your Cart</h1>
                        <p className="rounded-3xl text-xs text-[#f9f7d3] h-lh py-3 px-4 font-bold bg-[#73946B] flex items-center justify-center">{cartList.length} items</p>
                    </div>
                    {/* end title & quantity */}

                    {/* start close btn */}
                    <MdClose onClick={() => {setIsClicked(false)}} className="text-3xl cursor-pointer hover:text-red-500"/>
                    {/* end close btn */}

                </div>
            </div>
            {/* end header */}

            {/* start card items */}
            <div className="cart-container overflow-y-scroll cart-scroll mb-2">
                <div className="h-full">
                    {cartList.map((item) => (
                        <CardItem key={item.key} productId={item.product.id} title={item.product.name} amount={item.amount} price={item.product.price} stock={item.product.stock} hashTags={item.product.hashTags} imageUrls={item.product.imageUrls} />
                    ))}
                </div>
            </div>
            {/* end card items */}

            {/* start checkout */}
            <div className="cart-container flex-col bg-[#67AE6E] rounded-t-3xl rounded-bl-xl py-8">

                {/* start subtotal */}
                <div className="flex w-full justify-between text-lg mb-2">
                    <p>Subtotal</p>
                    <p>${subTotal}</p>
                </div>
                {/* end subtotal */}

                {/* start check out btn */}
                <button className="w-full text-lg text-white rounded-lg py-2 bg-[#537D5D] border-white border-2 hover:bg-[#d6d5a4] hover:text-[#497152] transition-all duration-200">
                    Check out
                </button>
                {/* end check out btn */}

            </div>
            {/* end checkout */}

        </motion.div>
    )
}

export default Cart