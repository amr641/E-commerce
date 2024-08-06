
import showNotFound from "../../utils/notFoundErrors.js";
import { catchError } from "../middlewares/catchErrors.js";
import User from "../models/userModel.js";


const updateWishList = catchError(async (req, res, next) => {
  let wishList = await User.findByIdAndUpdate(req.user.userId, {$addToSet:{wishList:req.body.product}},{new:true});
  wishList||showNotFound(next,'wishList')
  !wishList||res.status(200).json({ message: "success", wishList:wishList.wishList });
 
});
const removeFromWishList = catchError(async (req, res, next) => {
  let wishList = await User.findByIdAndUpdate(req.user.userId, {$pull:{wishList:req.params.product}},{new:true});
  wishList||showNotFound(next,'wishList')
  !wishList||res.status(200).json({ message: "success", wishList:wishList.wishList });
 
});
const getUserWishList= catchError(async(req,res,next)=>{
  let wishList =await User.findById(req.user.userId).populate('wishList')
  res.status(200).json({message:'success',wishList:wishList.wishList})
})

export {  updateWishList,removeFromWishList,getUserWishList };
