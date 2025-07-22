import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true
});

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

export const subscribeRoom = (roomId) => {
  socket.emit("subscribe", roomId);
};

export const unsubscribeRoom = (roomId) => {
  socket.emit("unsubscribe", roomId);
};

export const sendMessage = ({ senderId, receiverId, content, roomId }) => {
  socket.emit("sendMessage", { senderId, receiverId, content, roomId });
};

export const onReceiveMessage = (cb) => {
  socket.on("receiveMessage", cb);
};

export const offReceiveMessage = () => {
  socket.off("receiveMessage");
};