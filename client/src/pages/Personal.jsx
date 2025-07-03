import { useState, useEffect } from "react"
import HistioryItem from "../components/Feature/HistoryItem"
import { RiImageEditFill } from "react-icons/ri";
import { MdAddCard } from "react-icons/md";
import { motion } from "framer-motion"

const items = [
  {
    id: 1,
    name: "Vintage 牛仔外套",
    hashtag: "#vintage #denim",
    price: 1200,
    stock: 2,
    sale: 0,
    seller: "賣家A"
  },
  {
    id: 2,
    name: "復古格紋襯衫",
    hashtag: "#retro #plaid #shirt",
    price: 550,
    stock: 4,
    sale: 0,
    seller: "賣家B"
  },
  {
    id: 3,
    name: "二手皮革夾克",
    hashtag: "#leather #jacket",
    price: 1800,
    stock: 1,
    sale: 0,
    seller: "賣家C"
  },
  {
    id: 4,
    name: "韓系寬鬆針織衫",
    hashtag: "#kstyle #knitwear",
    price: 600,
    stock: 3,
    sale: 0,
    seller: "賣家D"
  },
  {
    id: 5,
    name: "街頭風連帽衛衣",
    hashtag: "#streetwear #hoodie",
    price: 700,
    stock: 6,
    sale: 0,
    seller: "賣家E"
  },
  {
    id: 6,
    name: "優雅波點洋裝",
    hashtag: "#elegant #polkadot #dress",
    price: 950,
    stock: 2,
    sale: 0,
    seller: "賣家F"
  }
];


