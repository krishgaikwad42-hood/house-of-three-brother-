import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    mainCategory: string;
    subCategory: string;
    price: number;
    compareAtPrice?: number;
    sizes: {
        size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
        stock?: number;
        available: boolean;
    }[];
    images: { url: string; alt: string; isPrimary: boolean }[];
    tags: string[];
    status: 'draft' | 'active' | 'archived';
    instagramPostId?: string;
    instagramUrl?: string;
    seoData?: { title: string; description: string };
    lowStockThreshold: number;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        shortDescription: { type: String, maxlength: 160 },
        mainCategory: { type: String, required: true },
        subCategory: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        compareAtPrice: { type: Number, min: 0 },
        lowStockThreshold: { type: Number, default: 5 },
        sizes: [
            {
                size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
                stock: { type: Number, default: 0, min: 0 },
                available: { type: Boolean, default: true }
            }
        ],
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
productSchema.index({ mainCategory: 1 });
productSchema.index({ subCategory: 1 });
productSchema.index({ status: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
