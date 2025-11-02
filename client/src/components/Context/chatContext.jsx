import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  connectSocket,
  disconnectSocket,
  subscribeRoom,
  unsubscribeRoom,
  onReceiveMessage,
  offReceiveMessage,
  onRoomsUpsert,
  offRoomsUpsert,
  getRoomMessages,
  getLastMessages,
  getRooms,
} from "../../services/socketService";
import { useAuth } from "./authContext";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { currentUser, rooms } = useAuth();

  const [chatList, setChatList] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null); // {roomId, receiverId}
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  // ===== 1) 以 Auth 的 rooms 為基底，並補 lastMsg =====
  useEffect(() => {
    if (!Array.isArray(rooms) || rooms.length === 0) {
      setChatList([]);
      return;
    }
    // 先放基礎資料
    setChatList(rooms);
    // 再補最後一則訊息
    (async () => {
      try {
        const enriched = await Promise.all(
          rooms.map(async (room) => {
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

  // ===== 2) 打開聊天 UI 時：建立 socket + 身分辨識；若列表為空則回撈 REST =====
  useEffect(() => {
    if (!isChatOpen || !currentUser) return;

    connectSocket(currentUser.id);

    // 若 auth 的 rooms 還沒來或為空，主動回撈一次
    if (chatList.length === 0) {
      (async () => {
        try {
          const { rooms: serverRooms } = await getRooms();
          const withLast = await Promise.all(
            serverRooms.map(async (room) => {
              const last = await getLastMessages(room.roomId);
              return { ...room, lastMsg: last.content || "" };
            })
          );
          setChatList(withLast);
        } catch (e) {
          console.error("初始化聊天室列表失敗", e);
        }
      })();
    }

    // 監聽 rooms:upsert（新房/更新）
    const handleUpsert = (payload) => {
      setChatList((prev) => {
        const idx = prev.findIndex((r) => r.roomId === payload.roomId);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            lastUpdate: payload.lastUpdate,
            lastMsg: payload.lastMessage?.content || next[idx].lastMsg,
          };
          next.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
          return next;
        }
        // 列表沒有該房（通常是對方第一次被動被建立）
        // 為取得 receiver 資訊（avatar/username），用 REST 回撈一次
        (async () => {
          try {
            const { rooms: serverRooms } = await getRooms();
            const withLast = await Promise.all(
              serverRooms.map(async (room) => {
                const last = await getLastMessages(room.roomId);
                return { ...room, lastMsg: last.content || "" };
              })
            );
            setChatList(withLast);
          } catch (e) {
            console.error("rooms:upsert 後回撈失敗", e);
          }
        })();
        return prev;
      });
    };

    onRoomsUpsert(handleUpsert);
    return () => {
      offRoomsUpsert();
    };
  }, [isChatOpen, currentUser, chatList.length]);

  // ===== 3) 預設選第一個房 =====
  useEffect(() => {
    if (isChatOpen && !activeRoom && chatList.length > 0) {
      const { roomId, receiverId } = chatList[0];
      setActiveRoom({ roomId, receiverId });
    }
  }, [isChatOpen, chatList, activeRoom]);

  // ===== 4) 切房：只訂閱/退訂房，不斷線 =====
  const prevRoomRef = useRef(null);
  useEffect(() => {
    if (!activeRoom) return;
    const { roomId } = activeRoom;

    // 先退訂前一房
    if (prevRoomRef.current && prevRoomRef.current !== roomId) {
      unsubscribeRoom(prevRoomRef.current);
    }

    // 確保仍在連線（不重複 identify 也沒關係）
    connectSocket(currentUser?.id);
    subscribeRoom(roomId);

    // 撈歷史
    getRoomMessages(roomId).then((data) => setMessages(data.msgs));

    // 即時訊息
    const handleMsg = (msg) => {
      setMessages((prev) => (Array.isArray(prev) ? [...prev, msg] : [msg]));
    };
    onReceiveMessage(handleMsg);

    prevRoomRef.current = roomId;

    return () => {
      offReceiveMessage();
      // ⚠️ 這裡「不要」disconnect，避免刷新狀態遺失
      // 退訂留在上面切房處理
    };
  }, [activeRoom?.roomId, currentUser?.id]);

  // 統一提供的 setActiveRoom
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
        disconnectSocket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
