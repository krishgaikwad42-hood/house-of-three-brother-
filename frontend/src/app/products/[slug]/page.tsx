import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'OVERSIZED LINEN SHIRT | House of Three Brothers',
    description: 'Premium oversized linen shirt tailored to perfection.',
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    // In a real app we'd fetch based on params.slug. Using mock data here.
    const product = {
        name: 'OVERSIZED LINEN SHIRT',
        price: 4999,
        description: 'Crafted from premium European linen, this oversized shirt features a relaxed drop shoulder and a dramatic curved hem. The fabric has been garment-dyed for a unique, lived-in texture that softens with every wear.',
        images: ['/api/placeholder/800/1000', '/api/placeholder/800/1000', '/api/placeholder/800/1000'],
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true
    };

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

            {/* Breadcrumb */}
            <nav className="text-xs text-gray-500 uppercase tracking-widest mb-8">
                Home / Shop / Shirts / <span className="text-black font-semibold">{product.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row gap-12 lg:gap-20">

                {/* Left: Image Gallery */}
                <div className="w-full md:w-3/5 lg:w-[65%]">
                    <div className="flex flex-col-reverse md:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-visible md:w-20 flex-shrink-0">
                            {product.images.map((img, i) => (
                                <button key={i} className={`relative aspect-[4/5] bg-gray-100 ${i === 0 ? 'border border-black' : 'border border-transparent'}`}>
                                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 relative aspect-[4/5] md:aspect-[3/4] bg-gray-100 cursor-zoom-in">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="w-full md:w-2/5 lg:w-[35%] flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.08em] mb-4">{product.name}</h1>
                    <p className="text-xl md:text-2xl font-semibold mb-6">₹{product.price.toLocaleString()}</p>

                    <p className="text-sm text-gray-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="mb-8 border-t border-[#EAEAEA] pt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold uppercase tracking-widest">Size</h3>
                            <button className="text-xs text-gray-500 underline underline-offset-4 hover:text-black">Size Guide</button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                            {product.sizes.map(size => (
                                <button key={size} className="h-12 border border-[#EAEAEA] flex items-center justify-center text-sm uppercase tracking-widest hover:border-black transition-colors focus:border-black focus:bg-black focus:text-white">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 mb-10">
                        <button className="flex-1 btn-primary h-14 text-sm md:text-base tracking-[0.15em]">
                            Add to Cart
                        </button>
                        <button className="w-14 h-14 border border-[#EAEAEA] flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    </div>

                    {/* Accordions */}
                    <div className="border-t border-[#EAEAEA] divide-y divide-[#EAEAEA]">
                        <div className="py-5 cursor-pointer flex justify-between items-center group">
                            <span className="text-xs font-semibold uppercase tracking-widest group-hover:text-gray-600 transition-colors">Details & Care</span>
                            <span className="text-xl font-light">+</span>
                        </div>
                        <div className="py-5 cursor-pointer flex justify-between items-center group">
                            <span className="text-xs font-semibold uppercase tracking-widest group-hover:text-gray-600 transition-colors">Shipping & Returns</span>
                            <span className="text-xl font-light">+</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
