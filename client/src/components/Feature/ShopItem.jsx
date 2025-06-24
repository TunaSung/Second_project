import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
// import { updateCartItemQuantity, removeCartItem } from "../../service/cartService"

function ShopItem({name, price, sale, stock}){

    const [isDelete, setIsDelete] = useState(false)

    const hashTags = ["#GentlyUsed", "#XL", "#Fashion", "#Sale", "#Discount", "#Fashion", "#Sale", "#Discount", "#Discount", "#Fashion", "#Sale", "#Discount"];

    const handleDelete = async () => {
        setIsDelete(!isDelete)
        setAmount(0)
        // await removeCartItem(id); // 刪除後端的商品
        // if (isChecked) {
            // onAmountChange()
        // }
    };

    // const handleChecked = async () => {
    //     onClickChange(!isChecked, id)
    // }

    if (isDelete) {
        return null
    }


    return(
        <div id="cart-items">
            <div id="container" className="mt-4 w-full border py-4 pl-10 grid grid-cols-[3fr_1fr_1fr_1fr_2fr_1fr] items-center">
                <div className="flex items-center">
                    <input type="checkbox"  id="cart-item" className="mr-3 scale-150"
                    // onChange={e => onClickChange(e.target.checked, id)}
                    />
                    <a href="#!" className="w-20 aspect-square bg-[url('/images/winter.jpg')] bg-cover-set mr-3"/>
                    <a href="#!">
                        <label htmlFor="cart-item">
                            <h3 id="cart-item-title" className="max-w-50 line-clamp-2">{name}</h3>
                        </label>
                    </a>
                </div>
                <div className="text-center">${price}</div>
                <div className="text-center">{sale}</div>
                <div id="amount" className="flex justify-center">
                    <p className="text-center">{stock}</p>
                </div>
                <div className="flex justify-center items-center flex-wrap h-25 overflow-y-scroll cart-scroll">
                    {hashTags.sort().reverse().map((tag, index) => (
                        <p
                            key={index}
                            className="text-xs inline px-1 rounded-3xl border bg-gray-300 mr-1 "
                            >
                            {tag}
                        </p>
                    ))}
                </div>
                <button onClick={handleDelete}  className="hover:text-red-600">Delete</button>
            </div>
        </div>
    )
}
export default ShopItem;