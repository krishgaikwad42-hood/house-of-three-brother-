import Link from 'next/link';

// Mock data
const mockFeatured = [
    { id: '1', name: 'OVERSIZED LINEN SHIRT', price: 4999, image: '/api/placeholder/400/500', slug: 'oversized-linen-shirt' },
    { id: '2', name: 'TAILORED WOOL TROUSERS', price: 7999, image: '/api/placeholder/400/500', slug: 'tailored-wool-trousers' },
    { id: '3', name: 'CASHMERE BLEND SWEATER', price: 12999, image: '/api/placeholder/400/500', slug: 'cashmere-blend-sweater' },
    { id: '4', name: 'TEXTURED COTTON BLAZER', price: 15999, image: '/api/placeholder/400/500', slug: 'textured-cotton-blazer' },
];

export function FeaturedProducts() {
    return (
        <section className="section-padding px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
            <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] text-center mb-20 text-[#111]">
                New Arrivals
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {mockFeatured.map((product) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer block">
                        <div className="premium-img-wrapper aspect-[4/5] object-cover mb-6">
                            <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                                className="premium-img"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
                                <span className="bg-white text-black text-[11px] font-bold px-8 py-4 uppercase tracking-[2px] shadow-sm">
                                    Quick View
                                </span>
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#111] line-clamp-1">
                                {product.name}
                            </h3>
                            <p className="text-[13px] font-medium text-gray-600">₹{product.price.toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-20 flex justify-center">
                <Link
                    href="/shop"
                    className="text-[13px] font-bold uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-black transition-all pb-1 inline-flex items-center group text-[#111]"
                >
                    View Complete Collection <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                </Link>
            </div>
        </section>
    );
}
