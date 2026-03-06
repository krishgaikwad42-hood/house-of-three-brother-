import { Router } from 'express';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, searchProducts } from '../controllers/product.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

import { upload } from '../middleware/upload.middleware';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:slug', getProductBySlug);

// Admin routes
router.use(authenticate, authorize('admin'));
router.post('/', upload.array('images', 10), createProduct);
router.put('/:id', upload.array('images', 10), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
