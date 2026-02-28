import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative w-full h-[85vh] md:h-screen bg-black">
            {/* Background Image with LCP optimization */}
            <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
                alt="House of Three Brothers Campaign"
                className="absolute inset-0 w-full h-full object-cover opacity-80 contrast-110 brightness-90 saturate-0"
                fetchPriority="high"
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 fade-in-section">
                <h1 className="text-white text-[3rem] md:text-[5rem] font-bold uppercase tracking-[0.15em] leading-tight mb-6">
                    House of Three Brothers
                </h1>
                <p className="text-[#EAEAEA] text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-12 max-w-2xl">
                    Minimal luxury editorial fashion aesthetic.
                </p>
                <Link
                    href="/shop"
                    className="h-[56px] bg-white text-black min-w-[200px] flex items-center justify-center uppercase tracking-[2px] text-[13px] font-bold transition-all duration-300 hover:bg-black hover:text-white border border-transparent hover:border-white"
                >
                    Explore Collection
                </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}
