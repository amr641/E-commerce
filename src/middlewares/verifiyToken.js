import jwt from "jsonwebtoken";
import { AppError } from "../../utils/appError.js";
import User from "../models/userModel.js";
import showNotFound from "../../utils/notFoundErrors.js";
export const verfifyToken = async (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.JWT_KEY, async(err, decoded) => {
    if (err) return next(new AppError("inavlid token", 401));
    let user= await User.findById(decoded.userId);
    if(!user) return showNotFound(next,'user')
    req.user = decoded;
    next();
  });
};  
