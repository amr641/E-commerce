import { Schema, Types, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: {
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
    desc: {
      type: String,
      required: true,
      minLength: [10, 'too short description'],
      maxLength: 1000,
    },
    imageCover: String,
    images: [String],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    sold: Number,
    stock: {
      type: Number,
      min: 0,
    },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
    },
    subcategory: {
      type: Types.ObjectId,
      ref: 'SubCategory',
    },
    brand: {
      type: Types.ObjectId,
      ref: 'Brand',
    },
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: Number,
  },

  { versionKey: false, timestamps: false ,toJSON:{virtuals:true}}
);
productSchema.virtual('reviews', {
  localField: '_id',
  ref: 'Review',
  // refer to product field in reviews model
  foreignField: 'product',
});
productSchema.pre(/^find/,function(){
  this.populate('reviews')
})
productSchema.post('init', function (doc) {
  let url = process.env.BASE_URL+"products/";
  if (doc.imageCover) doc.imageCover = url + doc.imageCover;
  doc.images = doc.images?.map(image => url + image);
});
const Product = model('Product', productSchema);

export default Product;
