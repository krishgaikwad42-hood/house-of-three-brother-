import Link from 'next/link';

export function CollectionsSection() {
    return (
        <section className="w-full">
            <div className="flex flex-col md:flex-row w-full h-[600px] md:h-[700px]">
                {/* Collection 1 */}
                <Link href="/collections/essentials" className="relative flex-1 group block overflow-hidden">
                    <img
                        src="/api/placeholder/1000/1200"
                        alt="The Essentials Collection"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h2 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">
                            The Essentials
                        </h2>
                        <span className="text-white text-sm uppercase tracking-[0.15em] border-b border-white pb-1">
                            Explore
                        </span>
                    </div>
                </Link>

                {/* Collection 2 */}
                <Link href="/collections/evening" className="relative flex-1 group block overflow-hidden">
                    <img
                        src="/api/placeholder/1000/1200"
                        alt="Evening Collection"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <h2 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-widest mb-4">
                            Evening Formals
                        </h2>
                        <span className="text-white text-sm uppercase tracking-[0.15em] border-b border-white pb-1">
                            Explore
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    );
}
