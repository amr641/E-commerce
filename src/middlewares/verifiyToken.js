import jwt from "jsonwebtoken";
import { AppError } from "../../utils/appError.js";
export const verfifyToken = async (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return next(new AppError("inavlid token", 401));
    req.user = decoded;
    next();
  });
};  
