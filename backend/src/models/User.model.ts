import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export interface IUser extends Document {
    name?: string;
    email?: string;
    mobile?: string;
    role: 'customer' | 'admin';
    addresses: IAddress[];
    isEmailVerified: boolean;
    isMobileVerified: boolean;
    googleId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const addressSchema = new Schema<IAddress>({
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
});

const userSchema = new Schema<IUser>(
    {
        name: { type: String, trim: true },
        email: { type: String, unique: true, sparse: true, lowercase: true },
        mobile: { type: String, unique: true, sparse: true },
        role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
        addresses: [addressSchema],
        isEmailVerified: { type: Boolean, default: false },
        isMobileVerified: { type: Boolean, default: false },
        googleId: { type: String },
    },
    { timestamps: true }
);

// Prevent saving without at least one contact method
userSchema.pre('save', function (next: any) {
    if (!this.email && !this.mobile) {
        next(new Error("A user must have either an email or a mobile number."));
    } else {
        next();
    }
});

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
