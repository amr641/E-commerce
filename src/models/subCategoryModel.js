import { Schema, Types, model } from "mongoose";

const subcategorySchema = new Schema(
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
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: false }
);
const SubCategory = model("SubCategory", subcategorySchema);
export default SubCategory;
