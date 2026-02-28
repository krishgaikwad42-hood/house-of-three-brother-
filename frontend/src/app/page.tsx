import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CollectionsSection } from '@/components/home/CollectionsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Hero />
      <div className="fade-in-section" style={{ animationDelay: '0.2s' }}>
        <FeaturedProducts />
      </div>
      <div className="fade-in-section" style={{ animationDelay: '0.4s' }}>
        <CollectionsSection />
      </div>

      {/* Brand Story Snippet */}
      <section className="section-padding px-4 text-center max-w-4xl mx-auto fade-in-section" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] leading-relaxed mb-12 text-[#111]">
          "A dedication to minimal luxury, tailored for the modern silhouette. Crafted with uncompromising quality and an editorial eye."
        </h2>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
          — The Brothers
        </p>
      </section>
    </div>
  );
}
