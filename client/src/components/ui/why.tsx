"use client";

import { CheckCircle2, MoveRight } from "lucide-react";

export default function AdvantageSection() {
  return (
    <section className="py-12 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Side: Feature Cards */}
        {/* Added grid-cols-1 for mobile, sm:grid-cols-2 for desktop */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
          {/* Genuine Parts */}
          <div className="bg-[#EEF2FF] p-8 rounded-3xl flex flex-col items-start min-h-[280px]">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm overflow-hidden">
              <img
                src="https://img.freepik.com/premium-vector/genuine-parts-gold-label-with-gear-carbon-kevlar-texture-icon-logo-label-etc-vector_567423-1353.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Genuine Parts"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[#0B1221] font-bold text-xl mb-3">
              Genuine Parts
            </h4>
            <p className="text-[#64748B] text-sm leading-relaxed">
              No cheap clones. We only use original or highest-grade OEM parts.
            </p>
          </div>

          {/* Certified Techs */}
          <div className="bg-[#E0F7FA] p-8 rounded-3xl flex flex-col items-start min-h-[240px]">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLmthdnBRZYRDYj9Vbt7TdUdmZDQzE-ynE_A&s"
                alt="Certified Techs"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[#0B1221] font-bold text-xl mb-3">
              Certified Techs
            </h4>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Our experts are Apple-certified with 10+ years of micro-repair
              experience.
            </p>
          </div>

          {/* 6-Mo Warranty */}
          <div className="bg-[#ECFDF5] p-8 rounded-3xl flex flex-col items-start min-h-[240px]">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm overflow-hidden">
              <img
                src="https://static.vecteezy.com/system/resources/previews/024/455/476/non_2x/6-months-warranty-rubber-stamp-vector.jpg"
                alt="Warranty"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[#0B1221] font-bold text-xl mb-3">
              6-Mo Warranty
            </h4>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Peace of mind with our no-questions-asked warranty on all
              replacements.
            </p>
          </div>

          {/* Eco-Friendly */}
          <div className="bg-[#ECFDF5] p-8 rounded-3xl flex flex-col items-start min-h-[240px]">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9xF6ZGXbSCM7bsDHNyAyaqzZX9F-_RWi7Nfhu8UrM7A&s"
                alt="Eco-Friendly"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[#0B1221] font-bold text-xl mb-3">
              Eco-Friendly
            </h4>
            <p className="text-[#64748B] text-sm leading-relaxed">
              We repair instead of replacing whole units, reducing electronic
              waste.
            </p>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <span className="text-orange-500 font-bold text-xs tracking-widest uppercase flex gap-1 mb-2">
            ✦ The WeFixit Advantage ✦
          </span>
          <h2 className="text-[#0B1221] text-3xl sm:text-4xl lg:text-5xl font-black mb-8 leading-tight">
            Why Thousands Trust Us With Their in all Apple Products
          </h2>
          <p className="text-[#64748B] text-lg leading-relaxed mb-10">
            Since 2018, WeFixit Nepal has been the pioneer in third-party Apple
            repairs. We don't just swap parts; we understand the engineering
            behind every iPhone and MacBook.
          </p>
          <ul className="space-y-5 mb-12">
            {[
              "Free Diagnostic Check",
              "No Fix, No Fee Policy",
              "100% Data Privacy Guaranteed",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-[#0B1221] font-bold"
              >
                <CheckCircle2 size={24} className="text-[#1D35FF]" />
                {item}
              </li>
            ))}
          </ul>
          <button className="text-[#1D35FF] font-black text-lg flex items-center gap-2 group">
            Explore Our Standards
            <MoveRight className="transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
