import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import CardItem from "../components/Feature/CardItem";

    const cartItems = [{ key: 1, title: "Oversized Hoodie", quantity: 2, price: 1280 },
        { key: 2, title: "Denim Jacket", quantity: 1, price: 1680 },
        { key: 3, title: "Cotton Wide Pants", quantity: 3, price: 980 },
        { key: 4, title: "Crewneck Sweatshirt", quantity: 1, price: 1150 },
        { key: 5, title: "Linen Shirt Dress", quantity: 2, price: 1390 }
    ]

function Cart({ isClicked, setIsClicked }) {
    return (
        <motion.div id="cart-page" className="fixed right-0 h-full grid grid-rows-[auto_1fr_auto] rounded-l-xl z-200 bg-[#FFFBEF] overflow-hidden transition-all duration-150"
        style={{ width: isClicked ? "30%" : "0%"}}>

            {/* start header */}
            <div className="mb-2 h-26 px-8 cart-container">
                <div className="border-b py-8 w-full h-full flex items-center justify-between">
                    {/* start title & quantity */}
                    <div className="flex">
                        <h1 className="text-5xl indie-flower-regular mr-3 font-bold">Your Cart</h1>
                        <p className="rounded-3xl text-xs h-lh py-3 px-4 font-bold bg-[#E5ECD1] flex items-center justify-center">{cartItems.length} items</p>
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
                    {cartItems.map((item) => (
                        <CardItem key={item.key} title={item.title} quantity={item.quantity} price={item.price}/>
                    ))}
                </div>
            </div>
            {/* end card items */}

            {/* start checkout */}
            <div className="cart-container flex-col bg-[#F7EEDE] rounded-t-3xl rounded-bl-xl py-8">

                {/* start subtotal */}
                <div className="flex w-full justify-between text-lg mb-2">
                    <p>Subtotal</p>
                    <p>$999</p>
                </div>
                {/* end subtotal */}

                {/* start check out btn */}
                <button className="w-full text-lg text-white rounded-lg py-2 bg-[#e1c99f] border-white border-3 hover:bg-[#FFDEA3] hover:border-gray-400 hover:text-black transition-all duration-200">
                    Check out
                </button>
                {/* end check out btn */}

            </div>
            {/* end checkout */}

        </motion.div>
    )
}

export default Cart