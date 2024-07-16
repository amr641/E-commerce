import { Router } from "express";
import * as bc from "../controllers/brandController.js";
import validate from "../middlewares/validate.js";
import * as bv from "../../utils/validators/brandValidator.js";

const router = Router();
router
  .post("/", validate(bv.addBrandVal), bc.addBrand)
  .get("/", bc.getAllBrands)
  .get("/:id", validate(bv.getBrandVal), bc.getBrand)
  .patch("/:id", validate(bv.updateBrandVal), bc.updateBrand)
  .delete("/:id", validate(bv.deleteBrandVal), bc.deleteBrand);
export default router;
