import { Schema, Types, model } from 'mongoose';

const orderSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
  },
  orderItems: [
    {
      product: {
        type: Types.ObjectId,
        ref: 'Product',
      },
      qty: Number,
      price: Number,
    },
  ],
  shippingAddress: {
    city: String,
    street: String,
    phone: String,
  },
  totalOrderPrice: Number,
  paymentMethod: {
    type: String,
    enum: ['cod', 'card'],
    default: 'cod',
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt:Date,
  isDeliverd:{
    type:Boolean,
    default:false
  },
  DeliverdAt:Date
});
export const Order = model('Order', orderSchema);
