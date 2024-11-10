import {Cycle} from "../models/cycle.model.js";
import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerCycle = async (req, res) => {
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
      isAvailable,
      map,

    } = req.body;
    console.log(req.body)
    // Create a new cycle document
    const newCycle = new Cycle({
      owner,
      cycleDetails,
      condition,
      bookingLocation,
      returningLocation,
      costPerHour,
      isAvailable,
      costPerDay,
      map,
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

const editCycle = async (req,res)=>{
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
};

const getCycleDetails = async (req, res) => {
  try {
      const { cycleId } = req.body;

      // Validate cycleId
      if (!mongoose.Types.ObjectId.isValid(cycleId)) {
          return res.status(400).json(
              new ApiError(400, "Invalid cycle ID format")
          );
      }

      // Get cycle details with owner information
      const cycle = await Cycle.findById(cycleId)
          .populate({
              path: 'owner',
              select: 'username email college rating' // Only select necessary fields
          });

      if (!cycle) {
          return res.status(404).json(
              new ApiError(404, "Cycle not found")
          );
      }

      // Get reviews for the cycle
      const reviews = await Review.find({
          typeOfReview: 'cycle',
          to: cycleId
      })
      .populate({
          path: 'from',
          select: 'username rating'  // Include reviewer's username and rating
      })
      .sort({ createdAt: -1 });  // Latest reviews first

      // Calculate review statistics
      const reviewStats = {
          totalReviews: reviews.length,
          averageRating: cycle.rating || 0,
          ratingDistribution: {
              5: reviews.filter(r => r.rating === 5).length,
              4: reviews.filter(r => r.rating === 4).length,
              3: reviews.filter(r => r.rating === 3).length,
              2: reviews.filter(r => r.rating === 2).length,
              1: reviews.filter(r => r.rating === 1).length
          }
      };

      // Get recent bookings count (if you have a bookings collection)
      // This is just an example - adjust according to your booking model
      // const recentBookingsCount = await Booking.countDocuments({
      //     cycleId,
      //     createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      // });

      // Prepare the response
      const cycleDetails = {
          _id: cycle._id,
          cycleDetails: cycle.cycleDetails,
          condition: cycle.condition,
          location: {
              booking: cycle.bookingLocation,
              returning: cycle.returningLocation,
              map: cycle.map
          },
          pricing: {
              perHour: cycle.costPerHour,
              perDay: cycle.costPerDay
          },
          availability: {
              status: cycle.isAvailable,
              // You might want to add booking schedule here if you have that functionality
          },
          owner: {
              _id: cycle.owner._id,
              username: cycle.owner.username,
              college: cycle.owner.college,
              rating: cycle.owner.rating
          },
          reviews: {
              stats: reviewStats,
              recent: reviews.slice(0, 5) // Get only 5 most recent reviews
          },
          // Add any additional booking-related stats here
          // recentBookings: recentBookingsCount,
          timestamps: {
              createdAt: cycle.createdAt,
              updatedAt: cycle.updatedAt
          }
      };

      return res.status(200).json(
          new ApiResponse(
              200,
              cycleDetails,
              "Cycle details fetched successfully"
          )
      );

  } catch (error) {
      console.error("Get Cycle Details Error:", error);
      return res.status(500).json(
          new ApiError(
              500,
              "An error occurred while fetching cycle details"
          )
      );
  }
};
const getAllCycles = async (req, res) => {
  try {
    const { college } = req.body;
    const data = await Cycle.find().populate("owner", "college");
    
    if (!data) {
      return res.status(404).json(
        new ApiResponse(404, null, "No cycles found")
      );
    }

    console.log(data[0].owner); // for debugging
    
    const filter = data.filter((d) => d.owner.college === college);
    
    return res.status(200).json(
      new ApiResponse(200, filter, "fetched successfully")
    );

  } catch (e) {
    console.log(e);
    return res.status(500).json(
      new ApiResponse(500, null, "Internal server error")
    );
  }
};


export {registerCycle,editCycle,getCycleDetails,getAllCycles};
