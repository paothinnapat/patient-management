import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initializeSocket = () => {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000');
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};