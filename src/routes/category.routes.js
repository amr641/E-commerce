import { Router } from "express";
import * as cc from "../controllers/categoryController.js";
import validate from "../middlewares/validate.js";
import * as cv from "../../utils/validators/categoryValidator.js";

const router = Router();
router
  .post("/", validate(cv.addCategoryValidation), cc.addCategory)
  .get("/", cc.getAllCategories)
  .get("/:id", validate(cv.getCategoryVal), cc.getCategory)
  .patch("/:id", validate(cv.updateCategoryVal), cc.updateCategory)
  .delete("/:id", validate(cv.deleteCategoryVal), cc.deleteCategory);
export default router;
