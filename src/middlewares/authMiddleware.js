import showNotFound from '../../utils/notFoundErrors.js';
import Brand from '../models/brandModel.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import { catchError } from './catchErrors.js';

const categoryExistence = catchError(async (req, res, next) => {
  const category = await Category.findById(req.body.category||req.params.id);
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
export { categoryExistence, productExistence ,brandExistence};
