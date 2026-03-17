"use client";
import { Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1a134d] rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Need Expert Device Repair?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10">
            Book your repair today and let our certified technicians fix your
            device quickly and reliably. Fast service, transparent pricing, and
            premium parts guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 flex-wrap">
            <a
              href="tel:+18002368937"
              className="inline-flex items-center justify-center gap-2 px-10 sm:px-16 py-3 sm:py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg hover:bg-orange-600 transition text-sm sm:text-base"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>

            <a
              href="/book-repair"
              className="px-10 sm:px-16 py-3 sm:py-4 bg-white text-[#1a134d] font-bold rounded-2xl shadow-lg hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Book Online
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
