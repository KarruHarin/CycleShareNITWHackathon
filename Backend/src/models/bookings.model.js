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
    bookDate: {
      type: Date,
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
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking",bookingSchema);