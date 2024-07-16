import { Schema, Types, model } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    discount: Number,
    expireDate: Date,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: false }
);
const Coupon = model("Coupon", couponSchema);
export default Coupon;
