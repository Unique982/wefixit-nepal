"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  // Stats data
  const statsData = [
    { val: 10000, label: "REPAIRS DONE" },
    { val: 6800, label: "FOLLOWERS" },
    { val: 94, label: "RECOMMENDED" },
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const intervalTime = 30;
    const increments = statsData.map(
      (stat) => stat.val / (duration / intervalTime),
    );

    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((count, i) => {
          const next = count + increments[i];
          return next >= statsData[i].val ? statsData[i].val : next;
        }),
      );
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Format numbers for display
  const formatNumber = (val: number, label: string) => {
    if (label === "FOLLOWERS" || label === "REPAIRS DONE")
      return val >= 1000 ? (val / 1000).toFixed(1) + "K" : Math.floor(val);
    if (label === "RECOMMENDED") return Math.floor(val) + "%";
    return Math.floor(val);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#f8fafc]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-right"
        >
          <source src="/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
              Precision Apple <br /> Repair in{" "}
              <span className="text-blue-600 italic">Kathmandu</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed max-w-lg">
              Located at the heart of the city in{" "}
              <span className="font-bold text-xl text-yellow-400">
                Ratna Plaza
              </span>
              , WEfixit NEPAL combines state-of-the-art diagnostic technology
              with certified expertise. We specialize in microsoldering, screen
              replacements, and logical board repairs.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {statsData.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-100"
                >
                  <div className="text-orange-500 text-xl font-extrabold">
                    {formatNumber(counts[i], item.label)}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <button className="bg-purple-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                  <Calendar size={18} /> Booking Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
