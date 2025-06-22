import { FaPlus, FaMinus } from "react-icons/fa";

function CardItem( {title, quantity, price} ) {

    const hashTags = ["#GentlyUsed", "#XL", "#Fashion", "#Sale", "#Discount"];

    return(
        <div className="border-b w-full py-4 grid grid-cols-[1fr_3fr] gap-3">
            {/* start product img */}
            <div className=" border h-32 aspect-square"></div>
            {/* end product img */}

            {/* start product info */}
            <div className="flex flex-col justify-between h-full gap-3">

                {/* start info detail */}
                <div className="flex justify-between gap-5">
                    <div className="flex flex-wrap">
                        <p>{title}</p>
                        <div className="mb-2 flex flex-wrap">
                            {hashTags.map((tag, index) => (
                                <p
                                key={index}
                                className="text-xs inline px-1 rounded-3xl bg-gray-300 mr-1"
                                >
                                {tag}
                            </p>
                            ))}
                        </div>
                    </div>
                    <div className="">${quantity*price}</div>
                </div>
                {/* end info detail */}
                
                {/* start quantity & remove */}
                <div className="flex justify-between h-8">
                    <div className="border-b grid grid-cols-[1fr_2fr_1fr] w-18">
                        <span className="flex items-center justify-center text-xs"><FaMinus /></span>
                        <span className="flex items-center justify-center font-bold">{quantity}</span>
                        <span className="flex items-center justify-center text-xs"><FaPlus /></span>
                    </div>
                    <p className="border-b flex self-end text-sm w-14 h-5">Remove</p>
                </div>
                {/* end quantity & remove */}
                
            </div>
            {/* end product info */}
        </div>
    )
}

export default CardItem 