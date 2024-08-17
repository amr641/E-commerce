import { Router } from 'express';
import * as cc from '../controllers/couponController.js';
import validate from '../middlewares/validate.js';
import * as cv from '../../utils/validators/couponValidator.js';
import {
  allowedTo,
  protectRoutes,
} from '../middlewares/auth/auth.controller.js';
import { verfifyToken } from '../middlewares/verifiyToken.js';
import { roles } from '../../utils/roles.js';
import { couponExistence, removeExpiredCoupons } from '../middlewares/helpers/helpers.js';

const router = Router();
router
  .use(verfifyToken,protectRoutes,allowedTo(roles.ADMIN))
  .post(
    '/',
    validate(cv.addCouponVal),
    couponExistence,
    cc.addCoupon
  )
  .get('/', removeExpiredCoupons,cc.getAllCoupons)
  .get('/:id',removeExpiredCoupons, validate(cv.getCouponVal), cc.getCoupon)
  .patch('/:id', validate(cv.updateCouponVal), cc.updateCoupon)
  .delete(
    '/:id',
    validate(cv.deleteCouponVal),
    cc.deleteCoupon
  );
export default router;
