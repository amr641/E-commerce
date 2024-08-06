import { Router } from 'express';
import * as rc from '../controllers/reviewController.js';
import validate from '../middlewares/validate.js';
import * as rv from '../../utils/validators/categoryValidator.js';
import {
  allowedTo,
  protectRoutes,
} from '../middlewares/auth/auth.controller.js';
import { verfifyToken } from '../middlewares/verifiyToken.js';
import { roles } from '../../utils/roles.js';

import {
  authReview,
  checkReviewUniqueness,
} from '../middlewares/helpers/helpers.js';

const router = Router();

router
  .post(
    '/',
    verfifyToken,
    protectRoutes,
    checkReviewUniqueness,
    allowedTo(roles.USER),
    rc.addReview
  )
  .get('/', rc.getAllReviews)
  .get('/:id', rc.getReview)
  .patch(
    '/:id',
    verfifyToken,
    protectRoutes,
    allowedTo(roles.USER),
    authReview,
    rc.updateReview
  )
  .delete('/:id', allowedTo(roles.USER, roles.ADMIN), rc.deleteReview);
export default router;
