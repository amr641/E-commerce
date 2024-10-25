import showNotFound from '../../utils/notFoundErrors.js';
import { catchError } from '../middlewares/catchErrors.js';
import { handelStockAndSold } from '../middlewares/helpers/helpers.js';
import { Cart } from '../models/cartModel.js';
import { Order } from '../models/orderModel.js';
import Stripe from 'stripe';
import User from '../models/userModel.js';
const stripe = new Stripe(process.env.STRIPT_SECRET_KEY);

const createOrder = catchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.cartId);
  if (!cart) return showNotFound(next, 'cart');
  req.body.user = req.user.userId;
  req.body.orderItems = cart.cartItems;
  req.body.totalOrderPrice =
    cart.totalPriceAfterDiscount || cart.totalCartPrice;
  let order = await Order.create(req.body);
  handelStockAndSold(order);
  await Cart.deleteOne({ _id: cart._id });
  res.status(201).json({ message: 'success', order });
});
const getUserOrders = catchError(async (req, res, next) => {
  let order = await Order.find({ user: req.user.userId }).populate(
    'orderItems.product'
  );
  order || showNotFound(next, 'order');
  !order || res.status(200).json({ message: 'success', order });
});
// only admin can acces this endpoint.
const getAllOrderOfUser = catchError(async (req, res, next) => {
  let orders = await Order.find({ user: req.params.user }).populate(
    'orderItems.product'
  );
  if (!orders.length) return showNotFound(next, 'orders');
  res.status(200).json({ message: 'success', orders });
});
const createCheckoutSession = catchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.cartId);
  console.log(cart.totalCartPrice);
  if (!cart) return showNotFound(next, 'cart');
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'egp',
          unit_amount: Math.round(
            cart.totalCartPrice * 100 || cart.totalPriceAfterDiscount * 100
          ),
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://gemini.google.com/app/7017f304a2d562fe`,
    cancel_url: `https://gemini.google.com/app/7017f304a2d562fe`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });
  // let {line_items}= session;
  // console.log(line_items);
  res.status(200).json({ message: 'success', session });
});
const stripWebHook = catchError(async (req, res) => {
  const sig = req.headers['stripe-signature'].toString();
  let event;
  event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    'whsec_wevqhq52rlCK216ws4v5Al4XGM69ikHf'
  );
  // Handle the event
  let checkoutSessionCompleted;
  if (event.type == 'checkout.session.completed') {
    checkoutSessionCompleted = event.data.object;
    let user = await User.findOne({
      email: checkoutSessionCompleted.customer_email,
    });

    let cart = await Cart.findById(
      checkoutSessionCompleted.client_reference_id
    );
    if (!cart) return showNotFound(next, 'cart');
    req.body.totalOrderPrice =
      cart.totalPriceAfterDiscount || cart.totalCartPrice;
    let order = new Order({
      user: user._id,
      orderItems: cart.cartItems,
      shippingAddress: checkoutSessionCompleted.metadata,
      totalOrderPrice: checkoutSessionCompleted.amount_total / 100,
      paymentMethod: 'card',
      isPaid: true,
    });
    await order.save();
    handelStockAndSold(order);
    await Cart.deleteOne({ _id: cart._id });
  }
  res.json({ details: checkoutSessionCompleted });
});

export {
  createOrder,
  getUserOrders,
  getAllOrderOfUser,
  createCheckoutSession,
  stripWebHook,
};
