import Link from 'next/link';

export function CollectionsSection() {
    return (
        <section className="w-full">
            <div className="flex flex-col md:flex-row w-full h-[600px] md:h-[700px]">
                {/* Collection 1 */}
                <Link href="/shop?mainCategory=Shirts" className="relative flex-1 group block overflow-hidden bg-[#1a1a1a]">
                    <img
                        src="/images/essentials.png"
                        alt="The Essentials"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
                        <h2 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-6">
                            The Essentials
                        </h2>
                        <span className="text-white text-xs uppercase tracking-[0.3em] border-b border-white/30 pb-2 group-hover:border-white transition-colors duration-300">
                            Explore Collection
                        </span>
                    </div>
                </Link>

                {/* Collection 2 */}
                <Link href="/shop?mainCategory=Polos" className="relative flex-1 group block overflow-hidden bg-[#252525]">
                    <img
                        src="/images/evening.png"
                        alt="Signature Polos"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20">
                        <h2 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-6">
                            Signature Polos
                        </h2>
                        <span className="text-white text-xs uppercase tracking-[0.3em] border-b border-white/30 pb-2 group-hover:border-white transition-colors duration-300">
                            Explore Collection
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    );
}
