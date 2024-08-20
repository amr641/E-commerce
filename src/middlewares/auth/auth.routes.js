import { Router } from 'express';
import { changeUserPassword, logIn, signUp } from './auth.controller.js';
import { checkEmailExistence } from '../checkEmailExist.js';
import { verfifyToken } from '../verifiyToken.js';
import validate from '../validate.js';
import * as uv from '../../../utils/validators/userValidator.js';

const router = Router();
router
  .post('/signup', validate(uv.signUpVal), checkEmailExistence, signUp)
  .post('/login', validate(uv.logInVal), logIn)
  .post('/changePassword', verfifyToken, changeUserPassword);
export default router;
// user = e-commerce42
// password = WtFtmnWSrcjbf36l