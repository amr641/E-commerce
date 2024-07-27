import { Router } from "express";
import * as bc from "../controllers/brandController.js";
import validate from "../middlewares/validate.js";
import * as bv from "../../utils/validators/brandValidator.js";
import { uploadSingleFile } from "../fileUpload/fileUpload.js";
import * as auth from "../middlewares/authMiddleware.js";

const router = Router();
router
  .post(
    "/",
    uploadSingleFile("brands", "logo"),
    validate(bv.addBrandVal),
    bc.addBrand
  )
  .get("/", bc.getAllBrands)
  .get("/:id", validate(bv.getBrandVal), bc.getBrand)
  .patch(
    "/:id",
    auth.brandExistence,
    uploadSingleFile("brands", "logo"),
    validate(bv.updateBrandVal),
    bc.updateBrand
  )
  .delete("/:id", validate(bv.deleteBrandVal), bc.deleteBrand);
export default router;
