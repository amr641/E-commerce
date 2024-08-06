import { Router } from 'express';
import * as wc from '../controllers/wishListController.js';
import { verfifyToken } from '../middlewares/verifiyToken.js';
import {
  allowedTo,
  protectRoutes,
} from '../middlewares/auth/auth.controller.js';
import { roles } from '../../utils/roles.js';
import * as wv from '../../utils/validators/wishListValidator.js'
import validate from '../middlewares/validate.js';

const router = Router();
router
  .use(verfifyToken)
  .use(protectRoutes)
  .patch(
    '/',
    allowedTo(roles.USER),
    validate(wv.addToWishListVal),
    wc.updateWishList
  )
  .delete(
    '/:product',
    allowedTo(roles.USER, roles.ADMIN),
    validate(wv.removeFromWishList),
    wc.removeFromWishList
  )
  .get(
    '/',
    allowedTo(roles.USER),
    wc.getUserWishList
  );

export default router;
