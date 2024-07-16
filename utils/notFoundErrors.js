import { AppError } from "./appError.js";

const showNotFound = function (next, model) {
  return next(new AppError(`${model} not found`, 404));
};
export default showNotFound;
