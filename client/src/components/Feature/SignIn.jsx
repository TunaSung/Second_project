import { useState } from "react";
import { motion, useTransform} from "framer-motion";

// UI and icons
import { IoPersonOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";

function SignIn( {isShowed} ) {

    // useState
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return(
        <motion.form action=""  className="w-full h-full flex items-center justify-center transition-all duration-400"
        style={{opacity: isShowed ? "100%" : 0}}
        >
            <div className="w-3/7 h-2/3 p-3 border rounded-3xl bg-white flex items-center justify-center">
                <div className="w-full h-full pt-7 border rounded-2xl flex flex-col items-center">

                    {/* start img */}
                    <div className="w-3/5 h-20  border mb-10"/>
                    {/* end img */}

                    {/* start email */}
                    <div className="w-full h-12 flex items-center mb-5">
                        <div className="flex pl-3 items-center w-full h-full ">
                            <label htmlFor="sign-in-email" className="text-2xl mr-2"><IoPersonOutline/></label>
                            <input 
                            type="email"
                            id="sign-in-email" 
                            value={email} 
                            onChange={(e) => {setEmail(e.target.value)}}
                            className="peer border px-2 h-full rounded-xl 
                            placeholder-transparent focus:outline-none focus:border-blue-500" 
                            placeholder=""/>
                            <label htmlFor="sign-in-email" 
                            className="absolute bg-white px-1 left-1/5 cursor-text peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                            peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-sm transition-all duration-200">
                                Email
                            </label>
                        </div>
                    </div>
                    {/* end email */}

                    {/* start password */}
                    <div className="w-full h-12 flex items-center mb-7">
                        <div className="flex  pl-3 items-center w-full h-full ">
                            <label htmlFor="sign-in-password" className="text-2xl mr-2"><TbLockPassword /></label>
                            <input 
                            type="password" 
                            id="sign-in-password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}} 
                            className="peer border px-2 h-full rounded-xl 
                            placeholder-transparent focus:outline-none focus:border-blue-500" 
                            placeholder=""/>
                            <label htmlFor="sign-in-password" 
                            className="absolute bg-white px-1 left-1/5 cursor-text peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                            peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-sm transition-all duration-200">
                                Password
                            </label>
                        </div>
                    </div>
                    {/* end password */}

                    {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

                    {/* start btn */}
                    <button type="submit" className="rounded-lg mb-5 bg-black/60 py-3 w-3/4 text-[#ccc] hover:text-white hover:bg-black/40 cursor-pointer">
                        Sign In
                    </button>
                    {/* end btn */}

                    {/* start forget */}
                    <button className="text-black text-sm hover:underline hover:text-red-800">Forget password?</button>
                    {/* end forget */}
           
                </div>
            </div>
        </motion.form>
    )
}

export default SignIn