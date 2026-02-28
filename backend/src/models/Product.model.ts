import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    category: string;
    price: number;
    compareAtPrice?: number;
    stock: {
        XS: number;
        S: number;
        M: number;
        L: number;
        XL: number;
        XXL: number;
    };
    availableSizes: string[];
    images: { url: string; alt: string; isPrimary: boolean }[];
    tags: string[];
    status: 'draft' | 'active' | 'archived';
    instagramPostId?: string;
    instagramUrl?: string;
    seoData?: { title: string; description: string };
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        shortDescription: { type: String, maxlength: 160 },
        category: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        compareAtPrice: { type: Number, min: 0 },
        stock: {
            XS: { type: Number, default: 0 },
            S: { type: Number, default: 0 },
            M: { type: Number, default: 0 },
            L: { type: Number, default: 0 },
            XL: { type: Number, default: 0 },
            XXL: { type: Number, default: 0 },
        },
        availableSizes: [{ type: String }],
        images: [
            {
                url: { type: String, required: true },
                alt: { type: String },
                isPrimary: { type: Boolean, default: false }
            }
        ],
        tags: [{ type: String }],
        status: { type: String, enum: ['draft', 'active', 'archived'], default: 'draft' },
        instagramPostId: { type: String },
        instagramUrl: { type: String },
        seoData: {
            title: { type: String },
            description: { type: String },
        }
    },
    { timestamps: true }
);

productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
