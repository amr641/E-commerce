import { Router } from "express";
import * as cc from "../controllers/categoryController.js";
import validate from "../middlewares/validate.js";
import * as cv from "../../utils/validators/categoryValidator.js";
import subCategoryRouter from "./subCategory.routes.js";
import { uploadSingleFile } from "../fileUpload/fileUpload.js";

const router = Router();

router
  .use("/:category/subCategories", subCategoryRouter)
  .post(
    "/",
    uploadSingleFile("categories", "image"),
    validate(cv.addCategoryValidation),
    cc.addCategory
  )
  .get("/", cc.getAllCategories)
  .get("/:id", validate(cv.getCategoryVal), cc.getCategory)
  .patch(
    "/:id",
    uploadSingleFile("categories", "image"),
    validate(cv.updateCategoryVal),
    cc.updateCategory
  )
  .delete("/:id", validate(cv.deleteCategoryVal), cc.deleteCategory);
export default router;
