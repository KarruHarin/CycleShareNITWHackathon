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
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      min: 1,
      max: 5,
      default: 3,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    map: {
      type: {
        type: String,
        enum: ['Point'], // ensures this is a Point type
        required: true
      },
      coordinates: {
        type: [Number], // longitude, latitude
        required: true
      }
    }
  },
  { timestamps: true }
);

// Add a 2dsphere index for geospatial queries if needed in the future
cycleSchema.index({ "map.bookingCoords": "2dsphere" });

export const Cycle = mongoose.model("Cycle", cycleSchema);
