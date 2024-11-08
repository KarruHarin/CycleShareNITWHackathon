import mongoose,{Schema} from "mongoose";

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
    college:{
        type:String,
        required:true
    },
    bicycle:{
        type:Schema.Types.ObjectId,
        ref:"Cycle"

    }
},{timestamps:true});

export const User = mongoose.model("User", userSchema);
