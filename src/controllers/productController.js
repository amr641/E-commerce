import slugify from 'slugify';
import { catchError } from '../middlewares/catchErrors.js';
import Product from '../models/productModel.js';
import showNotFound from '../../utils/notFoundErrors.js';
import fs from 'fs';
import { removeOldImage, removeOldImages } from '../../utils/removeOldImg.js';
import { AppError } from '../../utils/appError.js';
import { ApiFeatuers } from '../../utils/apiFeatures.js';
// import path from 'path';

// add product
const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map(img => img.filename);
  let product = await Product.create(req.body);
  res.status(201).json({ message: 'success', product });
});
// all products
const getAllProducts = catchError(async (req, res) => {
  let apiFeatuers = new ApiFeatuers(Product.find(), req.query)
    .select()
    .filter()
    .sort()
    .search();
  let { page, limit } = apiFeatuers;
  let products = await apiFeatuers.mongooseQuery;
  res.status(200).json({ message: 'success', page, limit, products });
});
// get single product
const getProduct = catchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  product || showNotFound(next, 'product');
  !product || res.status(200).json({ message: 'success', product });
});
// update product
const updateProduct = catchError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  if (req.files) {
    if (req.files.imageCover) {
      removeOldImage(product)
      req.body.imageCover = req.files.imageCover[0].filename;
    }
    if (req.files.images) {
      let imagesLength = req.files.images.length;
      console.log(imagesLength);
      for (let i = 0; i < imagesLength; i++) {
        let startIndex = product.images[i].indexOf('up');
        let oldImagePath = product.images[i].slice(startIndex);
        req.body.images =req.files.images.map(ele=>ele.filename)
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        } else {
          return next(new AppError('file does not exist', 409));
        }
      }
      //     let imagesFilePath = product.images.map((ele) => ele.split('/')[5])
      //     imagesFilePath = imagesFilePath.map((ele) => path.join('uploads', 'products', `${ele}`))
      //     imagesFilePath.map(ele => fs.unlinkSync(ele))
      //     req.body.images = req.files.images.map(ele => ele.filename)
      // }
    }
  }
  res.status(201).json({ message: 'success' });
});
// delete product
const deleteProduct = catchError(async (req, res, next) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  product || showNotFound(next, 'product');
  !product || res.status(200).json({ message: 'success', product });
});
export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
