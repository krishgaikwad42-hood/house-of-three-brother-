import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
    product: mongoose.Types.ObjectId;
    size: string;
    quantity: number;
}

export interface ICart extends Document {
    user: mongoose.Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema<ICart>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        items: [cartItemSchema],
    },
    { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', cartSchema);
