import jwt from "jsonwebtoken";
import { appError } from "../utils/appError.js";
import { secretKey } from "./auth.js";
export const verfifyToken = async (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return next(new appError("inavlid token", 401));
    req.user = decoded;
    next();
  });
};
