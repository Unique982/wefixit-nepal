"use client";

import {
  ShieldCheck,
  Award,
  Shield,
  Leaf,
  CheckCircle2,
  MoveRight,
} from "lucide-react";

export default function AdvantageSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Side: Feature Cards */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-6">
          {/* Genuine Parts */}
          <div className="bg-[#EEF2FF] p-8 rounded-3xl flex flex-col items-start min-h-[280px]">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm">
              <ShieldCheck className="text-[#1D35FF]" size={28} />
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
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Award className="text-[#00D1FF]" size={28} />
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
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm">
              <Shield className="text-[#6366F1]" size={28} />
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
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Leaf className="text-[#10B981]" size={28} />
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
        <div className="lg:w-1/2">
          <p className="text-[#00D1FF] text-xs font-bold uppercase tracking-widest mb-6">
            The WeFixit Advantage
          </p>

          <h2 className="text-[#0B1221] text-4xl lg:text-5xl font-black mb-8 leading-tight">
            Why Thousands Trust Us With Their Apple Devices
          </h2>

          <p className="text-[#64748B] text-lg leading-relaxed mb-10">
            Since 2012, WeFixit Nepal has been the pioneer in third-party Apple
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
