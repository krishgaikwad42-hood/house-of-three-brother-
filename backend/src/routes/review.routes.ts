import express from 'express';
import { createReview, getProductReviews, adminApproveReview } from '../controllers/review.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = express.Router();

// Public routes
router.get('/product/:productId', getProductReviews as any);

// Protected routes
router.post('/', authenticate as any, createReview as any);

// Admin routes
router.patch('/:reviewId/approve', authenticate as any, authorize('admin') as any, adminApproveReview as any);

export default router;
