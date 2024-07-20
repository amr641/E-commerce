import slugify from "slugify";
import { catchError } from "../middlewares/catchErrors.js";
import Product from "../models/productModel.js";
import showNotFound from "../../utils/notFoundErrors.js";
import { removeOldImage } from "../../utils/removeOldImg.js";

// add category
const addProduct = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = await Product.create(req.body);
  res.status(201).json({ message: "success", product });
});
// all categories
const getAllProducts = catchError(async (req, res) => {
  let products = await Product.find();
  res.status(200).json({ message: "success", products });
});
// get single product
const getProduct = catchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  product || showNotFound(next, "product");
  !product || res.status(200).json({ message: "success", product });
});
// update product
const updateProduct = catchError(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);

  let product = await Product.findByIdAndUpdate(req.params.id, req.body);
  product || showNotFound(next, "product");
  if (req.body.imageCover) removeOldImage(product.imageCover);
  !Product || res.status(200).json({ message: "success", product });
});
// delete product
const deleteProduct = catchError(async (req, res, next) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  product || showNotFound(next, "product");
  !product || res.status(200).json({ message: "success", product });
});
export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
