import HistoryItem from "../feature/HistoryItem";

function CompletedOrder({ merchantTradeNo, date, pios, seller }) {
  return (
    <div className="w-full border border-slate-400 rounded-xl overflow-hidden shadow-md">
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

export default CompletedOrder;
