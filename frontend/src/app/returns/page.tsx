import Link from 'next/link';

export default function ReturnsPage() {
    return (
        <div className="max-w-[800px] mx-auto px-4 py-20 md:py-32">
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-12 text-center text-[#111]">
                Returns & <br />Exchanges
            </h1>

            <div className="space-y-12 text-[13px] leading-relaxed text-gray-700 tracking-wide font-light">
                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Our Policy</h2>
                    <p>
                        At House of Three Brothers, we take immense pride in the craftsmanship of our garments.
                        If you are not entirely satisfied with your purchase, we offer a 7-day return and exchange policy from the date of delivery.
                    </p>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Conditions for Return</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Items must be in their original condition: unworn, unwashed, and with all tags attached.</li>
                        <li>The original packaging must be intact.</li>
                        <li>Sale items are eligible for exchange only, unless they are defective.</li>
                        <li>Custom or tailored garments cannot be returned.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">The Process</h2>
                    <p className="mb-4">
                        To initiate a return or exchange, please follow these steps:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Contact our concierge team at support@houseofthreebrothers.com with your order number.</li>
                        <li>Once approved, our logistics partner will arrange a pickup within 48 hours.</li>
                        <li>Upon receiving the garment at our atelier, a quality check will be performed.</li>
                        <li>Refunds will be processed to the original payment method within 7-10 business days.</li>
                    </ol>
                </section>

                <section className="pt-8 border-t border-[#F0F0F0]">
                    <p className="italic text-gray-400">
                        For any further assistance, please contact our support team.
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
