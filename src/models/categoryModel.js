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
    image: String,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: false }
);
categorySchema.post("init", function (doc) {
  let str = "http://localhost:3000/uploads/categories/";
  doc.image = str + doc.image;
});
const Category = model("Category", categorySchema);
export default Category;
