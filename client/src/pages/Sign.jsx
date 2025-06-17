import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";


function Sign() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="h-[100vh] w-full grid grid-cols-2 items-center justify-center mt-10">

            {/* start sign in */}
            <form action=""  className="border w-full h-full flex items-center justify-center">
                <div className="border h-2/3 w-3/7 p-3 flex items-center justify-center">
                    <div className=" border flex w-full h-full flex-col items-center pt-10 gap-5">

                        <div className="w-3/5 h-20  border"/>

                        <div className="w-3/5">
                            
                        </div>

                        <div className="w-full h-12 flex items-center">
                            <div className="flex justify-center items-center w-full h-full ">
                                <label htmlFor="email" className="text-2xl mr-2"><IoPersonOutline/></label>
                                <input 
                                type="email"
                                id="email" 
                                value={email} 
                                onChange={(e) => {setEmail(e.target-value)}}
                                className="peer border px-2 h-full rounded-xl 
                                placeholder-transparent focus:outline-none focus:border-blue-500" 
                                placeholder="Email"/>
                                <label htmlFor="email" 
                                className="absolute bg-white px-1 left-1/4 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                                peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-sm">
                                    Email
                                </label>
                            </div>
                        </div>

                        <div className="w-full h-12 flex items-center">
                            <div className="flex justify-center items-center w-full h-full ">
                                <label htmlFor="password" className="text-2xl mr-2"><TbLockPassword /></label>
                                <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => {setPassword(e.target-value)}} 
                                className="peer border px-2 h-full rounded-xl 
                                placeholder-transparent focus:outline-none focus:border-blue-500" 
                                placeholder="Password"/>
                                <label htmlFor="password" 
                                className="absolute bg-white px-1 left-1/4 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                                peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-sm">
                                    Password
                                </label>
                            </div>
                        </div>

                        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                        <button type="submit" className="rounded-lg bg-black/60 w-4/5 text-[#ccc] hover:text-white hover:bg-black/40 cursor-pointer">
                            Sign In
                        </button>
                        <a href="#!" className="hover:underline text-black hover:text-red-800">Forget password?</a>
                    </div>


                </div>
            </form>
            {/* end sign in */}


            {/* start sign up */}
            <div>

            </div>
            {/* end sign up */}
        </div>
    )
}

export default Sign