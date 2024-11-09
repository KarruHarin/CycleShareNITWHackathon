import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    typeOfReview: {
        type: String,
        enum: ['cycle', 'user'],
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        // ref will be dynamically validated based on typeOfReview
        refPath: 'typeOfReview',
        required: true
    },
    rating:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    reviewDescription:{
        type:String,
    }
}, { timestamps: true });

// Adding a pre-save middleware to validate the ref based on typeOfReview
reviewSchema.pre('save', function(next) {
    if (this.typeOfReview === 'cycle') {
        this.constructor.schema.path('to').options.ref = 'Cycle';
    } else if (this.typeOfReview === 'user') {
        this.constructor.schema.path('to').options.ref = 'User';
    }
    next();
});


export const Review = mongoose.model("Review", reviewSchema);