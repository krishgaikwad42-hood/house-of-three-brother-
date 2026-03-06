import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.model';
import { localProducts } from '../utils/localData';

// Public generic filter/pagination logic
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { mainCategory, subCategory, size, minPrice, maxPrice, sort, page = 1, limit = 1000 } = req.query;

        let query: any = { status: 'active' };

        if (mainCategory) query.mainCategory = mainCategory;
        if (subCategory && subCategory !== 'undefined') query.subCategory = subCategory;
        if (size) query.sizes = { $elemMatch: { size: size, available: true } };
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let sortOption: any = { createdAt: -1 };
        if (sort === 'price_asc') sortOption = { price: 1 };
        if (sort === 'price_desc') sortOption = { price: -1 };
        if (sort === 'oldest') sortOption = { createdAt: 1 };

        const skip = (Number(page) - 1) * Number(limit);

        if (mongoose.connection.readyState !== 1) {
            // Apply filtering to local products for better UX in offline mode
            let filteredLocal = [...localProducts];
            if (mainCategory) {
                const searchCat = String(mainCategory).toUpperCase();
                filteredLocal = filteredLocal.filter(p => p.mainCategory.toUpperCase() === searchCat);
            }
            if (subCategory && subCategory !== 'undefined') {
                const searchSub = String(subCategory).toUpperCase();
                filteredLocal = filteredLocal.filter(p => p.subCategory.toUpperCase() === searchSub);
            }

            res.status(200).json({
                success: true,
                data: filteredLocal,
                message: 'Database not connected. Using real-product offline mode.',
                pagination: { total: filteredLocal.length, page: 1, pages: 1 }
            });
            return;
        }

        let [products, total] = await Promise.all([
            Product.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
            Product.countDocuments(query)
        ]);

        // Fallback to local products if database is empty and no specific filtering is applied
        if (products.length === 0 && !mainCategory && !subCategory) {
            products = localProducts.slice(0, Number(limit)) as any;
            total = localProducts.length;
        }

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / Number(limit))
            }
        });
    } catch (error: any) {
        console.error('Get Products Error:', error);
        res.status(200).json({ success: false, message: error.message || 'Server error' });
    }
};

export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        if (mongoose.connection.readyState !== 1) {
            const localProduct = localProducts.find(p => p.slug === req.params.slug);
            if (localProduct) {
                res.status(200).json({ success: true, data: localProduct, message: 'Offline mode' });
            } else {
                res.status(200).json({ success: false, message: 'Product not found in offline mode' });
            }
            return;
        }
        const product = await Product.findOne({ slug: req.params.slug, status: 'active' });
        if (!product) {
            res.status(200).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, data: product });
    } catch (error: any) {
        res.status(200).json({ success: false, message: error.message || 'Server error' });
    }
};

// Admin routes
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        if (mongoose.connection.readyState !== 1) {
            res.status(503).json({ success: false, message: 'Database disconnected' });
            return;
        }
        const productData = { ...req.body };

        // Handle images from multer
        if (req.files && Array.isArray(req.files)) {
            const uploadedImages = req.files.map((file: any, index: number) => ({
                url: `/images/products/${file.filename}`,
                alt: productData.name || 'Product Image',
                isPrimary: index === 0 && !productData.images // Set first as primary if no images provided
            }));

            // If images were also sent as JSON in body, merge them
            const existingImages = productData.images ? (typeof productData.images === 'string' ? JSON.parse(productData.images) : productData.images) : [];
            productData.images = [...existingImages, ...uploadedImages];
        } else if (typeof productData.images === 'string') {
            productData.images = JSON.parse(productData.images);
        }

        // Parse sizes if sent as string (from FormData)
        if (typeof productData.sizes === 'string') {
            productData.sizes = JSON.parse(productData.sizes);
        }

        const product = await Product.create(productData);
        res.status(201).json({ success: true, data: product });
    } catch (error: any) {
        console.error('Create Product Error:', error);
        res.status(200).json({ success: false, message: error.message || 'Server error' });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        if (mongoose.connection.readyState !== 1) {
            res.status(503).json({ success: false, message: 'Database disconnected' });
            return;
        }
        const productData = { ...req.body };

        // Handle images from multer
        if (req.files && Array.isArray(req.files)) {
            const uploadedImages = req.files.map((file: any) => ({
                url: `/images/products/${file.filename}`,
                alt: productData.name || 'Product Image',
                isPrimary: false
            }));

            // Merge with existing images if they weren't fully replaced
            const existingImages = productData.images ? (typeof productData.images === 'string' ? JSON.parse(productData.images) : productData.images) : [];
            productData.images = [...existingImages, ...uploadedImages];
        } else if (typeof productData.images === 'string') {
            productData.images = JSON.parse(productData.images);
        }

        // Parse sizes if sent as string
        if (typeof productData.sizes === 'string') {
            productData.sizes = JSON.parse(productData.sizes);
        }

        const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
        if (!product) {
            res.status(200).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, data: product });
    } catch (error: any) {
        console.error('Update Product Error:', error);
        res.status(200).json({ success: false, message: error.message || 'Server error' });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        if (mongoose.connection.readyState !== 1) {
            res.status(503).json({ success: false, message: 'Database disconnected' });
            return;
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(200).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error: any) {
        res.status(200).json({ success: false, message: error.message || 'Server error' });
    }
};

export const searchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { q } = req.query;
        if (!q) {
            res.status(200).json({ success: true, data: [] });
            return;
        }

        if (mongoose.connection.readyState !== 1) {
            // Offline/Disconnected search fallback to empty for now
            res.status(200).json({ success: true, data: [] });
            return;
        }

        const query = {
            status: 'active',
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { mainCategory: { $regex: q, $options: 'i' } },
                { subCategory: { $regex: q, $options: 'i' } }
            ]
        };

        const products = await Product.find(query).limit(10).select('name slug price images mainCategory subCategory');
        res.status(200).json({ success: true, data: products });
    } catch (error: any) {
        console.error('Search Products Error:', error);
        res.status(200).json({ success: false, message: 'Server error during search' });
    }
};
