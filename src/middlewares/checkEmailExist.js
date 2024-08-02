import { AppError } from "../../utils/appError.js"
import User from "../models/userModel.js"
import { catchError } from "./catchErrors.js"

export const checkEmailExistence = catchError(async(req,res,next)=>{
    let user= await User.findOne({email:req.body.email})
   if(user) return next(new AppError('email already exist',409))
   next()
  })