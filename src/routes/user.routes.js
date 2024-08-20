import { Router } from "express";
import * as uc from '../controllers/userController.js'
import orderRouter from './order.routes.js'
// import validate from "../middlewares/validate.js";
// import * as bv from "../../utils/validators/brandValidator.js";
// import { uploadSingleFile } from "../fileUpload/fileUpload.js";
import {checkEmailExistence }from '../middlewares/checkEmailExist.js'

const router = Router();
router.use('/:user/orders',orderRouter)
  .post('/',
  checkEmailExistence,
   uc.addUser
  )
  .get("/",uc.getAllUsers)
  .get("/:id",uc.getUser)
  .patch(
    "/:id",
   uc.updateUser
  )
  .delete("/:id",uc.deleteUser);
export default router;
