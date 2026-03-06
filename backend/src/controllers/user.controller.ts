import { Request, Response } from 'express';
import User from '../models/User.model';
import Order from '../models/Order.model';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const userId = (req as any).user?.id;
        const user = await User.findByIdAndUpdate(userId, { name }, { new: true }).select('-password');

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const addAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        user.addresses.push(req.body);
        await user.save();

        res.status(201).json({ success: true, data: user.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        user.addresses = user.addresses.filter((addr: any) => addr._id?.toString() !== req.params.addressId);
        await user.save();

        res.status(200).json({ success: true, data: user.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getOrderHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id;
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
