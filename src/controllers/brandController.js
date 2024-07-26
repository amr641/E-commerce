import slugify from "slugify";
import { catchError } from "../middlewares/catchErrors.js";
import Brand from "../models/brandModel.js";
import showNotFound from "../../utils/notFoundErrors.js";
import { removeOldImage } from "../../utils/removeOldImg.js";
import { ApiFeatuers } from "../../utils/apiFeatures.js";

// add category
const addBrand = catchError(async (req, res) => {
  
  req.body.logo = req.file.filename;
  req.body.slug = slugify(req.body.name);
  let brand = await Brand.create(req.body);
  res.status(201).json({ message: "success", brand });
});
// all categories
const getAllBrands = catchError(async (req, res) => {
  let apiFeatuers= new ApiFeatuers(Brand.find(),req.query).pagination().sort().select().filter().search()
  let {page,limit}= apiFeatuers
  let brands = await apiFeatuers.mongooseQuery;
  res.status(200).json({ message: "success",page,limit, brands });
});
// get single Brand
const getBrand = catchError(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);
  brand || showNotFound(next, "brand");
  !brand || res.status(200).json({ message: "success", brand });
});
// update Brand
const updateBrand = catchError(async (req, res, next) => {
  if (req.file) req.body.logo = req.file.filename;
  if (req.body.name) req.body.slug = slugify(req.body.name);
  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body);
  brand || showNotFound(next, "Brand");
  if (brand.logo) removeOldImage(brand.logo);
  !brand || res.status(200).json({ message: "success", brand });
});
// delete Brand
const deleteBrand = catchError(async (req, res, next) => {
  let brand = await Brand.findByIdAndDelete(req.params.id);
  brand || showNotFound(next, "brand");
  !brand || res.status(200).json({ message: "success", brand });
});
export { addBrand, getAllBrands, getBrand, updateBrand, deleteBrand };
