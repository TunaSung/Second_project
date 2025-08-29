import { useState } from "react";
import { motion } from "framer-motion";
import CompletedOrder from "./CompletedOrder";
import PendingOrder from "./PendingOrder";

/** Pure layout for order history; keeps its own tab state */
function History({ completedOrder = [], pendingOrder = [], loading = false }) {
  const [isCompleted, setIsCompleted] = useState(true);

  return (
    <div className="border border-t-0 bg-[#73946B] z-50 sticky top-1/4 w-full mt-50 py-15 flex flex-col justify-center items-center">
      {/* Title */}
      <div className="absolute w-full h-10 left-0 top-0 z-500">
        <svg width="100%" height="40" viewBox="0 0 100 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="2.8%" y2="0" stroke="#f1f0c7" strokeWidth="0.5" />
          <line x1="14.4%" y1="0" x2="100%" y2="0" stroke="#f1f0c7" strokeWidth="0.5" />
        </svg>
        <div className="absolute px-3 left-5 -top-5 text-4xl font-bold drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
          History
        </div>
      </div>

      {/* Content */}
      <div className="w-[90%] min-h-100">
        {/* Switch buttons */}
        <div className="w-full h-15 pl-8 flex items-end">
          <motion.button
            className="border border-b-0 w-35 h-3/4 px-3 rounded-t-xl"
            animate={{ height: isCompleted ? "100%" : "66.66%", fontSize: isCompleted ? "18px" : "14px" }}
            onClick={() => setIsCompleted(true)}
          >
            Completed
          </motion.button>
          <motion.button
            className="border border-b-0 w-35 2/3 px-3 rounded-t-xl"
            animate={{ height: isCompleted ? "66.66%" : "100%", fontSize: isCompleted ? "14px" : "18px" }}
            onClick={() => setIsCompleted(false)}
          >
            Pending
          </motion.button>
        </div>

        {/* Lists */}
        <div className="flex flex-col gap-rwd rounded-xl ">
          {loading ? (
            <div className="w-full h-100 flex justify-center items-center">
              <l-dot-stream size="40" speed="2.2" color="black"></l-dot-stream>
            </div>
          ) : isCompleted ? (
            completedOrder.length > 0 ? (
              completedOrder.map((item) => (
                <CompletedOrder
                  key={item.merchantTradeNo}
                  merchantTradeNo={item.merchantTradeNo}
                  date={item.updatedAt}
                  pios={item.pios}
                  seller={item.user.username}
                />
              ))
            ) : (
              <div className="w-full h-100 text-3xl flex justify-center items-center">
                No completed orders
              </div>
            )
          ) : pendingOrder.length > 0 ? (
            pendingOrder.map((item) => (
              <PendingOrder
                key={item.merchantTradeNo}
                merchantTradeNo={item.merchantTradeNo}
                date={item.updatedAt}
                pios={item.pios}
                seller={item.user.username}
              />
            ))
          ) : (
            <div className="w-full h-100 text-3xl flex justify-center items-center">
              No pending orders
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
