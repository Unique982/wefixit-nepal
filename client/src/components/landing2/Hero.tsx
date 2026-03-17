import React from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#f8fafc]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-eaCIdQbCBHrrdDtTAdi6E1URjZi2vCbp7Zq02OueEaET2wHNydEazWuJdCQxNQ9Iisr5WrceJhZH5IhfhfXNxYkvtjScsYdABnc-LE654hmfFb0zHRCUbSeGA-J6qSmw5ftCcN7wi0tFJSCVqAFLUyd43agUcxxI4w6IBOCbpegTL80l9_w6mjl8kHSgg17GdCoqsX3QLcEbhSuCLNGCUB2Zq1r7RAnLCnSXJALMSIvMMfNe4aUw2OYqPCLlJEdRuuQp3vfUptoE"
          alt="Technician"
          fill
          priority
          className="object-cover object-right"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
      </div>

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold ">
              <span className="bg-blue-600 text-white w-4 h-4 flex items-center justify-center rounded-full text-[9px]">
                ✓
              </span>
              Authorized Quality
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Precision Apple <br />
              Repair in <span className="text-blue-600 italic">Kathmandu</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed max-w-lg">
              Located at the heart of the city in{" "}
              <span className="font-semibold text-slate-800">Ratna Plaza</span>,
              WEfixit NEPAL combines state-of-the-art diagnostic technology with
              certified expertise. We specialize in microsoldering, screen
              replacements, and logical board repairs.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { val: "390+", label: "REPAIRS DONE" },
                { val: "6.8K", label: "FOLLOWERS" },
                { val: "94%", label: "RECOMMENDED" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-100"
                >
                  <div className="text-blue-600 text-xl font-extrabold">
                    {item.val}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                <Calendar size={18} />
                Schedule Visit
              </button>

              <button className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition">
                Our Process
              </button>
            </div>
          </div>

          {/* RIGHT FLOATING CARD */}
          <div className="hidden lg:flex justify-center relative">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white max-w-sm">
              {/* Fake laptop image */}
              <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
                  alt="MacBook"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                <div>
                  <p className="font-semibold text-slate-800 text-sm">
                    Ratna Plaza
                  </p>
                  <p className="text-xs text-slate-500">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
