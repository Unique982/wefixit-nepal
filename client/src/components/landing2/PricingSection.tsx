"use client";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="bg-[#f6f7fb] py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-500">
          ✦ PRICING ✦
        </span>
        {/* heading */}
        <h2 className="text-3xl font-bold text-gray-800">
          Transparent Pricing
        </h2>
        <p className="text-gray-500 mt-2">
          Starting prices for our most common repair services.
        </p>

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-14 items-center">
          {/* iPhone Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
            <h3 className="font-semibold text-lg text-gray-800">iPhone</h3>
            <p className="text-sm text-gray-500 mt-1">
              Models: iPhone 6 to 15 Pro Max
            </p>

            <div className="mt-6">
              <span className="text-3xl font-bold text-blue-900">₹ 2,500</span>
              <span className="text-sm text-gray-400 ml-2">starting</span>
            </div>

            <ul className="mt-6 space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <Check size={16} /> Screen: ₹4,500+
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Battery: ₹2,500+
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Back: ₹6,000+
              </li>
            </ul>

            <button className="mt-8 w-full border border-blue-800 text-blue-800 py-2 rounded-lg hover:bg-blue-800 hover:text-white transition">
              Select Model
            </button>
          </div>

          {/* MacBook Highlight Card */}
          <div className="bg-[#1f3a8a] text-white p-10 rounded-2xl shadow-xl scale-105 text-left">
            <h3 className="font-semibold text-lg">MacBook</h3>
            <p className="text-sm text-blue-200 mt-1">
              Air, Pro & various models
            </p>

            <div className="mt-6">
              <span className="text-3xl font-bold">₹ 8,000</span>
              <span className="text-sm text-blue-200 ml-2">starting</span>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Check size={16} /> Display: ₹25,000+
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Board: ₹12,000+
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Keyboard: ₹8,000+
              </li>
            </ul>

            <button className="mt-8 w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
              Get Estimate
            </button>
          </div>

          {/* iPad Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left">
            <h3 className="font-semibold text-lg text-gray-800">iPad</h3>
            <p className="text-sm text-gray-500 mt-1">Pro, Air, Mini & Base</p>

            <div className="mt-6">
              <span className="text-3xl font-bold text-blue-900">₹ 4,500</span>
              <span className="text-sm text-gray-400 ml-2">starting</span>
            </div>

            <ul className="mt-6 space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <Check size={16} /> Glass: ₹6,500+
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Battery: ₹5,500+
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Charging: ₹4,000+
              </li>
            </ul>

            <button className="mt-8 w-full border border-blue-800 text-blue-800 py-2 rounded-lg hover:bg-blue-800 hover:text-white transition">
              Select Model
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
