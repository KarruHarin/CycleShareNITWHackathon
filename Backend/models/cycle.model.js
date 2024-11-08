import mongoose, { Schema } from "mongoose";

const cycleSchema = new Schema(
  {
    
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Assuming the owner should always be present
    },
    cycleDetails: {
      color: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      gearCount: {
        type: Number,
        required: true,
      },
      cycleCompany: {
      type: String,
      required: true,
     },
    },
    condition : {
        brakesWorking: {
          type: Boolean,
          required: true, // true if brakes are functional
        },
        hasAirInTires: {
          type: Boolean,
          required: true, // true if tires have air
        },
        chainCondition: {
          type: String,
          enum: ["Good", "Needs Lubrication", "Worn Out"],
          default: "Good", // Quick summary of chain condition
        },
    },
    bookingLocation:{
       type:String,
       required:true,
    },
    returningLocation:{
        type:String,
        required:true,
    },
    costPerHour:{
        type:Number,
        required:true
    },
    costPerDay:{
        type:Number,
        required:true
    }
  },
  { timestamps: true }
);
export default mongoose.model("Cycle", cycleSchema);
