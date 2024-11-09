import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    lender: {
      type: String,
      required: true,
    },
    tenant: {
      type: String,
      required: true,
    },
    cycle:{
      type:Schema.Types.ObjectId,
      ref:"Cycle"
    },
    bookingDate: {
      type: Date,
    },
    hireProgress:{
          type:String,
          enum:["Booked","Completed"]
    },
    bookingTimeSlot: {
      startTime: {
        type: Date, // Date type will include both the date and time
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
    },
    bookingCost: {
      type: Number,
      required:true
    },
  },
  { timestamps: true }
);

export const Booking =  mongoose.model("Booking",bookingSchema);