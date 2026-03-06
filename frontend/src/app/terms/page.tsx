export default function TermsPage() {
    return (
        <div className="max-w-[800px] mx-auto px-4 py-20 md:py-32">
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-12 text-center text-[#111]">
                Terms & <br />Conditions
            </h1>

            <div className="space-y-12 text-[13px] leading-relaxed text-gray-700 tracking-wide font-light">
                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Agreement</h2>
                    <p>
                        By accessing and using houseofthreebrothers.com, you agree to comply with and be bound by the following terms and conditions of use.
                    </p>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Orders & Payments</h2>
                    <p>
                        All orders are subject to acceptance and availability.
                        We reserve the right to refuse service or cancel orders at our discretion.
                        Payments are processed securely, and you agree to provide accurate information for all transactions.
                    </p>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Intellectual Property</h2>
                    <p>
                        All content on this website, including designs, images, and text, is the exclusive property of House of Three Brothers
                        and is protected by copyright and intellectual property laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Liability</h2>
                    <p>
                        House of Three Brothers shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our products or website.
                    </p>
                </section>

                <section className="pt-8 border-t border-[#F0F0F0]">
                    <p className="italic text-gray-400">
                        These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts of Mumbai.
                    </p>
                </section>
            </div>
        </div>
    );
}
