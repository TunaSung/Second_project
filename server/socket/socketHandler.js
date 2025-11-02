const Message = require("../models/Message");

// 可選：若要追蹤 socket 清單
const userSockets = new Map(); // userId -> Set<socketId>

function canonicalRoomId(a, b, clientRoomId) {
  if (clientRoomId) return clientRoomId;
  const [x, y] = [Number(a), Number(b)].sort((m, n) => m - n);
  return `${x}_${y}`;
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, "已連線");

    // 由前端在連線後立即送出
    socket.on("identify", (userId) => {
      userId = Number(userId);
      socket.data.userId = userId;
      socket.join(`user:${userId}`); // 個人房，用來推「新房間/新通知」

      const set = userSockets.get(userId) || new Set();
      set.add(socket.id);
      userSockets.set(userId, set);
    });

    socket.on("subscribe", (roomId) => {
      socket.join(roomId);
      console.log("加入房間:", roomId);
    });

    socket.on("unsubscribe", (roomId) => {
      socket.leave(roomId);
      console.log("離開房間:", roomId);
    });

    socket.on("sendMessage", async ({ senderId, receiverId, content, roomId }) => {
      try {
        const rid = canonicalRoomId(senderId, receiverId, roomId);

        const message = await Message.create({
          senderId,
          receiverId,
          content,
          roomId: rid,
          messageType: "text",
          isRead: false,
        });

        // 1) 原本房內的人（若乙未加入，這個他收不到）
        io.to(rid).emit("receiveMessage", message);

        // 2) 推給雙方「個人房」，讓聊天室清單立刻出現/更新
        const payload = {
          roomId: rid,
          lastUpdate: message.updatedAt,
          lastMessage: {
            content: message.content,
            senderId: message.senderId,
            updatedAt: message.updatedAt,
          },
        };

        io.to(`user:${receiverId}`).emit("rooms:upsert", {
          ...payload,
          receiverId: Number(senderId),
        });
        io.to(`user:${senderId}`).emit("rooms:upsert", {
          ...payload,
          receiverId: Number(receiverId),
        });
      } catch (err) {
        console.error("無法儲存訊息：", err);
      }
    });

    socket.on("disconnect", () => {
      const uid = socket.data.userId;
      if (uid) {
        const set = userSockets.get(uid);
        if (set) {
          set.delete(socket.id);
          if (set.size === 0) userSockets.delete(uid);
        }
      }
      console.log(socket.id, "已離開");
    });
  });
};
