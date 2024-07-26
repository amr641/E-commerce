import slugify from "slugify";
import { catchError } from "../middlewares/catchErrors.js";

import showNotFound from "../../utils/notFoundErrors.js";
import SubCategory from "../models/subCategoryModel.js";
import { ApiFeatuers } from "../../utils/apiFeatures.js";

// add sub category
const addSubCategory = catchError(async (req, res) => {
  console.log(req.body);
  req.body.slug = slugify(req.body.name);
  let subCategory = await SubCategory.create(req.body);
  res.status(201).json({ message: "success", subCategory });
});
// allsub categories
const getAllSubCategories = catchError(async (req, res) => {
  let filter = () => {
    if (req.params.category) return { category: req.params.category };
    return {};
  };
  let apiFeatuers= new ApiFeatuers(SubCategory.find(filter()),req.query).pagination().sort().select().filter().search()
  let {page,limit}= apiFeatuers
  let subCategories = await apiFeatuers.mongooseQuery.populate('category');
 

  res.status(200).json({ message: "success", page,limit,subCategories });
});
// get single subcategory
const getSubCategory = catchError(async (req, res, next) => {
  let subCategory = await SubCategory.findById(req.params.id);
  subCategory || showNotFound(next, "SubCategory");
  !subCategory || res.status(200).json({ message: "success", subCategory });
});
// update sub category
const updateSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  subCategory || showNotFound(next, "subCategory");
  !subCategory || res.status(200).json({ message: "success", subCategory });
});
// delete sub category
const deleteSubCategory = catchError(async (req, res, next) => {
  let subCategory = await SubCategory.findByIdAndDelete(req.params.id);
  subCategory || showNotFound(next, "SubCategory");
  !subCategory || res.status(200).json({ message: "success", subCategory });
});
export {
  addSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
