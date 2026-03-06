import mongoose, { Document, Schema } from 'mongoose';
import { IAddress } from './User.model';

export interface IOrderItem {
    product: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
}

export interface IOrder extends Document {
    user?: mongoose.Types.ObjectId;
    guestEmail?: string;
    orderNumber: string;
    items: IOrderItem[];
    shippingAddress: IAddress;
    billingAddress: IAddress;
    paymentMethod: 'razorpay' | 'cod';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    transactionId?: string;
    orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    subtotal: number;
    shippingFee: number;
    discount: number;
    tax: number;
    total: number;
    fullName: string;
    mobile: string;
    email: string;
    couponCode?: string;
    trackingNumber?: string;
    courierPartner?: string;
    createdAt: Date;
    updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, required: true },
    image: { type: String },
});

const orderSchema = new Schema<IOrder>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        guestEmail: { type: String },
        orderNumber: { type: String, required: true, unique: true },
        items: [orderItemSchema],
        shippingAddress: { type: Schema.Types.Mixed, required: true },
        billingAddress: { type: Schema.Types.Mixed, required: true },
        paymentMethod: { type: String, enum: ['razorpay', 'cod'], required: true },
        paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
        transactionId: { type: String },
        orderStatus: { type: String, enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
        subtotal: { type: Number, required: true },
        shippingFee: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        tax: { type: Number, required: true },
        total: { type: Number, required: true },
        fullName: { type: String, required: true },
        mobile: { type: String, required: true },
        email: { type: String, required: true },
        couponCode: { type: String },
        trackingNumber: { type: String },
        courierPartner: { type: String },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
