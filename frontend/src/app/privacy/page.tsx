export default function PrivacyPage() {
    return (
        <div className="max-w-[800px] mx-auto px-4 py-20 md:py-32">
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-12 text-center text-[#111]">
                Privacy <br />Policy
            </h1>

            <div className="space-y-12 text-[13px] leading-relaxed text-gray-700 tracking-wide font-light">
                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Introduction</h2>
                    <p>
                        House of Three Brothers values your privacy and is committed to protecting your personal data.
                        This policy outlines how we collect, use, and safeguard your information when you visit our website.
                    </p>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Data Collection</h2>
                    <p className="mb-4">We collect information that you provide directly to us, including:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Contact details (Name, Email, Mobile, Address).</li>
                        <li>Payment information (processed securely via our partners).</li>
                        <li>Order history and preferences.</li>
                        <li>Technical data from your device and visits.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">How We Use Your Data</h2>
                    <p>
                        Your information allows us to process orders, personalize your shopping experience,
                        and keep you updated on new collections and exclusive offers (only if you opt-in).
                    </p>
                </section>

                <section>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-4">Security</h2>
                    <p>
                        We implement industry-standard security measures, including SSL encryption,
                        to ensure your personal and payment data is protected from unauthorized access.
                    </p>
                </section>

                <section className="pt-8 border-t border-[#F0F0F0]">
                    <p className="italic text-gray-400">
                        Last updated: March 2024. For queries, email privacy@houseofthreebrothers.com.
                    </p>
                </section>
            </div>
        </div>
    );
}
