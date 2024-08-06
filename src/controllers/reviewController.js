
import { catchError } from "../middlewares/catchErrors.js";
import showNotFound from "../../utils/notFoundErrors.js";
import { ApiFeatuers } from "../../utils/apiFeatures.js";
import Review from "../models/reviewModel.js";

// add review
const addReview = catchError(async (req, res) => {

  req.body.user=req.user.userId
  let review = await Review.create(req.body);
  res.status(201).json({ message: "success", review });
});
// all reviews
const getAllReviews = catchError(async (req, res) => {
  let apiFeatuers= new ApiFeatuers(Review.find(),req.query).pagination().sort().select().filter().search()
  let {page,limit}= apiFeatuers
  let reviews = await apiFeatuers.mongooseQuery;
  res.status(200).json({ message: "success",page,limit, reviews });
});
// get single Review
const getReview = catchError(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  review || showNotFound(next, "review");
  !review || res.status(200).json({ message: "success", review });
});
// update Review
const updateReview = catchError(async (req, res, next) => {
  let review = await Review.findByIdAndUpdate(req.params.id, req.body);
  review || showNotFound(next, "Review");
  !review || res.status(200).json({ message: "success", review });
});
// delete Review
const deleteReview = catchError(async (req, res, next) => {
  let review = await Review.findByIdAndDelete(req.params.id);
  review || showNotFound(next, "Review");
  !review || res.status(200).json({ message: "success", review });
});
export { addReview, getAllReviews, getReview, updateReview, deleteReview };
