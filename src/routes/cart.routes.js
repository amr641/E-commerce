import { Router } from "express";
import * as cc from '../controllers/cartController.js'
import { verfifyToken } from "../middlewares/verifiyToken.js";
import { allowedTo, protectRoutes } from "../middlewares/auth/auth.controller.js";
import { roles } from "../../utils/roles.js";

const router= Router();
router.use(verfifyToken,protectRoutes,allowedTo(roles.USER))
.post('/',cc.addToCart)
.put('/:product',cc.updateProductQty)
.delete('/:id',cc.removeProductFromCart)
.get('/',cc.getLoggedUserCart)
.delete('/',cc.clearUserCart)
.post('/applyCoupon',cc.applyCoupon)
export default router