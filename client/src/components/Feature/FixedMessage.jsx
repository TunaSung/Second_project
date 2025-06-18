import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// UI and icons
import { MdMessage } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";

function FixedMessage() {

    // useState
    const [isCLick, setIsClick] = useState(false)
    const [msg, setMsg] = useState("")

    // toggle msg wrapper
    const handleWrapperClick = () => {
        setIsClick(!isCLick)
    }

    return(
        <motion.div className={`fixed right-15 bottom-15 z-100 border p-3 pb-4 overflow-hidden grid grid-cols-[auto_1fr]
                        ${isCLick ? "" : "hover:bg-blue-400 hover:text-white"} bg-gray-100 transition-all duration-200`}
        style={{width: isCLick ? '500px' : '40px',
            height: isCLick ? '70vh' : '40px',
            borderRadius: isCLick ? '16px' : "100%",
        }}>  
            {/* start aside */}
            <motion.div className="h-[95%] w-50 rounded-l-xl overflow-y-scroll cart-scroll"
            style={{opacity: isCLick ? "100%" : 0}}>
                <button className="w-full h-1/6 hover:bg-gray-300/70 flex items-center pl-2">
                    <div className="w-10 aspect-square rounded-full border mr-2"></div>
                    <div className="grid gird-rows-2">
                        <p className="font-bold line-clamp-1 text-start">This is seller's name</p>
                        <p className="text-gray-500 line-clamp-1 text-start">The last message</p>
                    </div>
                </button>
                <button className="w-full h-1/6 hover:bg-gray-300/70 flex items-center pl-2">
                    <div className="w-10 aspect-square rounded-full border mr-2"></div>
                    <div className="grid gird-rows-2">
                        <p className="font-bold line-clamp-1 text-start">This is seller's name</p>
                        <p className="text-gray-500 line-clamp-1 text-start">The last message</p>
                    </div>
                </button>
                <button className="w-full h-1/6 hover:bg-gray-300/70 flex items-center pl-2">
                    <div className="w-10 aspect-square rounded-full border mr-2"></div>
                    <div className="grid gird-rows-2">
                        <p className="font-bold line-clamp-1 text-start">This is seller's name</p>
                        <p className="text-gray-500 line-clamp-1 text-start">The last message</p>
                    </div>
                </button>
                <button className="w-full h-1/6 hover:bg-gray-300/70 flex items-center pl-2">
                    <div className="w-10 aspect-square rounded-full border mr-2"></div>
                    <div className="grid gird-rows-2">
                        <p className="font-bold line-clamp-1 text-start">This is seller's name</p>
                        <p className="text-gray-500 line-clamp-1 text-start">The last message</p>
                    </div>
                </button>
                <button className="w-full h-1/6 hover:bg-gray-300/70 flex items-center pl-2">
                    <div className="w-10 aspect-square rounded-full border mr-2"></div>
                    <div className="grid gird-rows-2">
                        <p className="font-bold line-clamp-1 text-start">This is seller's name</p>
                        <p className="text-gray-500 line-clamp-1 text-start">The last message</p>
                    </div>
                </button>
                <button className="w-full h-1/6 hover:bg-gray-300/70 flex items-center pl-2">
                    <div className="w-10 aspect-square rounded-full border mr-2"></div>
                    <div className="grid gird-rows-2">
                        <p className="font-bold line-clamp-1 text-start">This is seller's name</p>
                        <p className="text-gray-500 line-clamp-1 text-start">The last message</p>
                    </div>
                </button>
                <button className="w-full h-1/6 hover:bg-gray-300/70 flex items-center pl-2">
                    <div className="w-10 aspect-square rounded-full border mr-2"></div>
                    <div className="grid gird-rows-2">
                        <p className="font-bold line-clamp-1 text-start">This is seller's name</p>
                        <p className="text-gray-500 line-clamp-1 text-start">The last message</p>
                    </div>
                </button>
                
            </motion.div>
            {/* end aside */}

            {/* start msg */}
            <motion.div className="grid grid-rows-[1fr_auto] h-[95%]"
            style={{opacity: isCLick ? "100%" : 0}}>

                {/* start msg wrapper */}
                <ul className="bg-gray-200 rounded-tr-xl"></ul>
                {/* end msg wrapper */}

                {/* start input msg */}
                <div className="rounded-br-xl bg-white">
                    <input type="text" className="w-full p-2 placeholder:text-sm focus:outline-0" 
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Input text"/>
                    <div className="flex justify-end"> 
                        <button className="w-8 aspect-square flex justify-center items-center text-gray-400">
                            <LuSendHorizontal />
                        </button>
                    </div>
                </div>
                {/* end input msg */}

            </motion.div>
            {/* end msg */}
            
            {/* start open */}
            <motion.button onClick={handleWrapperClick} className="absolute right-1.5 bottom-1.5 -translate-x-0.5 z-20">
                {isCLick ? <IoMdCloseCircleOutline className="text-3xl w-full h-full text-gray-400 hover:text-red-600 transition-all duration-200"/> 
                : <MdMessage className="text-2xl w-full h-full"/>}
            </motion.button>
            {/* end open */}
            
            
        </motion.div>
    )
}

export default FixedMessage

