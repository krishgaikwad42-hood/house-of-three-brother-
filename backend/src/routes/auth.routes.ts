import { Router } from 'express';
import { requestOtp, verifyOtp, getMe, logout, requestAdminOtp, verifyAdminOtp } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/authenticate';

const router = Router();

// ─── Customer Auth Routes ────────────────────────────────────────────
router.post('/request-otp', [
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('mobile').optional().isMobilePhone('any').withMessage('Valid mobile number is required'),
    body().custom((value, { req }) => {
        if (!req.body.email && !req.body.mobile) {
            throw new Error('Email or mobile is required');
        }
        return true;
    })
], validateRequest, requestOtp);

router.post('/verify-otp', [
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be exactly 6 digits'),
    body().custom((value, { req }) => {
        if (!req.body.email && !req.body.mobile) {
            throw new Error('Email or mobile is required');
        }
        return true;
    })
], validateRequest, verifyOtp);

// ─── Admin Auth Routes (role=admin verified server-side) ──────────────
router.post('/admin/request-otp', [
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('mobile').optional().isMobilePhone('any').withMessage('Valid mobile number is required'),
    body().custom((value, { req }) => {
        if (!req.body.email && !req.body.mobile) {
            throw new Error('Email or mobile is required');
        }
        return true;
    })
], validateRequest, requestAdminOtp);

router.post('/admin/verify-otp', [
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be exactly 6 digits'),
    body().custom((value, { req }) => {
        if (!req.body.email && !req.body.mobile) {
            throw new Error('Email or mobile is required');
        }
        return true;
    })
], validateRequest, verifyAdminOtp);

// ─── Session Routes ───────────────────────────────────────────────────
// Get current user via Token stored in httpOnly Cookie
router.get('/me', authenticate, getMe);

// Clear httpOnly cookie to logout
router.post('/logout', authenticate, logout);

export default router;

