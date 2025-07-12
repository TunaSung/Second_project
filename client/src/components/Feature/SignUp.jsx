import { useState } from "react";
import { motion } from "framer-motion";

// UI and icons
import { signUp } from "../../services/authService";
import { IoPersonOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { toast } from "react-toastify";

function SignUp({ isShowed, toggleSignChange }) {
  // useState
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirm) {
        toast.warn("Passwords do not match");
        return;
      }
      const res = await signUp(username, phone, email, password);
      toast.success("Sign up successfullly");
      setUsername("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirm("");
      toggleSignChange();
    } catch (err) {
      console.error("🚨 註冊失敗", err); // ✅ 印出來看內容
      toast.error(
        err.response?.data?.message || err.message || "Sign up failed"
      );
    }
  };
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full h-full flex items-center justify-center transition-all duration-400"
      style={{ opacity: isShowed ? "100%" : 0 }}
    >
      <div className="border h-2/3 w-3/7 p-3 rounded-3xl flex items-center justify-center bg-white">
        <div className=" flex w-full h-full rounded-2xl flex-col items-center pt-6">
          {/* start username */}
          <div className="w-full h-12 flex items-center mb-5">
            <div className="flex pl-3 items-center w-full h-full ">
              <label htmlFor="username" className="text-2xl mr-2">
                <MdOutlineDriveFileRenameOutline />
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="peer border px-2 h-full rounded-xl 
                            placeholder-transparent focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="username"
                className="absolute bg-white px-1 left-1/5 cursor-text transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
                            peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-sm peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-sm"
              >
                Username
              </label>
            </div>
          </div>
          {/* end username */}

          {/* start phone number */}
          <div className="w-full h-12 flex items-center mb-5">
            <div className="flex pl-3 items-center w-full h-full ">
              <label htmlFor="phone-number" className="text-2xl mr-2">
                <MdOutlinePhone />
              </label>
              <input
                type="text"
                id="phone-number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="peer border px-2 h-full rounded-xl 
                            placeholder-transparent focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="phone-number"
                className="absolute bg-white px-1 left-1/5 cursor-text  transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
                            peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-sm peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-sm"
              >
                Phone number
              </label>
            </div>
          </div>
          {/* end phone number */}

          {/* start email */}
          <div className="w-full h-12 flex items-center mb-5">
            <div className="flex pl-3 items-center w-full h-full ">
              <label htmlFor="sign-up-email" className="text-2xl mr-2">
                <IoPersonOutline />
              </label>
              <input
                type="email"
                id="sign-up-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="peer border px-2 h-full rounded-xl 
                            placeholder-transparent focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="sign-up-email"
                className="absolute bg-white px-1 left-1/5 cursor-text  transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
                            peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-sm peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-sm"
              >
                Email
              </label>
            </div>
          </div>
          {/* end email */}

          {/* start password */}
          <div className="w-full h-12 flex items-center mb-5">
            <div className="flex  pl-3 items-center w-full h-full ">
              <label htmlFor="sign-up-password" className="text-2xl mr-2">
                <TbLockPassword />
              </label>
              <input
                type="password"
                id="sign-up-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="peer border px-2 h-full rounded-xl 
                            placeholder-transparent focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="sign-up-password"
                className="absolute bg-white px-1 left-1/5 cursor-text  transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
                            peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-sm peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-sm"
              >
                Password
              </label>
            </div>
          </div>
          {/* end password */}

          {/* start confirm */}
          <div className="w-full h-12 flex items-center mb-5">
            <div className="flex  pl-3 items-center w-full h-full ">
              <label htmlFor="confirm-password" className="text-2xl mr-2">
                <RiLockPasswordFill />
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
                className="peer border px-2 h-full rounded-xl 
                            placeholder-transparent focus:outline-none focus:border-blue-500"
                placeholder=""
              />
              <label
                htmlFor="confirm-password"
                className="absolute bg-white px-1 left-1/5 cursor-text  transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 
                            peer-focus:-top-2.5 peer-focus:text-blue-500 peer-focus:text-sm peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-sm"
              >
                Confirm
              </label>
            </div>
          </div>
          {/* end confirm */}

          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

          {/* start btn */}
          <button
            type="submit"
            className="rounded-lg mb-3 bg-black/60 py-3 w-3/4 text-[#ccc] hover:text-white hover:bg-black/40 cursor-pointer"
          >
            Sign Up
          </button>
          {/* end btn */}
        </div>
      </div>
    </motion.form>
  );
}

export default SignUp;
