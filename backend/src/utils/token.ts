import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string, role: string) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_ACCESS_SECRET || 'fallback_access_secret', {
        expiresIn: '30d',
    });
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret', {
        expiresIn: '30d',
    });
};
