"use client";
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
            {/* Storefront Background Image - Full Screen Cover */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero.png"
                    alt="House of Three Brothers Storefront"
                    className="w-full h-full object-cover object-center animate-subtle-zoom"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
                {/* Premium Dark Gradient Overlay (40-60% opacity for readability) */}
                <div className="absolute inset-0 bg-black/50 z-10" />
            </div>

            {/* Hero Content - Centered Vertically & Horizontally */}
            <div className="relative z-20 text-center px-6 max-w-5xl mx-auto animate-fade-in">
                <div className="space-y-6">
                    <h1 className="text-white text-[2.5rem] md:text-[5.5rem] font-bold uppercase tracking-[0.25em] leading-tight drop-shadow-lg">
                        HOUSE OF <span className="text-[#D4AF37]">THREE BROTHERS</span>
                    </h1>

                    <div className="flex items-center justify-center gap-6">
                        <div className="h-[1px] w-8 md:w-16 bg-white/30" />
                        <p className="text-white/90 text-xs md:text-sm font-bold uppercase tracking-[0.4em]">
                            Premium Fashion Collection
                        </p>
                        <div className="h-[1px] w-8 md:w-16 bg-white/30" />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                        <Link
                            href="/shop"
                            className="group relative h-[60px] min-w-[200px] bg-[#D4AF37] text-white flex items-center justify-center uppercase tracking-[3px] text-[11px] font-black transition-all duration-500 hover:bg-white hover:text-black overflow-hidden shadow-xl"
                        >
                            <span className="relative z-10">Shop Now</span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>

                        <Link
                            href="/collections"
                            className="h-[60px] min-w-[200px] border-2 border-white/50 text-white flex items-center justify-center uppercase tracking-[3px] text-[11px] font-black transition-all duration-500 hover:bg-white hover:text-black backdrop-blur-md"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </div>

            {/* Premium Scroll Indicator */}
            <div className="absolute bottom-10 flex flex-col items-center gap-4 z-20">
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-bounce" />
            </div>

            <style jsx>{`
                .animate-subtle-zoom {
                    animation: subtle-zoom 20s ease-out infinite alternate;
                    filter: contrast(1.05) brightness(1.1);
                }
                @keyframes subtle-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.05); }
                }
                .animate-fade-in {
                    animation: fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </section>
    );
}
