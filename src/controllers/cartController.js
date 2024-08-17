import { AppError } from '../../utils/appError.js';
import showNotFound from '../../utils/notFoundErrors.js';
import { catchError } from '../middlewares/catchErrors.js';
import { calcTotalCartPrice } from '../middlewares/helpers/helpers.js';
import { Cart } from '../models/cartModel.js';
import Coupon from '../models/couponModel.js';
import Product from '../models/productModel.js';

const addToCart = catchError(async (req, res, next) => {
  req.body.user = req.user.userId;
  const cart = await Cart.findOne({ user: req.user.userId });
  let product = await Product.findById(req.body.product);
  if (!product) return showNotFound(next, 'product');
  req.body.price = product.price;
  if (req.body.qty >= product.stock) return next(new AppError('sold out', 404));
  if (!cart) {
    const cart = await Cart.create({
      user: req.user.userId,
      cartItems: [req.body],
    });
    calcTotalCartPrice(cart);
    res.status(201).json({ message: 'success', cart });
  } else {
    // increase the product quantity
    req.body.price = product.price;
    let item = cart.cartItems.find(ele => ele.product == req.body.product);
    if (item) {
      if (item.qty >= product.stock) {
        return next(new AppError('sold out', 404));
      }
      item.qty += req.body.qty || 1;
    }
    if (!item) cart.cartItems.push(req.body);
    calcTotalCartPrice(cart);

    await cart.save();

    res.status(201).json({ message: 'success', cart });
  }
});
const updateProductQty = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.userId });
  let item = cart.cartItems.find(ele => ele.product == req.params.product);
  if (!item) return showNotFound(next, 'product');
  let product = await Product.findById(item.product);
  if (req.body.qty >= product.stock) return next(new AppError('sold out', 404));
  item.qty = req.body.qty;
  calcTotalCartPrice(cart);
  await cart.save();
  res.status(201).json({ message: 'success', cart });
});
const removeProductFromCart = catchError(async (req, res, next) => {
  //   let cart =await Cart.findOne({user:req.user.userId})
  // let itemIndex= cart.cartItems.findIndex(ele=>ele.product==req.params.product)
  // cart.cartItems.splice(itemIndex,1)
  // await cart.save()
  // res.status(201).json({message:"success",cart})
  let cart = await Cart.findOneAndUpdate(
    { user: req.user.userId },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );
  calcTotalCartPrice(cart);
  if (cart.cartItems.length == 0) {
    calcTotalCartPrice(cart);
    await cart.save();
    return next(new AppError(`your cart is out of products`, 404));
  }
  res.status(201).json({ message: 'success', cart });
});
const getLoggedUserCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.userId }).populate(
    'cartItems.product'
  );
  cart || showNotFound(next, 'cart');
  !cart || res.status(200).json({ message: 'success', cart });
});
const clearUserCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOneAndDelete({ user: req.user.userId });
  cart || showNotFound(next, 'cart');
  !cart || res.status(200).json({ message: 'success', cart });
});
const applyCoupon = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.userId });
  let coupon = await Coupon.findOne({ code: req.body.code });
  if (!coupon) return next(new AppError('Oops! Coupon code invalid', 404));
  if (coupon.expireDate < Date.now())
    return next(new AppError('expired coupon', 404));
  calcTotalCartPrice(cart);
  await cart.save();
  res.status(200).json({ message: 'coupon applyied successfully', cart });
});

export {
  addToCart,
  updateProductQty,
  removeProductFromCart,
  getLoggedUserCart,
  clearUserCart,
  applyCoupon,
};
