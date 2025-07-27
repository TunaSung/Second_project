import api from './api' 
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

export const getRoomMessages = async (roomId) => {
  try {
    const response = await api.get(`/msg/${roomId}/messages`)
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || error.message || "get msg failed";
    console.error("get msg error:", message);
    throw error.response?.data?.message || "get msg failed";
  }
}

export const getLastMessages = async (roomId) => {
  try {
    const response = await api.get(`/msg/${roomId}/last`)
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || error.message || "get msg failed";
    console.error("get msg error:", message);
    throw error.response?.data?.message || "get msg failed";
  }
}

export const getRooms = async () => {
  try {
    const response = await api.get(`/msg/rooms`)
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || error.message || "get rooms failed";
    console.error("get rooms error:", message);
    throw error.response?.data?.message || "get rooms failed";
  }
}