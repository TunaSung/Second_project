import HistoryItem from "../feature/HistoryItem";

function PendingOrder({ merchantTradeNo, date, pios, seller }) {
  return (
    <div className="w-full border border-slate-300 rounded-xl overflow-hidden shadow-md">
      {pios.map((item, i) => (
        <HistoryItem
          key={i}
          merchantTradeNo={merchantTradeNo}
          amount={item.amount}
          image={item.product.imageUrls}
          name={item.product.name}
          price={item.product.price}
          date={date}
          seller={seller}
        />
      ))}
    </div>
  );
}

export default PendingOrder;
