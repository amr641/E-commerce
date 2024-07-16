import { Schema, Types, model } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: [true, "too short category name"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    logo: String,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: false }
);
const Brand = model("Brand", brandSchema);
export default Brand;
