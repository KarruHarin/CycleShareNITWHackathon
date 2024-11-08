import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';

export const verifyJWT = async (req, res, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: 'Access token required' });
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find user by decoded token ID
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Token is not valid, authorization denied");
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        // Handle errors and send response
        return res.status(401).json({ message: error.message || "Unauthorized" });
    }
};
