import { Router } from 'express';
import * as cc from '../controllers/categoryController.js';
import validate from '../middlewares/validate.js';
import * as cv from '../../utils/validators/categoryValidator.js';
import subCategoryRouter from './subCategory.routes.js';
import { uploadSingleFile } from '../fileUpload/fileUpload.js';
import { categoryExistence } from '../middlewares/helpers/helpers.js';
import {
  allowedTo,
  protectRoutes,
} from '../middlewares/auth/auth.controller.js';
import { verfifyToken } from '../middlewares/verifiyToken.js';
import { roles } from '../../utils/roles.js';

const router = Router();

router
  .use('/:category/subCategories',verfifyToken,protectRoutes, subCategoryRouter)
  .post(
    '/',

    uploadSingleFile('categories', 'image'),
    validate(cv.addCategoryValidation),
    cc.addCategory
  )
  .get('/', cc.getAllCategories)
  .get(
    '/:id',
    verfifyToken,protectRoutes,
    allowedTo(roles.USER, roles.ADMIN),
    validate(cv.getCategoryVal),
    cc.getCategory
  )
  .patch(
    '/:id',
    verfifyToken,protectRoutes,
    allowedTo(roles.USER, roles.ADMIN),
    categoryExistence,
    uploadSingleFile('categories', 'image'),
    validate(cv.updateCategoryVal),
    cc.updateCategory
  )
  .delete(
    '/:id',
    verfifyToken,protectRoutes,
    allowedTo(roles.MANAGER),
    validate(cv.deleteCategoryVal),
    cc.deleteCategory
  );
export default router;
