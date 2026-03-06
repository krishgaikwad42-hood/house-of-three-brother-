import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Product from '../models/Product.model';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const imageMappings = [
    { slug: 'lost-soul-oversized-t-shirt', images: [{ url: '/images/lost-soul.jpg', alt: 'Lost Soul T-Shirt', isPrimary: true }] },
    { slug: 'speed-formula-t-shirt', images: [{ url: '/images/speed.jpg', alt: 'Speed T-Shirt', isPrimary: true }] },
    { slug: 'better-days-black-t-shirt', images: [{ url: '/images/better-days.jpg', alt: 'Better Days T-Shirt', isPrimary: true }] },
    { slug: 'purple-figure-t-shirt', images: [{ url: '/images/purple-figure.jpg', alt: 'Purple Figure T-Shirt', isPrimary: true }] },
    { slug: 'approach-maroon-t-shirt', images: [{ url: '/images/approach.jpg', alt: 'Approach T-Shirt', isPrimary: true }] },
    { slug: 'vintage-wash-jeans', images: [{ url: '/images/jeans-1.jpg', alt: 'Vintage Wash Jeans', isPrimary: true }] },
    { slug: 'classic-denim', images: [{ url: '/images/jeans-2.jpg', alt: 'Classic Denim', isPrimary: true }] },
    { slug: 'light-wash-baggy-jeans', images: [{ url: '/images/jeans-3.jpg', alt: 'Light Wash Baggy Jeans', isPrimary: true }] },
    { slug: 'dark-navy-trousers', images: [{ url: '/images/jeans-4.jpg', alt: 'Dark Navy Trousers', isPrimary: true }] },
    { slug: 'dark-wash-denim', images: [{ url: '/images/jeans-5.jpg', alt: 'Dark Wash Denim', isPrimary: true }] },
    { slug: 'green-striped-shirt', images: [{ url: '/images/shirt-1.jpg', alt: 'Green Striped Shirt', isPrimary: true }] },
    { slug: 'blue-striped-shirt-1', images: [{ url: '/images/shirt-2.jpg', alt: 'Blue Striped Shirt', isPrimary: true }] },
    { slug: 'blue-striped-shirt-2', images: [{ url: '/images/shirt-3.jpg', alt: 'Oxford Blue Stripe', isPrimary: true }] },
    { slug: 'black-floral-shirt', images: [{ url: '/images/shirt-4.jpg', alt: 'Black Floral Shirt', isPrimary: true }] },
    { slug: 'black-embroidered-shirt', images: [{ url: '/images/shirt-5.jpg', alt: 'Black Embroidered Shirt', isPrimary: true }] }
];

const restoreImages = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('MONGODB_URI not found in .env');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for restoration...');

        let updatedCount = 0;
        for (const mapping of imageMappings) {
            const product = await Product.findOne({ slug: mapping.slug });
            if (product) {
                // Only update if images are empty or contain "Image not available" placeholders (though DB shouldn't have been updated with those)
                product.images = mapping.images;
                await product.save();
                updatedCount++;
                console.log(`Updated images for: ${product.name}`);
            } else {
                console.warn(`Product not found for slug: ${mapping.slug}`);
            }
        }

        console.log(`\nRestoration complete! Updated ${updatedCount} products.`);
        process.exit(0);
    } catch (error) {
        console.error('Error during restoration:', error);
        process.exit(1);
    }
};

restoreImages();
