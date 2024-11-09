import { Server } from 'socket.io';
import cors from "cors";

class SocketService {
  constructor(server) {
    this.io = new Server(server,
        {
            cors:{
              origin:"http://localhost:5173",
              methods:["GET","POST"]
            }
          }
    );
    this.connectedUsers = new Map();
    this.initialize();
  }

  initialize() {
    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('authenticate', ({ userId, userType }) => {
        this.connectedUsers.set(userId, { socketId: socket.id, userType });
        console.log(`${userType} ${userId} authenticated`);
      });

      socket.on('disconnect', () => {
        for (const [userId, data] of this.connectedUsers.entries()) {
          if (data.socketId === socket.id) {
            this.connectedUsers.delete(userId);
            console.log(`User ${userId} disconnected`);
            break;
          }
        }
      });
    });
  }

  sendNotification(userId, notification) {
    const userData = this.connectedUsers.get(userId);
    if (userData) {
      this.io.to(userData.socketId).emit('notification', notification);
      return true;
    }
    return false;
  }
}

export default SocketService;