import slugify from "slugify";
import { catchError } from "../middlewares/catchErrors.js";
import Brand from "../models/brandModel.js";
import showNotFound from "../../utils/notFoundErrors.js";

// add category
const addBrand = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  let brand = await Brand.create(req.body);
  res.status(201).json({ message: "success", brand });
});
// all categories
const getAllBrands = catchError(async (req, res) => {
  let brands = await Brand.find();
  res.status(200).json({ message: "success", brands });
});
// get single Brand
const getBrand = catchError(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);
  if (!brand) return showNotFound(next, "brand");
  res.status(200).json({ message: "success", brand });
});
// update Brand
const updateBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  brand || showNotFound(next, "Brand");
  !brand || res.status(200).json({ message: "success", brand });
});
// delete Brand
const deleteBrand = catchError(async (req, res, next) => {
  let brand = await Brand.findByIdAndDelete(req.params.id);
  brand || showNotFound(next, "brand");
  !brand || res.status(200).json({ message: "success", brand });
});
export { addBrand, getAllBrands, getBrand, updateBrand, deleteBrand };
