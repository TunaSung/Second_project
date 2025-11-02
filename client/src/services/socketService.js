import api from './api';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

// 連線時順便「身分辨識」
export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
    socket.once('connect', () => {
      if (userId) socket.emit('identify', userId);
    });
  } else if (userId) {
    socket.emit('identify', userId);
  }
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

export const subscribeRoom = (roomId) => {
  socket.emit('subscribe', roomId);
};

export const unsubscribeRoom = (roomId) => {
  socket.emit('unsubscribe', roomId);
};

export const sendMessage = ({ senderId, receiverId, content, roomId }) => {
  socket.emit('sendMessage', { senderId, receiverId, content, roomId });
};

export const onReceiveMessage = (cb) => socket.on('receiveMessage', cb);
export const offReceiveMessage = () => socket.off('receiveMessage');

// 👇 新增：讓列表即時出現/更新
export const onRoomsUpsert = (cb) => socket.on('rooms:upsert', cb);
export const offRoomsUpsert = () => socket.off('rooms:upsert');

export const getRoomMessages = async (roomId) => {
  const { data } = await api.get(`/msg/${roomId}/messages`);
  return data;
};

export const getLastMessages = async (roomId) => {
  const { data } = await api.get(`/msg/${roomId}/last`);
  return data;
};

export const getRooms = async () => {
  const { data } = await api.get(`/msg/rooms`);
  return data;
};
