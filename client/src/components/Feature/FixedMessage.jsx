import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../Context/authContext";
import { useChat } from "../Context/chatContext";

import {
  connectSocket,
  disconnectSocket,
  subscribeRoom,
  unsubscribeRoom,
  sendMessage,
  onReceiveMessage,
  offReceiveMessage
} from '../../services/socketService';

// UI and icons
import { MdMessage } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";

function FixedMessage() {
  // useState
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const prevRoom = useRef(null);

  const { currentUser } = useAuth()
  const { isChatOpen, setIsChatOpen, activeRoom } = useChat();

  // 點開聊天室 -> 連線
  useEffect(() => {
    if (isChatOpen && activeRoom) {
      connectSocket();
      subscribeRoom(activeRoom.roomId);
      onReceiveMessage((msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      fetch(`${import.meta.env.VITE_API_URL}/api/msg/${activeRoom.roomId}`)
        .then(res => res.json())
        .then(data => setMessages(data));
    } else {
      disconnectSocket();
    }

    return () => {
      offReceiveMessage();
    };
  }, [isChatOpen, activeRoom]);

  const handleSelectRoom = async (receiverId) => {
    const roomId = [currentUser.id, receiverId].sort().join("_");

    if (prevRoom.current && prevRoom.current !== roomId) {
      unsubscribeRoom(prevRoom.current);
    }

    subscribeRoom(roomId);
    prevRoom.current = roomId;
    setActiveRoom({ roomId, receiverId });

    // 取得歷史訊息
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/msg/${roomId}`);
    const data = await res.json();
    setMessages(data);
  };

  const handleSend = () => {
    if (!msg.trim() || !activeRoom) return;

    sendMessage({
      senderId: currentUser.id,
      receiverId: activeRoom.receiverId,
      content: msg,
      roomId: activeRoom.roomId
    });

    setMsg("");
  };

  return (
    <motion.div
      className={`fixed right-15 bottom-15 z-100 border p-3 pb-4 overflow-hidden grid grid-cols-[auto_1fr]
      ${
        isChatOpen
          ? ""
          : "text-[#537D5D] hover:bg-[#9EBC8A] hover:text-white"
      } bg-gray-100 transition-all duration-200`}
      style={{
        width: isChatOpen ? "500px" : "40px",
        height: isChatOpen ? "70vh" : "40px",
        borderRadius: isChatOpen ? "16px" : "100%",
      }}
    >
      {/* start aside */}
      <motion.div
        className="h-[95%] w-50 rounded-l-xl overflow-y-scroll cart-scroll"
        style={{ opacity: isChatOpen ? "100%" : 0 }}
      >
        {messages.map((item) => (
          <button
            key={item.key}
            onClick={() => handleSelectRoom(item.key)}
            className="w-full h-1/6 hover:bg-gray-300/70 flex items-center pl-2"
          >
            <div className="w-10 aspect-square rounded-full border mr-2" />
            <div className="grid gird-rows-2 w-full">
              <p className="font-bold line-clamp-1 text-start">{item.sender}</p>
              <p className="text-gray-500 line-clamp-1 text-start">
                {item.lastMsg}
              </p>
            </div>
          </button>
        ))}
      </motion.div>
      {/* end aside */}

      {/* start msg */}
      <motion.div
        className="grid grid-rows-[1fr_auto] h-[95%]"
        style={{ opacity: isChatOpen ? "100%" : 0 }}
      >
        {/* start msg wrapper */}
        <ul className="bg-gray-200 rounded-tr-xl"></ul>
        {/* end msg wrapper */}

        {/* start input msg */}
        <div className="rounded-br-xl bg-white">
          <input
            type="text"
            className="w-full p-2 placeholder:text-sm focus:outline-0"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Input text"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSend}
              className="w-8 aspect-square flex justify-center items-center text-gray-400"
            >
              <LuSendHorizontal />
            </button>
          </div>
        </div>
        {/* end input msg */}
      </motion.div>
      {/* end msg */}

      {/* start open */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={` ${
          isChatOpen
            ? "absolute right-1.5 bottom-1.5 -translate-x-0.5"
            : "absolute-mid"
        }  z-20`}
      >
        {isChatOpen ? (
          <IoMdCloseCircleOutline className="text-3xl w-full h-full text-gray-400 hover:text-red-600 transition-all duration-200" />
        ) : (
          <MdMessage className="scale-150 w-full h-full" />
        )}
      </motion.button>
      {/* end open */}
    </motion.div>
  );
}

export default FixedMessage;
