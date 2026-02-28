import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        // Read token from secure httpOnly cookie OR authorization header as fallback
        let token = req.cookies?.token;

        if (!token && req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            res.status(401).json({ success: false, message: 'Authentication required' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'fallback_access_secret') as { id: string; role: string };

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired session' });
        return;
    }
};
