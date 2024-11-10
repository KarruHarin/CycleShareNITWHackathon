import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    notification: { type: String, required: true },
    delivered: { type: Boolean, default: false },
    senderId: { type: String, required: true },
  });
  
 export const Notification = mongoose.model('Notification', notificationSchema);
