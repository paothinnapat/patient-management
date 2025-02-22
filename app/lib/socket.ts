import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initializeSocket = () => {
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  
  socket = io(socketUrl);
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};