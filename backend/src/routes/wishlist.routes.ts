import express from 'express';
import { getWishlist, toggleWishlist } from '../controllers/wishlist.controller';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.use(authenticate as any);

router.get('/', getWishlist as any);
router.post('/toggle', toggleWishlist as any);

export default router;
