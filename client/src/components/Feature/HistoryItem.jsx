import { TiMessages } from "react-icons/ti";

function ShopItem({seller, name, price, sale, stock}){


    const hashTags = ["#GentlyUsed", "#XL", "#Fashion", "#Sale", "#Discount", "#Fashion", "#Sale", "#Discount", "#Discount", "#Fashion", "#Sale", "#Discount"];

    return(
        <div id="cart-items">
            <div id="container" className="mt-4 w-full py-4 pl-10 hover:bg-gray-100 grid grid-cols-[4fr_1fr_1fr_1fr_1fr] items-center">
                <div className="flex items-center flex-wrap">
                    <div className="w-full">
                        <span className="mr-3">Seller: {seller}</span>
                        <button><TiMessages/></button>
                    </div>
                    <a href="#!" className="w-20 aspect-square bg-[url('/imgs/kpop/karina-aespa-dirty-work.jpg')] bg-cover-set mr-3"/>
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
            </div>
        </div>
    )
}
export default ShopItem;