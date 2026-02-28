import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-[#111] fade-in-section">
            <section className="section-padding max-w-[800px] mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] mb-12">
                    Our Story
                </h1>

                <div className="space-y-8 text-sm md:text-base leading-relaxed tracking-wide text-gray-700">
                    <p>
                        Founded on the principles of uncompromising quality and minimal aesthetics, House of Three Brothers
                        was established to redefine modern luxury menswear. We believe that true elegance lies in simplicity,
                        impeccable tailoring, and the finest materials.
                    </p>
                    <p>
                        Every piece in our collection is thoughtfully designed to transcend seasonal trends,
                        offering a timeless wardrobe for the discerning individual. From the drape of our linen shirts
                        to the exact cut of our wool trousers, our commitment to detail is absolute.
                    </p>
                    <p>
                        We strip away the excess to focus on what truly matters: silhouette, fabric, and finishing.
                        This is not just clothing; it is an editorial approach to everyday dressing.
                    </p>
                </div>

                <div className="mt-20">
                    <Link
                        href="/shop"
                        className="h-[56px] border border-[#EAEAEA] px-12 uppercase tracking-[0.2em] text-[11px] font-bold text-[#111] hover:border-[#111] hover:bg-black hover:text-white transition-all duration-300 inline-flex items-center justify-center"
                    >
                        Explore The Collection
                    </Link>
                </div>
            </section>
        </div>
    );
}
