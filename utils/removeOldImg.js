import fs from "fs";
import { AppError } from "./appError.js";
export const removeOldImage = function (qualifiedImage) {
  return (req, res, next) => {
    let startIndex = qualifiedImage.indexOf("up");
    let oldImagePath = qualifiedImage.slice(startIndex);
    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
    else next(new AppError("file does not exist", 409));
  };
};
