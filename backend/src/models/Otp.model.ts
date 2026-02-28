import mongoose, { Document, Schema } from 'mongoose';

export interface IOtp extends Document {
    email?: string;
    mobile?: string;
    otp: string;
    attempts: number;
    createdAt: Date;
}

const otpSchema = new Schema<IOtp>({
    email: { type: String, lowercase: true, trim: true },
    mobile: { type: String, trim: true },
    otp: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now, expires: 300 } // Auto-delete doc after 300 seconds (5 mins)
});

// Ensure at least one contact method is provided
otpSchema.pre('save', function (next: any) {
    if (!this.email && !this.mobile) {
        next(new Error("Either email or mobile must be provided for OTP generation."));
    } else {
        next();
    }
});

export default mongoose.models.Otp || mongoose.model<IOtp>('Otp', otpSchema);
