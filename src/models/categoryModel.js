import { Schema, Types, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: [13, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: [true, "slug must be unique"],
    },
    img: String,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: false }
);
const Category = model("Category", categorySchema);
export default Category;
