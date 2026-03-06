import express from 'express';
import { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, getInvoice } from '../controllers/order.controller';
import { processCodOrder } from '../controllers/cod.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = express.Router();

// All order routes require authentication
router.use(authenticate as any);

// Buyer routes
router.post('/', createOrder as any);
router.post('/cod/confirm', processCodOrder as any);
router.get('/my-orders', getMyOrders as any);
router.get('/:id', getOrderById as any);
router.get('/:id/invoice', getInvoice as any);

// Admin only routes
router.get('/admin/all', authorize('admin') as any, getAllOrders as any);
router.patch('/:id/status', authorize('admin') as any, updateOrderStatus as any);

export default router;
