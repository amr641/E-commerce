import { Schema, Types, model } from "mongoose";

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      minLength: 5,
      maxLength: 1000,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);
// reviewSchema.pre(/^find/,function(){
//   this.populate('user')
// })

const Review = model("Review", reviewSchema);
export default Review;
