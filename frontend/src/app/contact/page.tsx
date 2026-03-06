export default function ContactPage() {
    return (
        <div className="max-w-[1000px] mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row gap-20 lg:gap-32">
            <div className="w-full md:w-1/3">
                <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] mb-12 text-[#111]">
                    Contact <br />Us
                </h1>

                <div className="space-y-10 text-[12px] uppercase tracking-widest text-[#111]">
                    <div>
                        <h2 className="font-bold text-gray-400 mb-2">Concierge</h2>
                        <p>concierge@houseofthreebrothers.com</p>
                        <p>+91 98765 43210</p>
                    </div>

                    <div>
                        <h2 className="font-bold text-gray-400 mb-2">Atelier</h2>
                        <p>Studio 402, Creative Hub</p>
                        <p>Industrial Estate, Mumbai 400011</p>
                    </div>

                    <div>
                        <h2 className="font-bold text-gray-400 mb-2">Hours</h2>
                        <p>Mon — Sat: 10:00 — 18:00 IST</p>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3">
                <p className="text-[13px] text-gray-500 font-light mb-12 tracking-wide">
                    For inquiries regarding orders, sizing, or private appointments, please use the form below.
                    Our team will respond within 24 business hours.
                </p>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                            <input type="text" className="w-full border-b border-[#EAEAEA] py-3 outline-none focus:border-black transition-colors" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                            <input type="email" className="w-full border-b border-[#EAEAEA] py-3 outline-none focus:border-black transition-colors" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Subject</label>
                        <select className="w-full border-b border-[#EAEAEA] py-3 outline-none focus:border-black transition-colors bg-transparent appearance-none">
                            <option>Order Inquiry</option>
                            <option>Sizing Advice</option>
                            <option>Private Appointment</option>
                            <option>Press & Collaborations</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                        <textarea rows={4} className="w-full border-b border-[#EAEAEA] py-3 outline-none focus:border-black transition-colors resize-none"></textarea>
                    </div>

                    <button className="bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] w-full py-6 mt-6 hover:bg-[#222] transition-colors active:scale-[0.99]">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
