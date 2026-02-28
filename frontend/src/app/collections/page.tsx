import { CollectionsSection } from '@/components/home/CollectionsSection';

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-white pb-20 fade-in-section">
            <div className="pt-20 pb-16 text-center px-4">
                <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] text-[#111] mb-6">
                    Curated Collections
                </h1>
                <p className="text-sm text-gray-500 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
                    Discover our tightly edited assortments designed for specific occasions and moods.
                </p>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <CollectionsSection />
            </div>
        </div>
    );
}
