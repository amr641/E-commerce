import { Router } from "express";
import * as sc from "../controllers/subCategoryController.js";
import validate from "../middlewares/validate.js";
import * as sv from "../../utils/validators/subcategoryValidator.js";
import * as auth from "../middlewares/authMiddleware.js";

const router = Router();
router
  .post(
    "/",
    validate(sv.addsubCategoryValidation),
    auth.categoryExistence,
    sc.addSubCategory
  )
  .get("/", sc.getAllSubCategories)
  .get("/:id", validate(sv.getSubCategoryVal), sc.getSubCategory)
  .patch("/:id", validate(sv.updateSubCategoryVal), sc.updateSubCategory)
  .delete("/:id", validate(sv.deleteSubCategoryVal), sc.deleteSubCategory);
export default router;
