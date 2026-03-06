import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
}

const productSchema = new mongoose.Schema({
    images: [{
        url: String,
        alt: String,
        isPrimary: Boolean
    }]
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function migrate() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');

        const products = await Product.find({});
        console.log(`Found ${products.length} products`);

        let updatedCount = 0;

        for (const product of products) {
            let changed = false;
            const updatedImages = product.images.map((img: any) => {
                let newUrl = img.url;

                // Case 1: Convert /uploads/ to /images/products/
                if (newUrl.startsWith('/uploads/')) {
                    newUrl = newUrl.replace('/uploads/', '/images/products/');
                    changed = true;
                }

                // Case 2: Ensure /images/ has /products/ suffix if it doesn't already
                else if (newUrl.startsWith('/images/') && !newUrl.startsWith('/images/products/')) {
                    newUrl = newUrl.replace('/images/', '/images/products/');
                    changed = true;
                }

                return { ...img.toObject(), url: newUrl };
            });

            if (changed) {
                product.images = updatedImages;
                await product.save();
                updatedCount++;
            }
        }

        console.log(`Migration complete. ${updatedCount} products updated.`);
        await mongoose.disconnect();
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
