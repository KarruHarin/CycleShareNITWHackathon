import { Booking } from "../models/bookings.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const bookACycle = async(req,res)=>{
   const {lender,tenant,cycle,bookingDate,bookingTimeSlot,bookingCost}=req.body;
   
   const newBooking =new Booking({
    lender,
    tenant,
    cycle,
    bookingDate,
    bookingTimeSlot,
    bookingCost
   });
   //PaymentGateWay
//    if (paymentGateWay) {
//      const savedBooking = await newBooking.save();
//    }
  
}

const returnCycle =  async(req,res)=>{
    
}












