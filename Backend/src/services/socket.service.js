import { Server } from 'socket.io';
import cors from "cors";
import { Notification } from '../models/notification.model.js';

class SocketService {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
      }
    });
    this.connectedUsers = new Map();
    this.initialize();
  }

  initialize() {
    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('authenticate', ({ userId }) => {
        // Set user socket ID and send missed notifications
        this.handleUserReconnect(userId, socket.id);
        console.log(`User ${userId} authenticated`);
      });

      socket.on('disconnect', () => {
        const userId = this.getUserIdBySocketId(socket.id);
        if (userId) {
          this.connectedUsers.delete(userId);
          console.log(`User ${userId} disconnected`);
        }
      });
    });
  }

  sendNotification(userId, senderId, notification) {
    const userData = this.connectedUsers.get(userId);
    
    if (userData) {
      // User is connected, send the notification directly
      this.io.to(userData.socketId).emit('notification', { senderId, notification });
      return true;
    } else {
      // User is offline, save the notification to MongoDB
      const newNotification = new Notification({
        userId,
        senderId,
        notification,
        delivered: false
      });
      newNotification.save()
        .then(() => console.log('Notification saved for later'))
        .catch(err => console.error('Error saving notification:', err));
      return false;
    }
  }

  handleUserReconnect(userId, socketId) {
    this.connectedUsers.set(userId, { socketId });
    
    Notification.find({ userId, delivered: false })
      .then(notifications => {
        notifications.forEach(notification => {
          // Send each notification with sender info
          this.io.to(socketId).emit('notification', {
            senderId: notification.senderId,
            notification: notification.notification
          });
          
          // Mark the notification as delivered
          notification.delivered = true;
          notification.save().catch(err => console.error('Error updating notification:', err));
        });
      })
      .catch(err => console.error('Error retrieving notifications:', err));
  }

  // Optional helper method to get userId by socket ID
  getUserIdBySocketId(socketId) {
    for (const [userId, userData] of this.connectedUsers.entries()) {
      if (userData.socketId === socketId) {
        return userId;
      }
    }
    return null;
  }
}

export default SocketService;
