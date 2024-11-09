import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { sendVerificationCode } from "../middlewares/Email.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};


const verifyUser = async(req,res)=>{
  try{
   const{email,verificationCode}= req.body;
   console.log(email,verificationCode)
    sendVerificationCode(email,verificationCode);

const user = await User.findOneAndUpdate({email:email,verificationCode:verificationCode},{isVerified:true})
if(user&&user.isVerified===false){
await user.save()
console.log("Verified")  
res.json({message:"verified"})
}
else{
  if(user.isVerified===true){
    res.json({message:"Already verified"})
  }
  console.log("user",user);
}
}catch(e){
  console.log(e);
}

}
const registerUser = async (req, res) => {
  try {
    const { username, email, password,college } = req.body;

    // Validate input fields
    if ([username, email, password,college].some((field) => !field?.trim())) {
      throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(400, "User already exists");
    }
let verificationCode = Math.floor(100000+Math.random()*900000).toString();
    // Create new user
    const user = await User.create({ username, email, password,college,verificationCode});

    // Retrieve created user without sensitive information
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
sendVerificationCode(email,verificationCode)

    if (!createdUser) {
      throw new ApiError(500, "User creation failed");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    return res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const {email,password} = req.body;

    // Validate input fields
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Incorrect password");
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // Retrieve logged-in user without sensitive information
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure:false,
      
    };
    // Set access token cookie
    res.cookie("accessToken", accessToken,cookieOptions);
    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken,cookieOptions);
    // Respond with user data and tokens
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "User logged in successfully"
        )
      );
  } catch (error) {
    return res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { refreshToken: undefined },
      { new: true }
    );
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  } catch (error) {
    return res.status(500).json({ message: "Logout failed" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or invalid");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    return res.status(error.statusCode || 401).json({ message: error.message });
  }
};

export {generateAccessAndRefreshToken,verifyUser,registerUser,loginUser,logoutUser,refreshAccessToken};