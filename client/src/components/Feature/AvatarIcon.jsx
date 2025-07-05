import React, { useState, useEffect , useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { motion } from "framer-motion";
import { Avatar } from 'antd';
import { IoClose } from "react-icons/io5";
import { useAuth } from '../Context/authContext';

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

function AvatarIcon(){

    // useState
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null);
    const { avatarUrl, logout } = useAuth()
    const navigate = useNavigate()

    const avatarSrc = avatarUrl ? `${import.meta.env.VITE_API_URL}${avatarUrl}` : null;    

    // 當點擊到元件外，將isOpen = false
    useOutsideClick(containerRef, () => {
        if (isOpen) {
            setIsOpen(false);
        }
    });

    const toggleOpen = () => setIsOpen(prev => !prev);

    const handleLogout = () => {
        setIsOpen(!isOpen)
        logout()
        navigate('/')
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
                {isOpen ? (
                    <IoClose className='z-90 absolute text-2xl' onClick={() => setIsOpen(!isOpen)} />
                    ) : (
                    <div onClick={toggleOpen} className="p-1">
                        <Avatar size="small"
                        icon={!avatarUrl && <UserOutlined />}
                        src={avatarUrl ? `${import.meta.env.VITE_API_URL}${avatarUrl}` : null}
                        />

                    </div>
                )}
                {/* End Icon exchange*/}

                {/* Start menu */}
                <motion.div ref={containerRef} className='pt-1'
                style={{opacity: isOpen ? 100 : 0}}>
                    <div className='w-full text-center cursor-default mb-1'>Hi~ Tuna</div>

                    <Link to='/personal' className='block w-full py-2 text-center hover:bg-gray-300 hover:text-white'
                    onClick={() => setIsOpen(!isOpen)}>
                        My Account
                    </Link>

                    <Link to={'/my-shop'} className='block w-full py-2 text-center hover:bg-gray-300 hover:text-white' 
                    onClick={() => setIsOpen(!isOpen)}>
                        My Shop
                    </Link>
                    
                    <Link to={'/'} className='block w-full py-2 text-center hover:bg-red-300 hover:text-white' 
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