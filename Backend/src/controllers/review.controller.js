import { Review } from "../models/reviews.model.js";
import { User } from "../models/user.model.js";
import { Cycle } from "../models/cycle.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// Utility function to update target's rating
const updateTargetRating = async (typeOfReview, targetId) => {
    try {
        // Get all reviews for the target
        const reviews = await Review.find({
            typeOfReview,
            to: targetId
        });

        // Calculate new average rating
        const averageRating = reviews.length > 0 
            ? Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length)
            : 0;

        // Update the target's rating based on type
        if (typeOfReview === 'user') {
            await User.findByIdAndUpdate(targetId, { rating: averageRating });
        } else if (typeOfReview === 'cycle') {
            await Cycle.findByIdAndUpdate(targetId, { rating: averageRating });
        }

        return averageRating;
    } catch (error) {
        console.error("Error updating target rating:", error);
        throw error;
    }
};

const writeAReview = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { typeOfReview, from, to, rating, reviewDescription } = req.body;

        // Check if user has already reviewed this target
        const existingReview = await Review.findOne({
            typeOfReview,
            from,
            to
        });

        if (existingReview) {
            await session.abortTransaction();
            return res.status(400).json(
                new ApiError(400, "You have already reviewed this " + typeOfReview)
            );
        }

        // Create new review
        const newReview = new Review({
            typeOfReview,
            from,
            to,
            rating,
            reviewDescription
        });
        
        await newReview.save({ session });

        // Update target's average rating
        const newAverageRating = await updateTargetRating(typeOfReview, to);

        await session.commitTransaction();

        res.status(201).json(
            new ApiResponse(201, {
                review: newReview,
                newAverageRating
            }, "Review saved successfully")
        );

    } catch (error) {
        await session.abortTransaction();
        console.error("Review Error:", error);
        res.status(500).json(
            new ApiError(500, "An error occurred while saving review")
        );
    } finally {
        session.endSession();
    }
};

const editReview = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { reviewId } = req.params;
        const { rating, reviewDescription } = req.body;
        
        // Check if review exists
        const review = await Review.findById(reviewId);
        if (!review) {
            await session.abortTransaction();
            return res.status(404).json(
                new ApiError(404, "Review not found")
            );
        }

        // Check if the user editing is the one who created the review
        if (review.from.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            return res.status(403).json(
                new ApiError(403, "Unauthorized to edit this review")
            );
        }

        // Update the review
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                $set: {
                    rating,
                    reviewDescription
                }
            },
            { new: true, session }
        );

        // Update target's average rating
        const newAverageRating = await updateTargetRating(review.typeOfReview, review.to);

        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(200, {
                review: updatedReview,
                newAverageRating
            }, "Review updated successfully")
        );

    } catch (error) {
        await session.abortTransaction();
        console.error("Edit Review Error:", error);
        return res.status(500).json(
            new ApiError(500, "An error occurred while updating the review")
        );
    } finally {
        session.endSession();
    }
};

const deleteReview = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);
        if (!review) {
            await session.abortTransaction();
            return res.status(404).json(
                new ApiError(404, "Review not found")
            );
        }

        // Check if the user deleting is the one who created the review
        if (review.from.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            return res.status(403).json(
                new ApiError(403, "Unauthorized to delete this review")
            );
        }

        // Store type and target ID before deletion
        const { typeOfReview, to } = review;

        // Delete the review
        await Review.findByIdAndDelete(reviewId, { session });

        // Update target's average rating
        const newAverageRating = await updateTargetRating(typeOfReview, to);

        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(200, {
                newAverageRating
            }, "Review deleted successfully")
        );

    } catch (error) {
        await session.abortTransaction();
        console.error("Delete Review Error:", error);
        return res.status(500).json(
            new ApiError(500, "An error occurred while deleting the review")
        );
    } finally {
        session.endSession();
    }
};

const getReviews = async (req, res) => {
    try {
        const { type, id } = req.params; // type can be 'user' or 'cycle'
        
        // Validate type parameter
        if (!['user', 'cycle'].includes(type)) {
            return res.status(400).json(
                new ApiError(400, "Invalid type parameter. Must be 'user' or 'cycle'")
            );
        }

        // Validate id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(
                new ApiError(400, "Invalid ID format")
            );
        }

        // Find reviews
        const reviews = await Review.find({
            typeOfReview: type,
            to: id
        })
        .populate('from', 'username') // Populate reviewer's username
        .sort({ createdAt: -1 }); // Sort by newest first

        // Get target's current rating
        let currentRating = 0;
        if (type === 'user') {
            const user = await User.findById(id);
            currentRating = user?.rating || 0;
        } else {
            const cycle = await Cycle.findById(id);
            currentRating = cycle?.rating || 0;
        }

        return res.status(200).json(
            new ApiResponse(200, {
                reviews,
                totalReviews: reviews.length,
                currentRating
            }, "Reviews fetched successfully")
        );

    } catch (error) {
        console.error("Get Reviews Error:", error);
        return res.status(500).json(
            new ApiError(500, "An error occurred while fetching reviews")
        );
    }
};

export {
    writeAReview,
    editReview,
    deleteReview,
    getReviews
};