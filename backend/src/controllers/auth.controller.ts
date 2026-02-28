import { Request, Response } from 'express';
import User from '../models/User.model';
import Otp from '../models/Otp.model';
import { generateAccessToken } from '../utils/token';

// Helper to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const requestOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, mobile } = req.body;

        if (!email && !mobile) {
            res.status(400).json({ success: false, message: 'Email or mobile is required' });
            return;
        }

        // Check rate limiting (max 3 unused OTPs in the last 5 minutes)
        const recentAttempts = await Otp.countDocuments({
            $or: [{ email }, { mobile }],
            createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) }
        });

        if (recentAttempts >= 3) {
            res.status(429).json({ success: false, message: 'Too many OTP requests. Please try again later.' });
            return;
        }

        const otpCode = generateOTP();

        await Otp.create({
            email,
            mobile,
            otp: otpCode
        });

        // IN PRODUCTION: Integrate with SendGrid or Twilio here
        // For development, we log it to the console
        console.log(`[DEV OTP] For ${email || mobile}: ${otpCode}`);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            // ONLY RETURN OTP IN DEVELOPMENT, REMOVE THIS IN PROD
            ...(process.env.NODE_ENV !== 'production' && { devOtp: otpCode })
        });
    } catch (error) {
        console.error('Request OTP Error:', error);
        res.status(500).json({ success: false, message: 'Server error while generating OTP' });
    }
};

// ═══════════════════════════════════════════════
// ADMIN-ONLY OTP REQUEST — Only sends if role=admin
// ═══════════════════════════════════════════════
export const requestAdminOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, mobile } = req.body;

        if (!email && !mobile) {
            res.status(400).json({ success: false, message: 'Email or mobile is required' });
            return;
        }

        // SECURITY: Silently verify admin exists before sending OTP (prevents enumeration)
        const adminUser = await User.findOne({ $or: [{ email }, { mobile }], role: 'admin' });

        if (!adminUser) {
            // Return success message regardless to prevent email/mobile enumeration
            res.status(200).json({ success: true, message: 'If this admin account exists, an OTP has been sent.' });
            return;
        }

        // Rate limiting: max 3 requests per 5 minutes
        const recentAttempts = await Otp.countDocuments({
            $or: [{ email }, { mobile }],
            createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) }
        });

        if (recentAttempts >= 3) {
            res.status(429).json({ success: false, message: 'Too many OTP requests. Please wait 5 minutes.' });
            return;
        }

        const otpCode = generateOTP();
        await Otp.create({ email, mobile, otp: otpCode });

        // IN PRODUCTION: Send via SendGrid / Twilio
        console.log(`[ADMIN DEV OTP] For ${email || mobile}: ${otpCode}`);

        res.status(200).json({
            success: true,
            message: 'If this admin account exists, an OTP has been sent.',
            ...(process.env.NODE_ENV !== 'production' && { devOtp: otpCode })
        });
    } catch (error) {
        console.error('Admin Request OTP Error:', error);
        res.status(500).json({ success: false, message: 'Server error while generating OTP' });
    }
};

// ═══════════════════════════════════════════════
// ADMIN-ONLY OTP VERIFY — Blocks if role != admin
// ═══════════════════════════════════════════════
export const verifyAdminOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, mobile, otp } = req.body;

        if ((!email && !mobile) || !otp) {
            res.status(400).json({ success: false, message: 'Email/Mobile and OTP are required' });
            return;
        }

        const otpRecord = await Otp.findOne({ $or: [{ email }, { mobile }] }).sort({ createdAt: -1 });

        if (!otpRecord) {
            res.status(400).json({ success: false, message: 'OTP expired or not found. Please request a new one.' });
            return;
        }

        // Max 5 attempts for admin
        if (otpRecord.attempts >= 5) {
            await Otp.deleteOne({ _id: otpRecord._id });
            res.status(400).json({ success: false, message: 'Too many invalid attempts. Request a new OTP.' });
            return;
        }

        if (otpRecord.otp !== otp) {
            otpRecord.attempts += 1;
            await otpRecord.save();
            const remaining = 5 - otpRecord.attempts;
            res.status(400).json({ success: false, message: `Invalid OTP. ${remaining} attempt(s) remaining.` });
            return;
        }

        // CRITICAL: Verify the authenticated user actually has admin role
        const user = await User.findOne({ $or: [{ email }, { mobile }], role: 'admin' });

        if (!user) {
            await Otp.deleteOne({ _id: otpRecord._id });
            res.status(403).json({ success: false, message: 'Access denied. Admin privileges required.' });
            return;
        }

        // Clean up used OTP
        await Otp.deleteOne({ _id: otpRecord._id });

        // Generate 30-day JWT
        const accessToken = generateAccessToken(user.id, user.role);

        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Admin Verify OTP Error:', error);
        res.status(500).json({ success: false, message: 'Server error while verifying OTP' });
    }
};



export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, mobile, otp } = req.body;

        if ((!email && !mobile) || !otp) {
            res.status(400).json({ success: false, message: 'Email/Mobile and OTP are required' });
            return;
        }

        // Find the most recent OTP for this user
        const otpRecord = await Otp.findOne({
            $or: [{ email }, { mobile }]
        }).sort({ createdAt: -1 });

        if (!otpRecord) {
            res.status(400).json({ success: false, message: 'OTP expired or not found' });
            return;
        }

        if (otpRecord.attempts >= 3) {
            await Otp.deleteOne({ _id: otpRecord._id });
            res.status(400).json({ success: false, message: 'Too many invalid attempts. Request a new OTP.' });
            return;
        }

        if (otpRecord.otp !== otp) {
            otpRecord.attempts += 1;
            await otpRecord.save();
            res.status(400).json({ success: false, message: 'Invalid OTP' });
            return;
        }

        // Valid OTP! Find or create user
        let user = await User.findOne({ $or: [{ email }, { mobile }] });

        if (!user) {
            // Register new user
            user = await User.create({
                email,
                mobile,
                isEmailVerified: !!email,
                isMobileVerified: !!mobile,
                role: 'customer'
            });
        } else {
            // Update verify status if logging in with previously unverified method
            if (email && !user.isEmailVerified) user.isEmailVerified = true;
            if (mobile && !user.isMobileVerified) user.isMobileVerified = true;
            await user.save();
        }

        // Delete the used OTP
        await Otp.deleteOne({ _id: otpRecord._id });

        // Generate JWT
        const accessToken = generateAccessToken(user.id, user.role);

        // Security: Set httpOnly cookie linking session to browser, surviving refreshes
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days persistently logged in
        });

        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role
            }
            // Notice: We do NOT send the token in the JSON body for maximum XSS protection
        });
    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ success: false, message: 'Server error while verifying OTP' });
    }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        const authReq = req as any; // Cast safely for TS since authenticate middleware injects this
        const user = await User.findById(authReq.user?.id).select('-__v');

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during logout' });
    }
};
