import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minPurchaseAmount: number;
    maxUses: number;
    usesCount: number;
    validFrom: Date;
    validUntil: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
    {
        code: { type: String, required: true, unique: true, uppercase: true },
        discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
        discountValue: { type: Number, required: true },
        minPurchaseAmount: { type: Number, default: 0 },
        maxUses: { type: Number, default: null }, // null means unlimited
        usesCount: { type: Number, default: 0 },
        validFrom: { type: Date, default: Date.now },
        validUntil: { type: Date, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', couponSchema);
