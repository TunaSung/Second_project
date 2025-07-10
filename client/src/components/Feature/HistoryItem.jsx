import { TiMessages } from "react-icons/ti";

function ShopItem({seller, name, price, sale, stock, date}){

    return(
        <div id="cart-items" className="">
            <div id="container" className="mt-4 w-full py-4 pl-10 hover:bg-[#537D5D] grid grid-cols-[4fr_1fr_1fr_1fr_1fr] items-center">
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
            </div>
        </div>
    )
}
export default ShopItem;