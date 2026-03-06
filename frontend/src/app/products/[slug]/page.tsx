"use client"
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: { url: string; alt: string; isPrimary: boolean }[];
    slug: string;
    mainCategory: string;
    subCategory: string;
    sizes: { size: string, available: boolean }[];
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Reset quantity when size changes
        setQuantity(1);
    }, [selectedSize]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/products/${slug}`;
                const res = await fetch(url).catch(() => null);

                if (res && res.ok) {
                    const result = await res.json();
                    if (result.success) {
                        setProduct(result.data);
                        return;
                    }
                }

                setProduct(null);
            } catch (error) {
                console.error('Error fetching product:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 animate-pulse">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                    <div className="w-full md:w-3/5 lg:w-[65%]">
                        <div className="aspect-[4/5] bg-gray-100" />
                    </div>
                    <div className="w-full md:w-2/5 lg:w-[35%] space-y-6">
                        <div className="h-8 bg-gray-100 w-3/4" />
                        <div className="h-6 bg-gray-100 w-1/4" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-100" />
                            <div className="h-4 bg-gray-100" />
                            <div className="h-4 bg-gray-100 w-2/3" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Product Not Found</h2>
                <Link href="/shop" className="text-sm underline underline-offset-4 uppercase tracking-widest">Back to Shop</Link>
            </div>
        );
    }

    const currentImage = product.images[activeImage]?.url || product.images[0]?.url;
    const hasImage = !!currentImage;

    // Stock for selected size
    const availableStock = selectedSize
        ? (product.sizes.find(s => s.size === selectedSize) as any)?.stock || 0
        : 0;

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
            <nav className="text-[10px] text-gray-500 uppercase tracking-widest mb-8">
                <Link href="/" className="hover:text-black transition-colors">Home</Link> /
                <Link href="/shop" className="hover:text-black transition-colors"> Shop</Link> /
                <Link
                    href={`/shop?mainCategory=${product.mainCategory}${product.subCategory ? `&subCategory=${product.subCategory}` : ''}`}
                    className="hover:text-black transition-colors"
                >
                    {product.subCategory || product.mainCategory}
                </Link> /
                <span className="text-black font-semibold"> {product.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                <div className="w-full md:w-3/5 lg:w-[65%]">
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                        {product.images.length > 1 && (
                            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-visible md:w-20 flex-shrink-0">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`relative aspect-[4/5] bg-gray-50 transition-all duration-300 ${activeImage === i ? 'ring-1 ring-black ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={img.url} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="flex-1 relative aspect-[4/5] md:aspect-[3/4] bg-gray-50 overflow-hidden group">
                            {hasImage ? (
                                <img
                                    src={currentImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-[#888]">
                                    <div className="w-12 h-[1px] bg-gray-300 mb-4" />
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Image not available</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-2/5 lg:w-[35%] flex flex-col pt-4">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-[#111] mb-2">{product.name}</h1>
                        <p className="text-lg font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
                    </div>

                    <div className="mb-10 text-[13px] text-gray-600 leading-relaxed font-light">
                        <p>{product.description}</p>
                    </div>

                    <div className="mb-6 border-t border-[#F0F0F0] pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#111]">Select Size</h3>
                            <button className="text-[10px] text-gray-400 uppercase tracking-widest hover:text-black transition-colors underline underline-offset-4">Size Guide</button>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(sizeName => {
                                const sizeInfo = product.sizes?.find(s => s.size === sizeName);
                                const isAvailable = sizeInfo ? sizeInfo.available && (sizeInfo as any).stock > 0 : false;

                                return (
                                    <button
                                        key={sizeName}
                                        disabled={!isAvailable}
                                        onClick={() => setSelectedSize(sizeName)}
                                        className={`relative h-12 border flex items-center justify-center text-[11px] font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden
                                            ${!isAvailable ? 'opacity-40 cursor-not-allowed border-gray-200 bg-gray-50' :
                                                selectedSize === sizeName ? 'bg-black text-white border-black z-10' :
                                                    'border-[#EAEAEA] text-[#111] hover:border-black hover:scale-[1.02]'}`}
                                    >
                                        <span className="relative z-10">{sizeName}</span>
                                        {!isAvailable && (
                                            <div className="absolute inset-0 z-0">
                                                <div className="absolute top-1/2 left-1/2 w-[140%] h-[1px] bg-gray-400 -translate-x-1/2 -translate-y-1/2 rotate-[135deg]" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {selectedSize && (
                        <div className="mb-8 flex items-center gap-6">
                            <div className="flex items-center border border-[#EAEAEA] h-[50px]">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-4 h-full hover:bg-gray-50 transition-colors text-lg"
                                >
                                    −
                                </button>
                                <span className="w-10 text-center text-xs font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => Math.min(availableStock, q + 1))}
                                    disabled={quantity >= availableStock}
                                    className="px-4 h-full hover:bg-gray-50 transition-colors text-lg disabled:opacity-30"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">
                                {availableStock <= 5 ? `Only ${availableStock} left` : 'In Stock'}
                            </span>
                        </div>
                    )}

                    <div className="flex gap-4 mb-10">
                        <button
                            onClick={() => {
                                if (!selectedSize) {
                                    alert('Please select a size');
                                    return;
                                }
                                if (!product) return;

                                const { addItem, syncWithBackend } = useCartStore.getState();
                                addItem({
                                    id: `${product._id}-${selectedSize}`,
                                    productId: product._id,
                                    name: product.name,
                                    price: product.price,
                                    size: selectedSize,
                                    quantity: quantity,
                                    image: product.images[0]?.url || ''
                                });
                                syncWithBackend();
                            }}
                            className="flex-1 bg-black text-white h-[60px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#222] transition-colors active:scale-[0.98]"
                        >
                            Add to Cart
                        </button>
                        <button className="w-[60px] h-[60px] border border-[#EAEAEA] flex items-center justify-center hover:border-black transition-colors active:scale-[0.98] group">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-black group-hover:stroke-black transition-all">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="border-t border-[#F0F0F0] divide-y divide-[#F0F0F0]">
                        <details className="group">
                            <summary className="py-6 cursor-pointer flex justify-between items-center list-none">
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#111]">Details & Care</span>
                                <span className="text-xl font-light group-open:rotate-45 transition-transform">+</span>
                            </summary>
                            <div className="pb-6 text-[12px] text-gray-500 leading-relaxed space-y-2">
                                <p>• 100% heavyweight premium cotton</p>
                                <p>• Durable double-stitch construction</p>
                                <p>• Cold machine wash, dry flat</p>
                            </div>
                        </details>
                        <details className="group">
                            <summary className="py-6 cursor-pointer flex justify-between items-center list-none">
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#111]">Shipping & Returns</span>
                                <span className="text-xl font-light group-open:rotate-45 transition-transform">+</span>
                            </summary>
                            <div className="pb-6 text-[12px] text-gray-500 leading-relaxed space-y-2">
                                <p>• Free standard shipping on orders over ₹2000</p>
                                <p>• Delivery within 5-7 business days</p>
                                <p>• 14-day hassle-free returns</p>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}
