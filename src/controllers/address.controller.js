
import showNotFound from "../../utils/notFoundErrors.js";
import { catchError } from "../middlewares/catchErrors.js";
import User from "../models/userModel.js";


const updateAddress = catchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(req.user.userId, {$push:{addresses:req.body}},{new:true});
  address||showNotFound(next,'Address')
  !address||res.status(200).json({ message: "success", addresses:address.addresses });
 
});
const removeFromAddress = catchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(req.user.userId,{$pull:{addresses:{_id:req.params.address}}},{new:true});

  address||showNotFound(next,'Address')
  !address||res.status(200).json({ message: "success", addresses:address.addresses });
 
});
const getUserAddress= catchError(async(req,res,next)=>{
  let address =await User.findById(req.user.userId)
  res.status(200).json({message:'success',addresses:address.addresses})
})

export {  updateAddress,removeFromAddress,getUserAddress };