function Personal() {

    const [profile, setProfile] = useState({
        username: "Tuna",
        email: "ytsung99@gmail.com",
        phone: "0931910536",
        address: "高雄市小港區漢民路695號",
        creditCard: ["1234"],
        avatarUrl: "/imgs/kpop/karina-aespa-dirty-work2.jpg"
    })
    const atIndex = profile.email.indexOf("@");

    const [fileURL, setFileURL] = useState(profile.avatarUrl)
    const [email, setEmail] = useState(profile.email)
    const [phone, setPhone] = useState(profile.phone)
    const [address, setAddress] = useState(profile.address)
    const [isEdited, setIsEdited] = useState(false)
    const [isHoverd, setIsHovered] = useState(false)
    const [isFormShow, setIsFormShow] = useState(false)
    const [bankCode, setBankCode] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");


    const handleImgChange = (e) => {
        const file = e.target.files[0]
        if (!file) return;
        const url = URL.createObjectURL(file);
        setFileURL(url);
    }

    const handleProflieInfo = (e) =>{
        e.preventDefault();
        if (isEdited) {
        setProfile(prev => ({
            ...prev,
            email,
            phone,
            address
        }));
        }
        setIsEdited(!isEdited);
    }
    
    return (
        <div className="bg-[#9EBC8A] text-[#f1f0c7] pb-30">
            <div className="container-mid">
                {/* Start profile */}
                <div className="border border-t-0 bg-[#73946B] sticky top-1/4 w-full py-15 flex justify-center items-center">

                    {/* Start title */}
                    <div className='absolute w-full h-10 left-0 top-0 z-500'>
                        <svg width='100%' height='40' viewBox='0 0 100 10' preserveAspectRatio="none"  xmlns='http://www.w3.org/2000/svg'>
                            <line x1="0" y1="0" x2="2.8%" y2="0" stroke="#f1f0c7" strokeWidth="0.5" />
                            <line x1="13.4%" y1="0" x2="100%" y2="0" stroke="#f1f0c7" strokeWidth="0.5" />
                        </svg>
                        <div className="absolute px-3 left-5 -top-5 text-4xl font-bold  drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">Profile</div>
                    </div>
                    {/* End title */}

                    <div className="w-4/5 flex justify-center items-center">

                        {/* Start info */}
                        <form action="" className="w-full">
                            <table className="table-auto w-full">

                                {/* Start username */}
                                <tr>
                                    <td className="pb-8">
                                        <label htmlFor="">Username</label>
                                    </td>
                                    <td className="pb-8">
                                        <div>
                                            {profile.username}
                                        </div>
                                    </td>
                                </tr>
                                {/* End username */}

                                {/* Start email */}
                                <tr>
                                    <td className="pb-8">
                                        <label htmlFor="">Email</label>
                                    </td>
                                    <td className="pb-8">
                                        <span className="mr-2">
                                            {!isEdited ? (
                                                email.slice(0,3) + "*".repeat(atIndex-3) + email.slice(atIndex)
                                            )
                                            : (
                                                <input type="email" className="border rounded-md pl-1"
                                                value={email} 
                                                onChange={(e) => {setEmail(e.target.value)}}
                                                />
                                            )
                                            }
                                        </span>
                                    </td>
                                </tr>
                                {/* End email */}

                                {/* Start phone num */}
                                <tr>
                                    <td className="pb-8">
                                        <label htmlFor="">Phone Number</label>
                                    </td>
                                    <td className="pb-8">
                                        <span className="mr-2">
                                            {!isEdited ? (
                                                "*".repeat(7) + profile.phone.slice(-3)
                                            )
                                            : (
                                                <input type="tel" className="border rounded-md pl-1"
                                                value={phone} 
                                                onChange={(e) => {setPhone(e.target.value)}}
                                                />
                                            )
                                            }
                                        </span>
                                    </td>
                                </tr>
                                {/* End phone num */}

                                {/* Start address */}
                                <tr>
                                    <td className="pb-8">
                                        <label htmlFor="">Address</label>
                                    </td>
                                    <td className="pb-8">
                                        <span className="mr-2">
                                            {!isEdited ? (
                                                profile.address
                                            )
                                            : (
                                                <input type="tel" className="border rounded-md pl-1"
                                                value={address} 
                                                onChange={(e) => {setAddress(e.target.value)}}
                                                />
                                            )
                                            }
                                        </span>
                                    </td>
                                </tr>
                                {/* End address */}

                                {/* Start btn */}
                                <tr>
                                    <td className=""></td>
                                    <td className="">
                                        <div>
                                            <button onClick={handleProflieInfo} type="submit" className="border px-5 py-2 rounded">{isEdited ? 'Save' : 'Edit'}</button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Start btn */}

                            </table>
                        </form>
                        {/* End info */}

                        <div  className="w-1/3 flex flex-col justify-center items-center border-l-2 border-gray-300 py-10">

                            {/* Start avatar */}
                            <form className="w-full flex justify-center items-center mb-10">
                                <div className="rounded-full" 
                                onMouseEnter={() => setIsHovered(true)} 
                                onMouseLeave={() => setIsHovered(false)}
                                >
                                    <div className="bg-cover-set w-30 aspect-square rounded-full " 
                                    style={{backgroundImage: `url(${fileURL})`}}
                                    />
                                    <motion.label htmlFor="file-input"
                                        className="absolute-mid w-full bg-[#f1f0c7]/30 aspect-square rounded-full border flex justify-center items-center cursor-pointer z-50"
                                        initial={{scale: 0}}
                                        animate={{scale: isHoverd ? 1 : 0}}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <RiImageEditFill className="scale-175"/>
                                    </motion.label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        className="hidden"
                                        onChange={handleImgChange}
                                        accept="image/*"
                                    />
                                </div>
                            </form>
                            {/* End avatar */}


                            <button onClick={()=>setIsFormShow(true)} className="border p-3 rounded-full group hover:bg-[#f1f0c7] transition-all duration-250">
                                <MdAddCard className="scale-125 group-hover:text-[#537D5D]"/>
                            </button>

                            <motion.form className="fixed-mid w-120 aspect-[2/1] border  bg-[#f1f0c7] text-[#537D5D] p-8"
                                initial={{scale: 0, opacity: 0}}
                                animate={{scale: isFormShow ? 1 : 0, opacity: isFormShow ? 1 : 0}}
                                transition={{duration: 0.4}}
                            >
                                <div className="mb-5 text-lg">Payout Account</div>
                                <select
                                    name="bankCode"
                                    value={bankCode}
                                    onChange={(e) => setBankCode(e.target.value)}
                                    className="w-1/2 border px-3 py-2 rounded-md z-50 mb-5"
                                >
                                    <option value="">Bank code</option>
                                    <option value="004">004 - 台灣銀行</option>
                                    <option value="005">005 - 土地銀行</option>
                                    <option value="700">700 - 中華郵政</option>
                                    {/* 加入其他銀行 */}
                                </select>

                                <input
                                    type="text"
                                    placeholder="Account number"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-md mb-5"
                                />

                                <input
                                    type="text"
                                    placeholder="Account name"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-md mb-10"
                                />
                                <div className="w-full flex justify-center gap-rwd">
                                    <button type="submit" className="border w-20 text-[#73946B] hover:bg-[#537D5D] hover:text-[#f1f0c7] px-4 py-2 rounded-md transition-all duration-200">
                                        Save
                                    </button>
                                    <button type="button" onClick={() => setIsFormShow(false)} className="border w-20 text-[#73946B] hover:bg-[#BE5B50] hover:text-[#f1f0c7] px-4 py-2 rounded-md transition-all duration-200">
                                        Cansel
                                    </button>
                                </div>
                            </motion.form>

                        </div>
                    </div>

                </div>
                {/* End profile */}

                {/* Start history */}
                <div className="border border-t-0 bg-[#73946B] z-50 sticky top-1/4 w-full mt-50 py-15 flex flex-col justify-center items-center">

                    {/* Start title */}
                    <div className='absolute w-full h-10 left-0 top-0 z-500'>
                        <svg width='100%' height='40' viewBox='0 0 100 10' preserveAspectRatio="none"  xmlns='http://www.w3.org/2000/svg'>
                            <line x1="0" y1="0" x2="2.8%" y2="0" stroke="#f1f0c7" strokeWidth="0.5" />
                            <line x1="14.4%" y1="0" x2="100%" y2="0" stroke="#f1f0c7" strokeWidth="0.5" />
                        </svg>
                        <div className="absolute px-3 left-5 -top-5 text-4xl font-bold  drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">History</div>
                    </div>
                    {/* End title */}

                    <div id="classification" className="w-full pl-10 grid grid-cols-[4fr_1fr_1fr_1fr_1fr]">
                        <div></div>
                        <div className="text-center">Price</div>
                        <div className="text-center">Sale</div>
                        <div className="text-center">Stock</div>
                        <div className="text-center">Hashtag</div>
                    </div>
                    <div id="cart-item" className="w-full ">
                        {items.map((item, index) => (
                            <HistioryItem seller={item.seller} key={item.id} name={item.name} price={item.price} stock={item.stock} sale={item.sale}/> 
                        ))}
                    </div>

                </div>
                {/* End history */}

                



            </div>
        </div>
    )
}

export default Personal