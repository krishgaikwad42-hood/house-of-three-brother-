import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Product from '../models/Product.model';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const products = [
    // T-Shirts (using placeholders based on your descriptions)
    {
        name: 'LOST SOUL OVERSIZED T-SHIRT',
        slug: 'lost-soul-oversized-t-shirt',
        description: 'Premium white oversized t-shirt with bird graphic and star detail.',
        shortDescription: 'Premium white oversized t-shirt.',
        category: 'T-Shirts',
        price: 699,
        stock: { XS: 10, S: 15, M: 20, L: 15, XL: 10, XXL: 5 },
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: [{ url: '/images/lost-soul.jpg', alt: 'Lost Soul T-Shirt', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'SPEED FORMULA CREAM T-SHIRT',
        slug: 'speed-formula-t-shirt',
        description: 'Cream/Off-white t-shirt featuring a vintage racing car graphic.',
        shortDescription: 'Off-white graphic t-shirt.',
        category: 'T-Shirts',
        price: 799,
        stock: { XS: 10, S: 15, M: 20, L: 15, XL: 10, XXL: 5 },
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: [{ url: '/images/speed.jpg', alt: 'Speed T-Shirt', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'BETTER DAYS BLACK GRAPHIC T-SHIRT',
        slug: 'better-days-black-t-shirt',
        description: 'Heavyweight black t-shirt with "Better Days" script and glowing star design.',
        shortDescription: 'Black graphic t-shirt.',
        category: 'T-Shirts',
        price: 899,
        stock: { XS: 10, S: 15, M: 20, L: 15, XL: 10, XXL: 5 },
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: [{ url: '/images/better-days.jpg', alt: 'Better Days T-Shirt', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'PURPLE FIGURE VINTAGE T-SHIRT',
        slug: 'purple-figure-t-shirt',
        description: 'Faded purple wash t-shirt with artistic figure graphic.',
        shortDescription: 'Faded purple graphic t-shirt.',
        category: 'T-Shirts',
        price: 999,
        stock: { XS: 10, S: 15, M: 20, L: 15, XL: 10, XXL: 5 },
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: [{ url: '/images/purple-figure.jpg', alt: 'Purple Figure T-Shirt', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'APPROACH MAROON BOX-FIT T-SHIRT',
        slug: 'approach-maroon-t-shirt',
        description: 'Maroon heavyweight cotton t-shirt with technical "APPROACH" branding.',
        shortDescription: 'Maroon box-fit t-shirt.',
        category: 'T-Shirts',
        price: 749,
        stock: { XS: 10, S: 15, M: 20, L: 15, XL: 10, XXL: 5 },
        availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: [{ url: '/images/approach.jpg', alt: 'Approach T-Shirt', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'VINTAGE WASH RELAXED JEANS',
        slug: 'vintage-wash-jeans',
        description: 'Light blue vintage wash relaxed fit denim jeans.',
        shortDescription: 'Relaxed fit light wash jeans.',
        category: 'Jeans',
        price: 1499,
        stock: { 28: 10, 30: 15, 32: 20, 34: 15, 36: 10 },
        availableSizes: ['28', '30', '32', '34', '36'],
        images: [{ url: '/images/jeans-1.jpg', alt: 'Vintage Wash Jeans', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'CLASSIC STRAIGHT FIT DENIM',
        slug: 'classic-denim',
        description: 'Mid-blue classic straight fit denim pants.',
        shortDescription: 'Straight fit blue jeans.',
        category: 'Jeans',
        price: 1299,
        stock: { 28: 10, 30: 15, 32: 20, 34: 15, 36: 10 },
        availableSizes: ['28', '30', '32', '34', '36'],
        images: [{ url: '/images/jeans-2.jpg', alt: 'Classic Denim', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'LIGHT WASH BAGGY JEANS',
        slug: 'light-wash-baggy-jeans',
        description: 'Loose baggy fit jeans in a light wash finish.',
        shortDescription: 'Baggy fit light wash jeans.',
        category: 'Jeans',
        price: 1599,
        stock: { 28: 10, 30: 15, 32: 20, 34: 15, 36: 10 },
        availableSizes: ['28', '30', '32', '34', '36'],
        images: [{ url: '/images/jeans-3.jpg', alt: 'Light Wash Baggy Jeans', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'DARK NAVY OVERSIZED TROUSERS',
        slug: 'dark-navy-trousers',
        description: 'Oversized dark navy blue trousers in a heavy cotton blend.',
        shortDescription: 'Oversized navy trousers.',
        category: 'Jeans',
        price: 1399,
        stock: { 28: 10, 30: 15, 32: 20, 34: 15, 36: 10 },
        availableSizes: ['28', '30', '32', '34', '36'],
        images: [{ url: '/images/jeans-4.jpg', alt: 'Dark Navy Trousers', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'RAW DARK WASH SELVEDGE DENIM',
        slug: 'dark-wash-denim',
        description: 'Premium dark wash raw denim in a tapered fit.',
        shortDescription: 'Dark wash tapered jeans.',
        category: 'Jeans',
        price: 1699,
        stock: { 28: 10, 30: 15, 32: 20, 34: 15, 36: 10 },
        availableSizes: ['28', '30', '32', '34', '36'],
        images: [{ url: '/images/jeans-5.jpg', alt: 'Dark Wash Denim', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'ESSENTIAL PIQUE POLO',
        slug: 'essential-pique-polo',
        description: 'A classic pique polo shirt made from breathable cotton mesh. Features a ribbed collar and cuffs with a two-button placket.',
        shortDescription: 'Essential cotton pique polo.',
        category: 'Polo',
        price: 1299,
        stock: { S: 20, M: 25, L: 30, XL: 20 },
        availableSizes: ['S', 'M', 'L', 'XL'],
        images: [{ url: '/images/essentials.png', alt: 'Essential Polo', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'SIGNATURE STRIPED POLO',
        slug: 'signature-striped-polo',
        description: 'Sporty striped polo shirt with a modern fit. Crafted from soft cotton with a hint of stretch for comfort.',
        shortDescription: 'Signature striped cotton polo.',
        category: 'Polo',
        price: 1499,
        stock: { S: 15, M: 20, L: 25, XL: 15 },
        availableSizes: ['S', 'M', 'L', 'XL'],
        images: [{ url: '/images/essentials.png', alt: 'Striped Polo', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'LUXE COTTON MESH POLO',
        slug: 'luxe-cotton-mesh-polo',
        description: 'Premium cotton mesh polo with a luxurious feel. Features a refined silhouette and sophisticated color palette.',
        shortDescription: 'Luxe cotton mesh polo.',
        category: 'Polo',
        price: 1699,
        stock: { S: 10, M: 15, L: 20, XL: 10 },
        availableSizes: ['S', 'M', 'L', 'XL'],
        images: [{ url: '/images/essentials.png', alt: 'Luxe Polo', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'PREMIUM GREEN STRIPED SHIRT',
        slug: 'green-striped-shirt',
        description: 'A premium green and white striped button-down shirt crafted from high-quality poplin cotton. Features a semi-spread collar and adjustable cuffs.',
        shortDescription: 'Green striped formal shirt.',
        category: 'Shirts',
        price: 1899,
        stock: { S: 10, M: 15, L: 20, XL: 15 },
        availableSizes: ['S', 'M', 'L', 'XL'],
        images: [{ url: '/images/shirt-1.jpg', alt: 'Green Striped Shirt', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'CLASSIC BLUE STRIPED BUTTON-DOWN',
        slug: 'blue-striped-shirt-1',
        description: 'Timeless blue striped shirt with a classic fit. Perfect for business casual or weekend wear. Features a button-down collar.',
        shortDescription: 'Classic blue striped shirt.',
        category: 'Shirts',
        price: 1999,
        stock: { S: 10, M: 15, L: 20, XL: 15 },
        availableSizes: ['S', 'M', 'L', 'XL'],
        images: [{ url: '/images/shirt-2.jpg', alt: 'Blue Striped Shirt', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'ELEVATED OXFORD BLUE STRIPE',
        slug: 'blue-striped-shirt-2',
        description: 'Elevated oxford shirt with a fine blue stripe detail. Heavier weight fabric with a soft, durable finish.',
        shortDescription: 'Blue stripe oxford shirt.',
        category: 'Shirts',
        price: 2199,
        stock: { S: 10, M: 15, L: 20, XL: 15 },
        availableSizes: ['S', 'M', 'L', 'XL'],
        images: [{ url: '/images/shirt-3.jpg', alt: 'Oxford Blue Stripe', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'MIDNIGHT FLORAL PRINT SHIRT',
        slug: 'black-floral-shirt',
        description: 'Lightweight black shirt with contrasting white floral print. Ideal for evening outings and coastal vacations.',
        shortDescription: 'Black floral print shirt.',
        category: 'Shirts',
        price: 1799,
        stock: { S: 10, M: 15, L: 20, XL: 15 },
        availableSizes: ['S', 'M', 'L', 'XL'],
        images: [{ url: '/images/shirt-4.jpg', alt: 'Black Floral Shirt', isPrimary: true }],
        status: 'active'
    },
    {
        name: 'NOCTURNAL EMBROIDERED SHIRT',
        slug: 'black-embroidered-shirt',
        description: 'Statement black shirt featuring intricate tonal embroidery on the chest and sleeves. A unique piece for special occasions.',
        shortDescription: 'Black embroidered shirt.',
        category: 'Shirts',
        price: 2499,
        stock: { S: 10, M: 15, L: 20, XL: 15 },
        availableSizes: ['S', 'M', 'L', 'XL'],
        images: [{ url: '/images/shirt-5.jpg', alt: 'Black Embroidered Shirt', isPrimary: true }],
        status: 'active'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB for seeding...');

        await Product.deleteMany({});
        console.log('Clear existing products');

        await Product.insertMany(products);
        console.log('Successfully seeded database with products');

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
