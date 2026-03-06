import Product from '../models/Product.model';

export const reduceStock = async (items: any[]) => {
    for (const item of items) {
        await Product.updateOne(
            { _id: item.product, 'sizes.size': item.size },
            { $inc: { 'sizes.$.stock': -item.quantity } }
        );

        // Check if stock is 0 and mark unavailable
        const updatedProduct = await Product.findById(item.product);
        if (updatedProduct) {
            const variant = updatedProduct.sizes.find((s: any) => s.size === item.size);
            if (variant && variant.stock <= 0) {
                variant.available = false;
                await updatedProduct.save();
            }
        }
    }
};
