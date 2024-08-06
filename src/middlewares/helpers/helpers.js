import { AppError } from '../../../utils/appError.js';
import showNotFound from '../../../utils/notFoundErrors.js';
import Brand from '../../models/brandModel.js';
import Category from '../../models/categoryModel.js';
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
const checkReviewUniqueness = catchError(async (req, res, next) => {
  const reviews = await Review.find({
    $and: [{ user: req.user.userId }, { product: req.body.product }],
  });
  if (!reviews.length) return next();
  next(new AppError('only one review can be added', 409));
});
const authReview =catchError(async(req,res,next)=>{
  const review = await Review.findById(req.params.id);
  if(!review) return showNotFound(next,'review')
  if(req.user.userId !== review.user) return next(new AppError('you are not authorized',403))
  next()
})
// --------------------------------------------
export {
  categoryExistence,
  productExistence,
  brandExistence,
  checkReviewUniqueness,
  authReview
};
