import { Router } from 'express';
import * as pc from '../controllers/productController.js';
import validate from '../middlewares/validate.js';
import * as pv from '../../utils/validators/productValidator.js';

import { uploadMixOfFiles } from '../fileUpload/fileUpload.js';
import { productExistence } from '../middlewares/helpers/helpers.js';
import {
  allowedTo,
  protectRoutes,
} from '../middlewares/auth/auth.controller.js';
import { roles } from '../../utils/roles.js';
import { verfifyToken } from '../middlewares/verifiyToken.js';

const router = Router();
router
  .use(verfifyToken)
  .use(protectRoutes)
  .post(
    '/',
    allowedTo(roles.USER),
    uploadMixOfFiles('products', [
      { name: 'imageCover', maxCount: 1 },
      { name: 'images', maxCount: 6 },
    ]),
    validate(pv.addProductVal),
    // auth.categoryExistence,
    pc.addProduct
  )
  .get(
    '/',
    //  validate(pv.getAllProductsVal),
    pc.getAllProducts
  )
  .get('/:id', validate(pv.getProductVal), pc.getProduct)
  .patch(
    '/:id',
    allowedTo(roles.USER),
    productExistence,
    uploadMixOfFiles('products', [
      { name: 'imageCover', maxCount: 1 },
      { name: 'images', maxCount: 6 },
    ]),
    validate(pv.updateProductVal),
    pc.updateProduct
  )
  .delete(
    '/:id',
    allowedTo(roles.ADMIN),
    validate(pv.deleteProductVal),
    pc.deleteProduct
  );
export default router;
