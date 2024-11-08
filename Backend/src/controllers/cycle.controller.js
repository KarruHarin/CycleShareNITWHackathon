import {Cycle} from "../models/cycle.model.js";
import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Cycle from "../models/Cycle"; // Assuming Cycle model is imported

const RegisterCycle = async (req, res) => {
  try {
    //cycleDetails and codition contain sub objects in them parse data properly from frontend
    const {
      owner,
      cycleDetails,
      condition,
      bookingLocation,
      returningLocation,
      costPerHour,
      costPerDay,
    } = req.body;
    // Create a new cycle document
    const newCycle = new Cycle({
      owner,
      cycleDetails,
      condition,
      bookingLocation,
      returningLocation,
      costPerHour,
      costPerDay,
    });

    // Save the cycle to the database
    const savedCycle = await newCycle.save();

    // Respond with success and the saved cycle details
    res.status(201).json({
      message: "Cycle registered successfully",
      cycle: savedCycle,
    });
  } catch (error) {
    console.error("Error registering cycle:", error);
    res.status(500).json({
      message: "An error occurred while registering the cycle",
      error: error.message,
    });
  }
};

const EditCycle = async (req,res)=>{
   try {
    const {
        cycleId,
        condition,
        bookingLocation,
        returningLocation,
        costPerHour,
        costPerDay,
      } = req.body;

    const cycle = await Cycle.findById(cycleId);
    if(!cycle){
        throw new ApiError(400, "Company not found");
    }
    cycle.condition = condition|| cycle.condition;
    cycle.bookingLocation = bookingLocation || cycle.bookingLocation;
    cycle.returningLocation = returningLocation || cycle.returningLocation;
    cycle.costPerHour = costPerHour || cycle.costPerHour;
    cycle.costPerDay = costPerDay || cycle.costPerDay;
    
    const updatedCycle = await cycle.save();
    return res.status(201).json(new ApiResponse(200,updatedCycle,"Cycle updated successfully"))
    
   } catch (error) {
    console.error("Problem in editing Cycle:", error);
   }
}

export default RegisterCycle;
