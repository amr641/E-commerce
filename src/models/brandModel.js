import { Schema, Types, model } from 'mongoose';
// import dotEnv from 'dotenv';
// dotEnv.config();
const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: [true, 'too short category name'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    logo: String,
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false, timestamps: false }
);
brandSchema.post('init', function (doc) {
  let str = process.env.BASE_URL + 'brands/';
  doc.logo = str + doc.logo;
});
const Brand = model('Brand', brandSchema);
export default Brand;
