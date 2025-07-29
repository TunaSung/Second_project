import { useState, useEffect, useRef } from "react";
import { useAuth } from "../Context/authContext";
import { useChat } from "../Context/chatContext";

// library
import { motion } from "framer-motion";

// API Service
import { sendMessage } from "../../services/socketService"

// UI and icons
import { MdMessage } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";

function FixedMessage() {
  // useState
  const [msg, setMsg] = useState("");
  const messagesEndRef = useRef(null);
  
  // load user info from authContext
  const { currentUser } = useAuth()

  // useState from chatContext
  const {
    isChatOpen,
    setIsChatOpen,
    chatList,
    activeRoom,
    setActiveRoom,
    messages
  } = useChat();

  // 防呆
  const rawChatList = Array.isArray(chatList)
    ? chatList
    : Array.isArray(chatList?.rooms)
    ? chatList.rooms
    : [];
    const safeChatList = rawChatList;
    const safeMessages = Array.isArray(messages) ? messages : [];

    // 找渲染在聊天室裡的receiver的名字
  const currentRoom = safeChatList.find(r => r.roomId === activeRoom?.roomId);
  const otherUsername = currentRoom?.receiver.username || "";

  // 剛顛進去聊天室或傳訊息都會scroll到底部
  useEffect(() => {
    const el = messagesEndRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [activeRoom?.roomId, safeMessages.length]);
  
  // toggle chat room open
  const handleToggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  // select room
  const handleSelectRoom = (receiverId) => {
    const roomId = [currentUser.id, receiverId].sort().join("_");
    setActiveRoom({ roomId, receiverId });
  };

  // send Msg
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
      className={`fixed right-15 bottom-15 z-100 border p-3 overflow-hidden grid grid-cols-[auto_1fr]
      ${
        isChatOpen
          ? "bg-[#D2D0A0]"
          : "bg-gray-100 text-[#537D5D] hover:bg-[#9EBC8A] hover:text-white"
      }  transition-all duration-200`}
      style={{
        width: isChatOpen ? "500px" : "40px",
        height: isChatOpen ? "70vh" : "40px",
        borderRadius: isChatOpen ? "16px" : "100%",
      }}
    >
      {/* start aside */}
      <motion.aside
        className="h-full w-50 rounded-l-xl overflow-y-scroll cart-scroll "
        initial={{ opacity: 0}}
        animate={{ opacity: isChatOpen ? 1 : 0 }}
      >
        {safeChatList.map((item) => (
          <button
            key={item.roomId}
            onClick={() => handleSelectRoom(item.receiverId)}
            className="w-full h-1/6 hover:bg-[#9EBC8A] flex items-center pl-2 group transition-all duration-200"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}${item.receiver.avatarUrl}`}
              className="w-10 h-10 rounded-full object-cover mr-2"
              alt="avatar"
            />
            <div className="grid grid-rows-2 w-full text-start">
              <p className="font-bold line-clamp-1 text-[#537D5D] group-hover:text-white ">{item.receiver.username}</p>
              <p className="text-gray-600 text-xs line-clamp-1">
                {item.lastMsg || "開始聊天吧～"}
              </p>
            </div>
          </button>
        ))}
      </motion.aside>
      {/* end aside */}

      {/* start msg */}
      <motion.div
        className="h-full grid grid-rows-[1fr_auto] min-h-0"
        style={{ opacity: isChatOpen ? 1 : 0 }}
      >
        {/* start msg wrapper */}
        { activeRoom?.roomId ? (
          <ul ref={messagesEndRef} className="flex flex-col gap-1 px-2 overflow-y-auto min-h-0">
            {safeMessages.map((item, i) => {
              const isSender = item.senderId === currentUser.id;
              // 只有當上一則不存在或跟上一則不同人，才顯示名稱
              const showName =
                i === 0 || safeMessages[i - 1].senderId !== item.senderId;
              // 決定要顯示誰的名字
              const username = isSender
                ? currentUser.username
                : otherUsername;
              return (
                <li
                  key={i}
                  className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}
                >
                  {showName && (
                    <div className="text-xs text-gray-500 mr-2 select-none">
                      {username}
                    </div>
                  )}
                  <div
                    className={`
                      max-w-[70%] p-2 text-sm rounded-lg
                      ${isSender
                        ? "bg-[#6F826A] text-white"
                        : "bg-[#73946B] text-white"}
                    `}
                  >
                    <p className="break-words text-justify">{item.content}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            請選擇聊天室
          </div>
        )}
        {/* end msg wrapper */}

        {/* start input msg */}
        <div className="rounded-br-xl flex justify-around">
          <textarea
            rows={3}
            className="w-7/8 h-full p-2 text-[#537D5D] text-sm placeholder:text-sm placeholder:text-[#9EBC8A] focus:outline-none resize-none"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Input text"
          />
          <div className="pt-2">
            <button
              onClick={handleSend}
              className="flex justify-center items-center text-[#537D5D]"
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
        onClick={handleToggleChat}
        className={`${
          isChatOpen
            ? "absolute right-1.5 bottom-1.5 -translate-x-0.5"
            : "absolute-mid"
        }  z-20`}
      >
        {isChatOpen ? (
          <IoMdCloseCircleOutline className="text-3xl w-full h-full text-[#537D5D] hover:text-[#E14434] transition-all duration-200" />
        ) : (
          <MdMessage className="scale-150 w-full h-full" />
        )}
      </motion.button>
      {/* end open */}
    </motion.div>
  );
}

export default FixedMessage;
