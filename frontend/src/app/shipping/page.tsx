import Link from 'next/link';

export default function ShippingPage() {
    return (
        <div className="max-w-[800px] mx-auto px-4 py-20 md:py-32">
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-12 text-center text-[#111]">
                Shipping <br />Information
            </h1>

            <div className="space-y-12 text-[13px] leading-relaxed text-gray-700 tracking-wide font-light">
                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Domestic Shipping</h2>
                    <p>
                        We offer complimentary standard shipping on all orders within India.
                        Each garment is carefully inspected and packaged in our signature HTB boxes to ensure it reaches you in pristine condition.
                    </p>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Timeline</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Standard Shipping:</strong> 5-7 business days.</li>
                        <li><strong>Express Shipping:</strong> 2-3 business days (Available at checkout).</li>
                        <li><strong>Made-to-Order:</strong> 12-15 business days for production + shipping.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Tracking</h2>
                    <p>
                        Once your order is dispatched, you will receive an email and SMS with your tracking details.
                        You can also track your order through the "Account" section on our website.
                    </p>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">International Shipping</h2>
                    <p>
                        We currently ship to over 50 countries globally. International shipping rates and duties are calculated at checkout based on your location and order volume.
                    </p>
                </section>

                <section className="pt-8 border-t border-[#F0F0F0]">
                    <p className="italic text-gray-400">
                        Delivery times are estimates and may vary due to external factors such as weather or logistics delays.
                    </p>
                </section>
            </div>

            <div className="mt-20 text-center">
                <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
