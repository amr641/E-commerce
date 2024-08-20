import { Router } from 'express';
import * as oc from '../controllers/order.controller.js';
import {
  allowedTo,
  protectRoutes,
} from '../middlewares/auth/auth.controller.js';
import { verfifyToken } from '../middlewares/verifiyToken.js';
import { roles } from '../../utils/roles.js';
import validate from '../middlewares/validate.js';
import * as ov from '../../utils/validators/orderValidator.js'

const router = Router({mergeParams:true});

router
  .use(verfifyToken, protectRoutes,)
  .post('/:cartId',  validate(ov.createOrderVal),allowedTo(roles.USER),oc.createOrder)
  .get('/user',allowedTo(roles.USER),oc.getUserOrders)
  .get('/',allowedTo(roles.ADMIN),validate(ov.getAllOrderOfUserVal),oc.getAllOrderOfUser)
  .post('/checkout/:cartId',validate(ov.createCheckoutSessionVal),oc.createCheckoutSession)
export default router