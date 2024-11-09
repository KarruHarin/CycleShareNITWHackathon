import { Booking } from "../models/bookings.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import SocketService from "../services/socket.service.js";
import { socketService } from "../app.js";
import { User } from "../models/user.model.js";
const bookACycle = async(req,res)=>{
  try {
   const {lender,tenant,cycle,bookingDate,bookingTimeSlot,bookingCost}=req.body;
   const user = User.findById(lender);
   if (bookingCost>user.coins) {
      res.json({
         success: false,
         message: "No money",
       });
   }
   
   const newBooking =new Booking({
    lender,
    tenant,
    cycle,
    bookingDate,
    bookingTimeSlot,
    bookingCost,
    status:"pending"
   });


   const notificationSent = socketService.sendNotification(lender, {
      type: 'new_booking_request',
      title: 'New Booking Request',
      message: `New cycle booking request from user ${borrower}`,
      bookingDetails: {
        cycle,
        bookingDate,
        bookingTimeSlot,
        bookingCost,
        tenant
      },
      timestamp: new Date().toISOString()
    });
    res.json({
      success: true,
      message: notificationSent ? 'Booking request sent to lender' : 'Booking created but lender is offline',
      newBooking
    });


  } catch (error) {
   console.error('Booking creation error:', error);
   res.status(500).json({
     success: false,
     message: 'Error creating booking'
   });
}
}


const updateBookingStatus=async(req,res)=>{
   try {
      const {bookingId , status , lender,tenent,bookingCost} = req.body;
      const updatedBooking = await Booking.findByIdAndUpdate(bookingId,{status}, { new: true });
      if (!updatedBooking) {
         return res.status(404).json({ message: 'Booking not found' });
      }
      if (status === 'accepted') {
         socketService.sendNotification(tenent, {
           type: 'booking_confirmed',
           title: 'Booking Confirmed!',
           message: `Your cycle booking #${bookingId} has been accepted`,
           bookingId,
           timestamp: new Date().toISOString()
         });

         const user = User.findById(lender);
         user.coins = user.coins + bookingCost;
         const user2 = User.findById(tenent);
         user2.coins = user2.coins - bookingCost;

       } else if (status === 'rejected') {
         socketService.sendNotification(tenent, {
           type: 'booking_rejected',
           title: 'Booking Not Available',
           message: `Your cycle booking #${bookingId} could not be confirmed`,
           bookingId,
           timestamp: new Date().toISOString()
         });
       }
 
       res.json({
         success: true,
         updatedBooking
       });
      
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
   }
}


export {updateBookingStatus,bookACycle}










