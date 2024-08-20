import { AppError } from '../../../utils/appError.js';
import showNotFound from '../../../utils/notFoundErrors.js';
import Brand from '../../models/brandModel.js';
import { Cart } from '../../models/cartModel.js';
import Category from '../../models/categoryModel.js';
import Coupon from '../../models/couponModel.js';
import Product from '../../models/productModel.js';
import Review from '../../models/reviewModel.js';
import { catchError } from '../catchErrors.js';

const categoryExistence = catchError(async (req, res, next) => {
  const category = await Category.findById(req.body.category || req.params.id);
  category || showNotFound(next, 'category');
  !category || next();
});
const productExistence = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  product || showNotFound(next, 'product');
  !product || next();
});
const brandExistence = catchError(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  brand || showNotFound(next, 'brand');
  !brand || next();
});
const couponExistence = catchError(async (req, res, next) => {
  const coupon = await Coupon.findOne({ code: req.body.code });
  if (!coupon) return next();
  next(new AppError('coupon already exist', 409));
});
const removeExpiredCoupons = catchError(async (req, res) => {
  await Coupon.deleteMany({ expireDate: { $lte: Date.now() } });
  next();
});
const checkReviewUniqueness = catchError(async (req, res, next) => {
  const reviews = await Review.find({
    $and: [{ user: req.user.userId }, { product: req.body.product }],
  });
  if (!reviews.length) return next();
  next(new AppError('only one review can be added', 409));
});
const authReview = catchError(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) return showNotFound(next, 'review');
  if (req.user.userId !== review.user)
    return next(new AppError('you are not authorized', 403));
  next();
});
const calcTotalCartPrice = function (cart) {
  let totalPrice = 0
  cart.cartItems
  .map(ele=>totalPrice+=ele.qty*ele.price)
 cart.totalCartPrice =totalPrice
//  ------------------------------
if(cart.discount){
 let couponDiscount = cart.discount;
 cart.discount=cart.discount
 cart.totalPriceAfterDiscount =
   totalPrice - totalPrice * (couponDiscount / 100);
}
};
const handelStockAndSold=  async(order)=>{
 let quiery= order.orderItems.map( ele=>{
    // let product = await Product.findById(ele.product)
    // product.sold+=ele.qty;
    // product.stock-=ele.qty
    // await product.save()
    return (
      {
      updateOne: { 
        filter: { _id: ele.product }, 
        update: { $inc:{sold:ele.qty,stock:-ele.qty}}, 
    }
    }
    )
  })
  await Product.bulkWrite(quiery)
  

}
// --------------------------------------------
export {
  categoryExistence,
  productExistence,
  brandExistence,
  checkReviewUniqueness,
  authReview,
  couponExistence,
  removeExpiredCoupons,
  calcTotalCartPrice,
  handelStockAndSold
};
