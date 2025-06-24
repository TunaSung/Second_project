import { useState, useEffect , useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, Space } from 'antd';
import { IoClose } from "react-icons/io5";

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // ref.current 存在，且點擊目標不在該區塊內，就觸發 handler
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}

function AvatarIcon({setIsAution}){

    // useState
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null);

    // 當點擊到元件外，將isOpen = false
    useOutsideClick(containerRef, () => {
        if (isOpen) {
        setIsOpen(false);
        }
    });

    const handleLogout = () => {
        setIsOpen(!isOpen)
        setIsAution(false)
    }

    return (
        <motion.div className='absolute left-1/4 top-0 bg-white rounded-2xl rounded-tl-none 
        z-150 overflow-hidden cursor-pointer'
        style={{width: isOpen ? "150px": "36px",
            height: isOpen ? "auto" : "100%",
            backgroundColor: isOpen ? "white" : "transparent",
        }}
        >

            <div className='w-full h-full'>

                {/* Start Icon exchange */}
                {isOpen ? <IoClose className='z-90 absolute text-2xl' onClick={() => setIsOpen(!isOpen)}/>
                    :
                    <Space className='bg-black rounded-full'>
                    <Avatar size='small' className='z-90 text-2xl' icon={<UserOutlined/>} onClick={() => setIsOpen(!isOpen)}/>
                </Space>
                }
                {/* End Icon exchange*/}

                {/* Start menu */}
                <motion.div ref={containerRef} className='pt-1'
                style={{opacity: isOpen ? 100 : 0}}>
                    <div className='w-full text-center cursor-default mb-1'>Hi~ Tuna</div>

                    <Link to='/personal' className='block w-full py-2 text-center hover:bg-gray-300'
                    onClick={() => setIsOpen(!isOpen)}>
                        Profile
                    </Link>

                    <Link to={'/my-shop'} className='block w-full py-2 text-center hover:bg-gray-300' 
                    onClick={() => setIsOpen(!isOpen)}>
                        My Shop
                    </Link>
                    
                    <Link to={'/'} className='block w-full py-2 text-center hover:bg-red-300' 
                    onClick={handleLogout}>
                        Logout
                    </Link>
                    
                </motion.div>
                {/* End menu */}
                
            </div>

        </motion.div>
    )
}

export default AvatarIcon;