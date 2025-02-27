import { Server as SocketServer } from 'socket.io';
import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new SocketServer(httpServer, {
      path: '/api/socket',
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('formUpdate', (data) => {
        socket.broadcast.emit('formUpdated', data);
      });

      socket.on('formSubmitted', (data) => {
        socket.broadcast.emit('formSubmitted', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;