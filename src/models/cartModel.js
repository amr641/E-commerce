import { Schema, Types, model } from 'mongoose';

const cartSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItems: [
    {
      product: {
        type: Types.ObjectId,
        ref: 'Product',
      },
      qty: {
        type: Number,
        default: 1,
      },
      price:Number
    },
  ],
  totalCartPrice:Number,
  discount:Number,
  totalPriceAfterDiscount:Number,

});
export const Cart = model('Cart', cartSchema);
