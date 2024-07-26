import { Router } from "express";
import * as pc from "../controllers/productController.js";
import validate from "../middlewares/validate.js";
import * as pv from "../../utils/validators/productValidator.js";
import * as auth from "../middlewares/authMiddleware.js";
import { uploadMixOfFiles } from "../fileUpload/fileUpload.js";

const router = Router();
router
  .post(
    "/",
    uploadMixOfFiles("products", [
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 6 },
    ]),
    validate(pv.addProductVal),
    // auth.categoryExistence,
    pc.addProduct
  )
  .get(
    "/",
    //  validate(pv.getAllProductsVal),
    pc.getAllProducts
  )
  .get("/:id", validate(pv.getProductVal), pc.getProduct)
  .patch(
    "/:id",
    uploadMixOfFiles("products", [
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 6 },
    ]),
    validate(pv.updateProductVal),
    pc.updateProduct
  )
  .delete("/:id", validate(pv.deleteProductVal), pc.deleteProduct);
export default router;
