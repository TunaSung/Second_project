import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, Space } from 'antd';
import { IoClose } from "react-icons/io5";

function AvatarIcon(){

    // useState
    const [isClicked, setIsClicked] = useState(false)

    return (
        <motion.div className='absolute left-1/4 top-0 bg-white rounded-2xl rounded-tl-none 
        z-150 overflow-hidden cursor-pointer'
        style={{width: isClicked ? "150px": "36px",
            height: isClicked ? "auto" : "100%",
            backgroundColor: isClicked ? "white" : "transparent",
        }}
        >

            <div className='w-full h-full'>
                {isClicked ? <IoClose className='z-90 absolute text-2xl' onClick={() => setIsClicked(!isClicked)}/>
                :
                <Space className='bg-black rounded-full'>
                    <Avatar size='small' className='z-90 text-2xl' icon={<UserOutlined/>} onClick={() => setIsClicked(!isClicked)}/>
                </Space>
                }
                <motion.div className='pt-1'
                style={{opacity: isClicked ? 100 : 0}}>
                    <div className='w-full text-center cursor-default'>Hi~ Tuna</div>
                    <div className='w-full py-2 text-center hover:bg-gray-300'>Profile</div>
                    <div className='w-full py-2 text-center hover:bg-gray-300'>My Shop</div>
                    <div className='w-full py-2 text-center hover:bg-red-300'>Logout</div>
                </motion.div>
            </div>

        </motion.div>
    )
}

export default AvatarIcon;