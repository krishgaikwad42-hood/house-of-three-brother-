import { Request, Response } from 'express';
import Review from '../models/Review.model';
import { AuthenticatedRequest } from '../middleware/authenticate';

export const createReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthenticatedRequest).user.id;
        const { product, rating, comment } = req.body;

        const review = await Review.create({
            user: userId,
            product,
            rating,
            comment,
            isApproved: false // Requires admin approval for enterprise-grade quality control
        });

        res.status(201).json({ success: true, message: 'Review submitted for approval', data: review });
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: 'You have already reviewed this product' });
            return;
        }
        console.error('Create Review Error:', error);
        res.status(200).json({ success: false, message: 'Server error while submitting review' });
    }
};

export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product: productId, isApproved: true })
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error('Get Product Reviews Error:', error);
        res.status(200).json({ success: false, message: 'Server error while fetching reviews' });
    }
};

export const adminApproveReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findByIdAndUpdate(reviewId, { isApproved: true }, { new: true });

        if (!review) {
            res.status(200).json({ success: false, message: 'Review not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'Review approved', data: review });
    } catch (error) {
        console.error('Approve Review Error:', error);
        res.status(200).json({ success: false, message: 'Server error while approving review' });
    }
};
