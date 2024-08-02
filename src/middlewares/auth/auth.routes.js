import { Router } from 'express';
import { changeUserPassword, logIn, signUp } from './auth.controller.js';
import { checkEmailExistence } from '../checkEmailExist.js';
import { verfifyToken } from '../verifiyToken.js';

const router = Router();
router.post('/signup', checkEmailExistence, signUp).post('/login', logIn).use(verfifyToken).post('/changePassword',changeUserPassword);
export default router;
