import { Request, Response } from 'express';
import Wishlist from '../models/Wishlist.model';
import { AuthenticatedRequest } from '../middleware/authenticate';

export const getWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthenticatedRequest).user.id;
        const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
        res.status(200).json({ success: true, data: wishlist || { user: userId, products: [] } });
    } catch (error) {
        console.error('Get Wishlist Error:', error);
        res.status(200).json({ success: false, message: 'Server error while fetching wishlist' });
    }
};

export const toggleWishlist = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthenticatedRequest).user.id;
        const { productId } = req.body;

        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            wishlist = await Wishlist.create({ user: userId, products: [productId] });
        } else {
            const index = wishlist.products.indexOf(productId);
            if (index > -1) {
                wishlist.products.splice(index, 1);
            } else {
                wishlist.products.push(productId);
            }
            await wishlist.save();
        }

        res.status(200).json({ success: true, message: 'Wishlist updated', data: wishlist });
    } catch (error) {
        console.error('Toggle Wishlist Error:', error);
        res.status(200).json({ success: false, message: 'Server error while updating wishlist' });
    }
};
