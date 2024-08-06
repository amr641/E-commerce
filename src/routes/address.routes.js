import { Router } from 'express';
import * as ac from '../controllers/address.controller.js';
import { verfifyToken } from '../middlewares/verifiyToken.js';

import {
  allowedTo,
  protectRoutes,
} from '../middlewares/auth/auth.controller.js';
import { roles } from '../../utils/roles.js';
import validate from '../middlewares/validate.js';
import * as av from '../../utils/validators/addressValidator.js';


const router = Router();
router
  .use(verfifyToken)
  .use(protectRoutes)
  .patch(
    '/',
    allowedTo(roles.USER),
    validate(av.addAddressVal),
    ac.updateAddress
  )
  .delete(
    '/:address',
    allowedTo(roles.USER, roles.ADMIN),
    validate(av.removeAddressVal),
    ac.removeFromAddress
  )
  .get(
    '/',
    allowedTo(roles.USER),
    ac.getUserAddress
  );

export default router;
