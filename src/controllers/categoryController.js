import slugify from "slugify";
import { catchError } from "../middlewares/catchErrors.js";
import Category from "../models/categoryModel.js";
import showNotFound from "../../utils/notFoundErrors.js";
import { removeOldImage } from "../../utils/removeOldImg.js";
import { ApiFeatuers } from "../../utils/apiFeatures.js";

// add category
const addCategory = catchError(async (req, res) => {
  // console.log(req.file);
  req.body.image = req.file.filename;
  req.body.slug = slugify(req.body.name);
  let category = await Category.create(req.body);
  res.status(201).json({ message: "success", category });
});
// all categories
const getAllCategories = catchError(async (req, res) => {
  let apiFeatuers= new ApiFeatuers(Category.find(),req.query).sort().select().filter().search().pagination()
  let {page,limit}= apiFeatuers
  let categories = await apiFeatuers.mongooseQuery;
  res.status(200).json({ message: "success",page,limit, categories });
});
// get single category
const getCategory = catchError(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  category || showNotFound(next, "category");
  !category || res.status(200).json({ message: "success", category });
});
// update category
const updateCategory = catchError(async (req, res, next) => {
  if (req.file) req.body.img = req.file.filename;
  if (req.body.name) req.body.slug = slugify(req.body.name);
  let category = await Category.findByIdAndUpdate(req.params.id, req.body);
  if (req.body.image) removeOldImage(category.image);
  !category || res.status(200).json({ message: "success", category });
});
// delete category
const deleteCategory = catchError(async (req, res, next) => {
  let category = await Category.findByIdAndDelete(req.params.id);
  category || showNotFound(next, "category");
  !category || res.status(200).json({ message: "success", category });
});
export {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
