import { Router } from "express";
import * as sc from "../controllers/subCategoryController.js";
import validate from "../middlewares/validate.js";
import * as sv from "../../utils/validators/subcategoryValidator.js";
import { categoryExistence } from "../middlewares/helpers/helpers.js";
import { allowedTo, protectRoutes } from "../middlewares/auth/auth.controller.js";
import { roles } from "../../utils/roles.js";
import { verfifyToken } from "../middlewares/verifiyToken.js";

const router = Router({ mergeParams: true });
router.use(verfifyToken).use(protectRoutes)
  .post(
    "/",
    allowedTo(roles.USER),
    validate(sv.addsubCategoryValidation),
    categoryExistence,
    sc.addSubCategory
  )
  .get("/", sc.getAllSubCategories)
  .get("/:id", validate(sv.getSubCategoryVal), sc.getSubCategory)
  .patch("/:id", allowedTo(roles.ADMIN),validate(sv.updateSubCategoryVal), sc.updateSubCategory)
  .delete("/:id", allowedTo(roles.ADMIN),validate(sv.deleteSubCategoryVal), sc.deleteSubCategory);
export default router;
