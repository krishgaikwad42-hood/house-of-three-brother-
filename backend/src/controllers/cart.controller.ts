import { Request, Response } from 'express';
import Cart from '../models/Cart.model';
import { AuthenticatedRequest } from '../middleware/authenticate';

export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthenticatedRequest).user.id;
        let cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        console.error('Get Cart Error:', error);
        res.status(200).json({ success: false, message: 'Server error while fetching cart' });
    }
};

export const syncCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthenticatedRequest).user.id;
        const { items } = req.body; // Array of { product: id, size: string, quantity: number }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Professional Merging Logic:
        // We iterate through the incoming items and update or add them to the existing cart.
        for (const newItem of items) {
            const existingItemIndex = cart.items.findIndex(
                (item: any) => item.product.toString() === newItem.product && item.size === newItem.size
            );

            if (existingItemIndex > -1) {
                // Update quantity (optionally we could cap it at stock here, but better to do in a separate validation)
                cart.items[existingItemIndex].quantity = newItem.quantity;
            } else {
                cart.items.push(newItem);
            }
        }

        await cart.save();
        const populatedCart = await cart.populate('items.product');

        res.status(200).json({ success: true, data: populatedCart });
    } catch (error) {
        console.error('Sync Cart Error:', error);
        res.status(200).json({ success: false, message: 'Server error while syncing cart' });
    }
};

export const clearCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthenticatedRequest).user.id;
        await Cart.findOneAndDelete({ user: userId });
        res.status(200).json({ success: true, message: 'Cart cleared' });
    } catch (error) {
        console.error('Clear Cart Error:', error);
        res.status(200).json({ success: false, message: 'Server error while clearing cart' });
    }
};
