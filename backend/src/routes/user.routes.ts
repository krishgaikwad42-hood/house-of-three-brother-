import { Router } from 'express';
import { getProfile, updateProfile, addAddress, deleteAddress, getOrderHistory } from '../controllers/user.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.use(authenticate);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/addresses', addAddress);
router.delete('/addresses/:addressId', deleteAddress);
router.get('/orders', getOrderHistory);

export default router;
