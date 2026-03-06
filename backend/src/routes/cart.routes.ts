import express from 'express';
import { getCart, syncCart, clearCart } from '../controllers/cart.controller';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.use(authenticate as any);

router.get('/', getCart as any);
router.post('/sync', syncCart as any);
router.delete('/', clearCart as any);

export default router;
