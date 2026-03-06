import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.model';
import { reduceStock } from '../utils/inventory';
import { sendOrderConfirmationEmail } from '../utils/emailService';
import { AuthenticatedRequest } from '../middleware/authenticate';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_replace_me',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'replace_me_secret',
});

export const createRazorpayOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            res.status(200).json({ success: false, message: 'Order not found' });
            return;
        }

        const options = {
            amount: Math.round(order.total * 100), // amount in the smallest currency unit (paise for INR)
            currency: 'INR',
            receipt: order.orderNumber,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Save razorpay order id to our order
        order.transactionId = razorpayOrder.id;
        await order.save();

        res.status(200).json({
            success: true,
            data: {
                id: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                key_id: process.env.RAZORPAY_KEY_ID
            }
        });
    } catch (error) {
        console.error('Razorpay Create Order Error:', error);
        res.status(200).json({ success: false, message: 'Server error while creating Razorpay order' });
    }
};

export const verifyRazorpayPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'replace_me_secret')
            .update(body.toString())
            .digest("hex");

        const isSignatureValid = expectedSignature === razorpay_signature;

        if (isSignatureValid) {
            const order = await Order.findOne({ transactionId: razorpay_order_id });

            if (!order) {
                res.status(200).json({ success: false, message: 'Order linked to this payment not found' });
                return;
            }

            order.paymentStatus = 'paid';
            order.orderStatus = 'confirmed'; // Automatically confirm on payment
            await order.save();

            await reduceStock(order.items);
            await sendOrderConfirmationEmail(order);

            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Razorpay Verify Payment Error:', error);
        res.status(200).json({ success: false, message: 'Server error during payment verification' });
    }
};
