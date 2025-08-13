import { createContext, useContext, useEffect, useState } from "react";
import {
  connectSocket,
  disconnectSocket,
  subscribeRoom,
  unsubscribeRoom,
  onReceiveMessage,
  offReceiveMessage,
  getRoomMessages,
  getLastMessages
} from "../../services/socketService";
import { useAuth } from "./authContext";

const ChatContext = createContext();

export function ChatProvider({ children }) {

  // 要登入時就載入聊天室資料所以丟在authContext
  const { rooms } = useAuth();

  // useState
  const [chatList, setChatList] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null); // {roomId, receiverId}
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // AuthContext的rooms更新就同步到chatList
  useEffect(() => {
    if (!Array.isArray(rooms) || rooms.length === 0) {
      setChatList([]);
      return;
    }

    // 先把基礎資料放進去
    setChatList(rooms);

    // 再補lastMsg
    (async () => {
      try {
        const enriched = await Promise.all(
          rooms.map(async room => {
            const last = await getLastMessages(room.roomId);
            return { ...room, lastMsg: last.content || "" };
          })
        );
        setChatList(enriched);
      } catch (err) {
        console.error("抓最後一則訊息失敗", err);
      }
    })();
  }, [rooms]);

  // 開啟聊天室時，若還沒選房間就預設選第一個
  useEffect(() => {
    if (isChatOpen && !activeRoom && chatList.length > 0) {
      const { roomId } = chatList[0];
      setActiveRoom({ roomId, receiverId: chatList[0].receiverId });
    }
  }, [isChatOpen, chatList, activeRoom]);

  // 當activeRoom變動：連線+訂閱 + 撈歷史 + 接即時 + 清理
  useEffect(() => {
    if (!activeRoom) return;

    const { roomId } = activeRoom;
    connectSocket();
    subscribeRoom(roomId);

    // 撈歷史
    getRoomMessages(roomId).then(data => setMessages(data.msgs));

    // 接新訊
    onReceiveMessage(msg => {
      setMessages(prev => Array.isArray(prev) ? [...prev, msg] : [msg]);
    });

    return () => {
      offReceiveMessage();
      unsubscribeRoom(roomId);
      disconnectSocket();
      setMessages([]);
    };
  }, [activeRoom]);

  // 切換房間的 function，供 FixedMessage 呼叫
  const selectRoom = ({ roomId, receiverId }) => {
    setActiveRoom({ roomId, receiverId });
    setIsChatOpen(true);
  };

  return (
    <ChatContext.Provider
      value={{
        chatList,
        setChatList,
        activeRoom,
        setActiveRoom: selectRoom,
        isChatOpen,
        setIsChatOpen,
        messages,
        setMessages,
        disconnectSocket
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
