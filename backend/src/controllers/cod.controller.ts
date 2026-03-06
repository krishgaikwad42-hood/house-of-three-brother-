import { Request, Response } from 'express';
import Order from '../models/Order.model';
import { reduceStock } from '../utils/inventory';
import { sendOrderConfirmationEmail } from '../utils/emailService';
import { AuthenticatedRequest } from '../middleware/authenticate';

export const processCodOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ success: false, message: 'Order not found' });
            return;
        }

        if (order.paymentMethod !== 'cod') {
            res.status(400).json({ success: false, message: 'This order is not marked as Cash on Delivery' });
            return;
        }

        // For COD, the order is confirmed immediately but payment remains pending
        order.paymentStatus = 'pending';
        order.orderStatus = 'confirmed';
        await order.save();

        // Reduce stock immediately on confirmation
        await reduceStock(order.items);

        // Send confirmation email
        await sendOrderConfirmationEmail(order);

        res.status(200).json({
            success: true,
            message: 'COD Order confirmed successfully',
            data: order
        });
    } catch (error) {
        console.error('COD Order Error:', error);
        res.status(500).json({ success: false, message: 'Server error while processing COD order' });
    }
};
