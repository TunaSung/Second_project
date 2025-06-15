import { UserOutlined } from '@ant-design/icons';
import { IoClose } from "react-icons/io5";

function AvatarIcon({ isClick }){
    return (
        <>
            {/* <UserOutlined/> */}
            <div className='h-full w-full bg-cover-set bg-[url("imgs/aespa-karina-hot-mess.jpg")]'/>
            <IoClose className={`absolute-mid scale-150 bg-black/50 ${isClick ? 'opacity-100': "opacity-0"} `}/>
            {/* <div className='absolute -left-1 -top-1 rounded-tl-2xl bg-black w-20 h-50 border-1 z-5000'></div> */}
            
        </>
    )
}

export default AvatarIcon;