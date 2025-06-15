import { useState } from "react";
import { MdMessage } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

function FixedMessage() {

    const [isCLick, setIsClick] = useState(false)

    const handleMsgClick = () => {
        setIsClick(!isCLick)
    }

    return(
        <motion.div className={`fixed right-15 bottom-15 z-100 border  overflow-hidden
                        ${isCLick ? "" : "hover:bg-blue-400 hover:text-white"} bg-white transition-all duration-200`}
        style={{width: isCLick ? '240px' : '40px',
            height: isCLick ? '70vh' : '40px',
            borderRadius: isCLick ? '16px' : "100%",
        }}>  
            <motion.button onClick={handleMsgClick} className="absolute right-1.5 bottom-1.5 -translate-x-0.5 z-20">
                {isCLick ? <IoMdCloseCircleOutline className="text-3xl w-full h-full text-gray-400 hover:text-red-600 transition-all duration-200"/> 
                : <MdMessage className="text-2xl w-full h-full"/>}
            </motion.button>
            
            
        </motion.div>
    )
}

export default FixedMessage

