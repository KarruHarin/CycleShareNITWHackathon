import mongoose,{Schema} from "mongoose";

import argon2 from "argon2";
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    college:{
        type:String,
        required:true
    },
    verificationCode:{
      type:String,
      required:true  
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    rating:{
       type:Number,
       enum:[1,2,3,4,5]
    },
    reviews:{
        type:Schema.Types.ObjectId,
        ref:"Review"
    },
    coins:{
       type:Number,
       default:0
    },
    bicycle:{
        type:Schema.Types.ObjectId,
        ref:"Cycle"
    },

},{timestamps:true});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await argon2.hash(this.password, {
            type: argon2.argon2id
        });
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await argon2.verify(this.password, password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this.id,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
     {
       _id: this.id,
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
     }
   );
 };


export const User = mongoose.model("User", userSchema);
