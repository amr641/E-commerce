import handelNulls from "../../utils/notFoundErrors.js";
import Category from "../models/categoryModel.js";
import { catchError } from "./catchErrors.js";

export const categoryExistence = catchError(async (req, res, next) => {
  const category = await Category.findById(req.body.category);
  category || handelNulls(next, "category");
  !category || next();
});
