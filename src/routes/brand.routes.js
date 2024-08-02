import { Router } from 'express';
import * as bc from '../controllers/brandController.js';
import validate from '../middlewares/validate.js';
import * as bv from '../../utils/validators/brandValidator.js';
import { uploadSingleFile } from '../fileUpload/fileUpload.js';
import { brandExistence } from '../middlewares/helpers/helpers.js';
import {
  allowedTo,
  protectRoutes,
} from '../middlewares/auth/auth.controller.js';
import { verfifyToken } from '../middlewares/verifiyToken.js';
import { roles } from '../../utils/roles.js';

const router = Router();
router
  .use(verfifyToken)
  .use(protectRoutes)
  .post(
    '/',
    uploadSingleFile('brands', 'logo'),
    validate(bv.addBrandVal),
    bc.addBrand
  )
  .get('/', bc.getAllBrands)
  .get('/:id', validate(bv.getBrandVal), bc.getBrand)
  .patch(
    '/:id',
    brandExistence,
    uploadSingleFile('brands', 'logo'),
    validate(bv.updateBrandVal),
    bc.updateBrand
  )
  .delete(
    '/:id',
    allowedTo(roles.ADMIN),
    validate(bv.deleteBrandVal),
    bc.deleteBrand
  );
export default router;
