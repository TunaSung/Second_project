import HistoryItem from '../Feature/HistoryItem'

function CompletedOrder({ merchantTradeNo, date, pios, seller }) {

    return (
        <div className="w-full border rounded-xl overflow-hidden drop-shadow-[2px_2px_3px_rgba(0,0,0,0.8)]">
            {pios.map((item, i) => (
                <HistoryItem key={i} merchantTradeNo={merchantTradeNo} amount={item.amount} image={item.product.imageUrls} 
                name={item.product.name} price={item.product.price} date={date} seller={seller} />
            ))}
        </div>
    )
}

export default CompletedOrder