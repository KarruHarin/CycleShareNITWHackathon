import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const addMoneyToUser = async (req, res, next) => {
    try {
        const { id, coins } = req.body;

        if (!id || !coins) {
            throw new ApiError(400, "ID and coins amount are required");
        }

        if (!Number.isFinite(coins) || coins <= 0) {
            throw new ApiError(400, "Invalid coins amount. Must be a positive number");
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $inc: { coins: coins } },
            { 
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedUser,
                `Successfully deposited ${coins} coins`
            )
        );

    } catch (error) {
        next(error);
    }
};

const deductMoneyFromUser = async (req, res, next) => {
    try {
        const { id, coins } = req.body;

        if (!id || !coins) {
            throw new ApiError(400, "ID and coins amount are required");
        }

        if (!Number.isFinite(coins) || coins <= 0) {
            throw new ApiError(400, "Invalid coins amount. Must be a positive number");
        }

        const user = await User.findById(id);
        
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.coins < coins) {
            throw new ApiError(400, "Insufficient balance");
        }

        const updatedUser = await User.findOneAndUpdate(
            { 
                _id: id,
                coins: { $gte: coins }
            },
            { $inc: { coins: -coins } },
            { 
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            throw new ApiError(400, "Transaction failed. Please try again");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedUser,
                `Successfully withdrawn ${coins} coins`
            )
        );

    } catch (error) {
        next(error);
    }
};

const validateMoneyOperation = (id, coins) => {
    if (!id || !coins) {
        throw new ApiError(400, "ID and coins amount are required");
    }

    if (!Number.isFinite(coins) || coins <= 0) {
        throw new ApiError(400, "Invalid coins amount. Must be a positive number");
    }
};

export { addMoneyToUser, deductMoneyFromUser };