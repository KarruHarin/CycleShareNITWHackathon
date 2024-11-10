import mongoose, { Schema } from "mongoose";

const cycleSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cycleDetails: {
      cycleImage: [{ type: String }], // Array for multiple images
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
        default: "Unknown",
      },
    },
    condition: {
      brakesWorking: {
        type: Boolean,
        required: true,
        default: true,
      },
      hasAirInTires: {
        type: Boolean,
        required: true,
        default: true,
      },
      chainCondition: {
        type: String,
        enum: ["Good", "Needs Lubrication", "Worn Out"],
        default: "Good",
      },
    },
    bookingLocation: {
      type: String,
      required: true,
    },
    returningLocation: {
      type: String,
      required: true,
    },
    costPerHour: {
      type: Number,
      required: true,
    },
    costPerDay: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
          
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      min: 1,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    map: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
  },
  { timestamps: true }
);

export const Cycle = mongoose.model("Cycle", cycleSchema);
