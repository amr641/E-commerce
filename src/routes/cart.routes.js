import { Router } from "express";
import * as cc from '../controllers/cartController.js'
import { verfifyToken } from "../middlewares/verifiyToken.js";
import * as cv from '../../utils/validators/cartValidator.js'
import { allowedTo, protectRoutes } from "../middlewares/auth/auth.controller.js";
import { roles } from "../../utils/roles.js";
import validate from "../middlewares/validate.js";

const router= Router();
router.use(verfifyToken,protectRoutes,allowedTo(roles.USER))
.post('/',validate(cv.addToCartVal),cc.addToCart)
.put('/:product',validate(cv.updateProductQtyVal),cc.updateProductQty)
.delete('/:id',validate(cv.removeProductFromCartVal),cc.removeProductFromCart)
.get('/',cc.getLoggedUserCart)
.delete('/',cc.clearUserCart)
.post('/applyCoupon',validate(cv.applyCouponVal),cc.applyCoupon)
export default router