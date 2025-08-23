import { LuInstagram, LuFacebook} from "react-icons/lu";
import { FaLine, FaPhoneVolume, FaLandmark, FaRegCopyright} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
function Footer(){
    return (
        <div id="footer" className="py-10 font-bold bg-[#333] text-[#ccc]">
            <div id="container" className="container-mid flex justify-center items-center flex-col">
                <div id="row" className="row grid grid-cols-3 gap-rwd mb-5">
                    <a href="#!" className="text-center text-xl max-sm:text-sm hover:text-blue-700 transition-all duration-200">Inspection report</a>
                    <a href="#!" className="text-center text-xl max-sm:text-sm hover:text-blue-700 transition-all duration-200">Privacy rights</a>
                    <a href="#!" className="text-center text-xl max-sm:text-sm hover:text-blue-700 transition-all duration-200">Statement announcement</a>
                </div>
                <div id="icon" className="flex gap-rwd mb-5">
                    <a href="#!">
                        <FaLine className="text-4xl max-sm:text-2xl"/>
                    </a>
                    <a href="#!">
                        <LuInstagram className="text-4xl max-sm:text-2xl"/>
                    </a>
                    <a href="#!">
                        <LuFacebook className="text-4xl max-sm:text-2xl"/>
                    </a>
                </div>
                <div>
                    <div id="phone" className="flex mb-3 gap-2">
                        <FaPhoneVolume className="text-3xl max-sm:text-2xl"/>
                        <a href="tel:0931910536" className="text-xl max-sm:text-sm"> 0987-654-321</a>
                    </div>
                    <div id="email" className="flex mb-3 gap-2">
                        <MdEmail  className="text-3xl max-sm:text-2xl"/>
                        <a href="#!" className="text-xl max-sm:text-sm"> pyparty69@gmail.com</a>
                    </div>
                    <div id="phone" className="flex mb-3 gap-2">
                        <FaLandmark  className="text-3xl max-sm:text-2xl"/>
                        <div className="text-xl max-sm:text-sm"> 39 Donggyo-ro 27-gil, Mapo-gu, Seoul, 南韓</div>
                    </div>
                    <div id="copyright" className="flex gap-2">
                        <FaRegCopyright  className="text-3xl max-sm:text-2xl"/>
                        <div className="text-xl max-sm:text-sm"> copyrighttttttttttttttttttttttttt</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer