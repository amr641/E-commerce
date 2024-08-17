
import { catchError } from "../middlewares/catchErrors.js";
import Coupon from "../models/couponModel.js";
import showNotFound from "../../utils/notFoundErrors.js";

import { ApiFeatuers } from "../../utils/apiFeatures.js";

// add coupon
const addCoupon = catchError(async (req, res) => {
  let coupon = await Coupon.create(req.body);
  res.status(201).json({ message: "success", coupon });
});
// all coupons
const getAllCoupons = catchError(async (req, res) => {
  let apiFeatuers= new ApiFeatuers(Coupon.find(),req.query).pagination().sort().select().filter().search()
  let {page,limit}= apiFeatuers
  let coupon = await apiFeatuers.mongooseQuery;
  res.status(200).json({ message: "success",page,limit, coupon });
});
// get single coupon
const getCoupon = catchError(async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);
  coupon || showNotFound(next, "coupon");
  !coupon || res.status(200).json({ message: "success", coupon });
});
// update coupon
const updateCoupon = catchError(async (req, res, next) => {
  let coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body);
  coupon || showNotFound(next, "coupon");
  !coupon || res.status(200).json({ message: "success", coupon });
});
// delete coupon
const deleteCoupon = catchError(async (req, res, next) => {
  let coupon = await Coupon.findByIdAndDelete(req.params.id);
  coupon || showNotFound(next, "coupon");
  !coupon || res.status(200).json({ message: "success", coupon });
});
export { addCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon };
