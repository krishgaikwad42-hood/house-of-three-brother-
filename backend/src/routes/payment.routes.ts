import express from 'express';
import { createRazorpayOrder, verifyRazorpayPayment } from '../controllers/payment.controller';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.use(authenticate as any);

router.post('/razorpay/create', createRazorpayOrder as any);
router.post('/razorpay/verify', verifyRazorpayPayment as any);

export default router;
