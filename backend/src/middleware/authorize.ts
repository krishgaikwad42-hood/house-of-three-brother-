import { Request, Response, NextFunction } from 'express';

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user;
        if (!user) {
            res.status(200).json({ success: false, message: 'Authentication required' });
            return;
        }

        if (!roles.includes(user.role)) {
            res.status(200).json({ success: false, message: 'Forbidden: Insufficient permissions' });
            return;
        }

        next();
    };
};
