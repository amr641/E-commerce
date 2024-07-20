import { Router } from "express";
import * as bc from "../controllers/brandController.js";
import validate from "../middlewares/validate.js";
import * as bv from "../../utils/validators/brandValidator.js";
import { uploadSingleFile } from "../fileUpload/fileUpload.js";

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
    uploadSingleFile("brands", "logo"),
    validate(bv.updateBrandVal),
    bc.updateBrand
  )
  .delete("/:id", validate(bv.deleteBrandVal), bc.deleteBrand);
export default router;
