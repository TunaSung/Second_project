import { LuInstagram, LuFacebook} from "react-icons/lu";
import { FaLine, FaPhoneVolume, FaLandmark, FaRegCopyright} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function Footer(){
    return (
        <footer id="footer" className="py-10 w-full font-bold bg-[#333] text-[#ccc]">
            <div id="container" className="container-mid flex justify-center items-center flex-col">
                <div id="row" className="row w-full grid grid-cols-3 gap-rwd mb-5">
                    <a href="#!" className=" text-xl hover:text-blue-700 transition-all duration-200">Inspection report</a>
                    <a href="#!" className="text-center text-xl hover:text-blue-700 transition-all duration-200">Privacy rights</a>
                    <a href="#!" className="text-end text-xl hover:text-blue-700 transition-all duration-200">Statement announcement</a>
                </div>
                <div id="icon" className="flex gap-rwd mb-5">
                    <a href="#!">
                        <FaLine className="text-4xl hover:text-green-400 transition-all duration-200"/>
                    </a>
                    <a href="#!">
                        <LuInstagram className="text-4xl"/>
                    </a>
                    <a href="#!">
                        <LuFacebook className="text-4xl"/>
                    </a>
                </div>
                <div className="w-full row flex flex-col items-start">
                    <div id="phone" className="flex items-center justify-center mb-3 gap-2">
                        <FaPhoneVolume className="text-3xl"/>
                        <a href="tel:0931910536" className="text-xl"> 0987-654-321</a>
                    </div>
                    <div id="email" className="flex items-center justify-center mb-3 gap-2">
                        <MdEmail  className="text-3xl"/>
                        <a href="#!" className="text-xl"> pyparty69@gmail.com</a>
                    </div>
                    <div id="phone" className="flex items-center justify-center mb-3 gap-2">
                        <FaLandmark  className="text-3xl"/>
                        <div className="text-xl"> 39 Donggyo-ro 27-gil, Mapo-gu, Seoul, 南韓</div>
                    </div>
                    <div id="copyright" className="flex items-center justify-center gap-2">
                        <FaRegCopyright  className="text-3xl"/>
                        <div className="text-xl"> copyrighttttttttttttttttttttttttt</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer