import { Request, Response } from 'express';
import Order from '../models/Order.model';
import Product from '../models/Product.model';
import { reduceStock } from '../utils/inventory';
import { sendOrderConfirmationEmail } from '../utils/emailService';
import { AuthenticatedRequest } from '../middleware/authenticate';

const generateOrderNumber = () => {
    return `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            items,
            shippingAddress,
            billingAddress,
            paymentMethod,
            subtotal,
            shippingFee,
            discount,
            tax,
            total,
            fullName,
            mobile,
            email
        } = req.body;

        const userId = (req as AuthenticatedRequest).user?.id;

        // 1. Validate stock before processing
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                res.status(200).json({ success: false, message: `Product ${item.name} not found` });
                return;
            }

            const sizeVariant = product.sizes.find((s: any) => s.size === item.size);
            if (!sizeVariant || sizeVariant.stock < item.quantity) {
                res.status(400).json({ success: false, message: `Insufficient stock for ${item.name} (${item.size})` });
                return;
            }
        }

        // 2. Create order
        const order = await Order.create({
            user: userId,
            orderNumber: generateOrderNumber(),
            items,
            shippingAddress,
            billingAddress,
            paymentMethod,
            subtotal,
            shippingFee,
            discount,
            tax,
            total,
            fullName,
            mobile,
            email,
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
            orderStatus: 'pending'
        });

        // 3. If COD, we can immediately confirm if desired, or keep as pending
        // The request says: "If COD selected: Mark order as Pending Payment"
        // And "Admin dashboard can update status"

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        console.error('Create Order Error:', error);
        res.status(200).json({ success: false, message: 'Server error while creating order' });
    }
};

export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthenticatedRequest).user.id;
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Get My Orders Error:', error);
        res.status(200).json({ success: false, message: 'Server error while fetching orders' });
    }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = (req as AuthenticatedRequest).user.id;
        const role = (req as AuthenticatedRequest).user.role;

        const order = await Order.findById(id);

        if (!order) {
            res.status(200).json({ success: false, message: 'Order not found' });
            return;
        }

        // Check ownership
        if (role !== 'admin' && order.user?.toString() !== userId) {
            res.status(200).json({ success: false, message: 'Access denied' });
            return;
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error('Get Order Error:', error);
        res.status(200).json({ success: false, message: 'Server error while fetching order' });
    }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email mobile');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Get All Orders Error:', error);
        res.status(200).json({ success: false, message: 'Server error while fetching all orders' });
    }
};

import { generateInvoiceHtml } from '../utils/invoiceTemplate';

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    // ... logic remains same ...
};

export const getInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            res.status(200).json({ success: false, message: 'Order not found' });
            return;
        }

        const html = generateInvoiceHtml(order);
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        console.error('Invoice Error:', error);
        res.status(200).json({ success: false, message: 'Server error generating invoice' });
    }
};
