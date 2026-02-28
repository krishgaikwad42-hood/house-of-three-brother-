import { Request, Response } from 'express';
import User from '../models/User.model';
import Order from '../models/Order.model';
import { AuthRequest } from '../middleware/authenticate';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.id).select('-password');
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const user = await User.findByIdAndUpdate(req.user?.id, { name }, { new: true }).select('-password');

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const addAddress = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.id);
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

export const deleteAddress = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.id);
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

export const getOrderHistory = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const orders = await Order.find({ user: req.user?.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
