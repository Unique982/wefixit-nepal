"use client";
import React, { useState } from "react";
import { MoveRight, Phone, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const SectionOne = [
  {
    title: "Screen Repair",
    description:
      "Premium displays for iPhone, iPad, and MacBook with True Tone restoration.",
    stats: ["15+ Models", "30 Min Fix", "Original LCD", "Certified Tech"],
    image: "/screenrepair.jpg",
    link: "#",
  },
  {
    title: "Battery Repair",
    description:
      "High-capacity premium cells with 100% health guaranteed for Apple devices.",
    stats: ["Genuine Cells", "Instant Fit", "Warranty", "Health 100%"],
    image: "/batteryrepair.jpg",
    link: "#",
  },
];

const SectionTwo = [
  {
    title: "Water Damage",
    description:
      "Advanced ultrasonic cleaning and component-level drying for liquid recovery.",
    stats: ["Data Recovery", "Board Fix", "IC Drying", "90% Success"],
    image: "/water repair.jpg",
    link: "#",
  },
  {
    title: "Speaker Repair",
    description:
      "Advanced diagnostics and component-level repair for clear, crack-free sound.",
    stats: [
      "Sound Restoration",
      "Microphone & Speaker Fix",
      "Water & Dust Safe",
      "High Success Rate",
    ],
    image: "/speaker repair.jpg",
    link: "#",
  },
  {
    title: "Camera Fix",
    description:
      "Lens replacement and sensor alignment for crystal clear photography.",
    stats: ["Crystal Clear", "Focus Fix", "Original Lens", "Sensor Clean"],
    image: "/camera repair.jpg",
    link: "#",
  },
];
const SectionThree = [
  {
    title: "Back Panel Repair",
    description:
      "Precision replacement and restoration for cracked or damaged back panels.",
    stats: [
      "Glass & Frame Replacement",
      "Scratch & Dent Fix",
      "Durable Finish",
      "High Quality & Reliable",
    ],
    image: "/back panel.jpg",
  },
  {
    title: "Motherboard",
    description:
      "Expert-level diagnostics and repair for malfunctioning mother boards",
    stats: [
      "Component-Level Fixes",
      "Data & Function Recovery",
      "Short-Circuit & Overheat Solutions",
      "High Success Rate",
    ],
    image: "/mother.jpg",
  },
];

const ServiceCard = ({ service }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onClick={() => setIsActive(!isActive)}
      className={`group relative h-[450px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-700 cursor-pointer border border-white/5 ${isActive ? "ring-2 ring-pink-500/40 scale-[0.98]" : ""}`}
    >
      {/* Background Image & Master Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className={`object-cover transition-transform duration-1000 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
        />
        {/* Dynamic Black Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-500 ${isActive ? "via-black/80 opacity-100" : "opacity-90 group-hover:via-black/80"}`}
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end p-8">
        <h3
          className={`text-2xl font-black text-white mb-3 tracking-tighter transition-all duration-500 ${isActive ? "-translate-y-2" : "group-hover:-translate-y-2"}`}
        >
          {service.title}
        </h3>

        {/* Revealable Details: Desktop Hover & Mobile Tap */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 group-hover:max-h-[400px] group-hover:opacity-100"}`}
        >
          <p className="text-gray-300 text-xs leading-relaxed mb-6 font-medium line-clamp-2">
            {service.description}
          </p>

          {/* Bulleted Stats Grid with Pink Dots */}
          <div className="grid grid-cols-2 gap-y-3 mb-8 border-t border-white/10 pt-6">
            {service.stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                  {stat}
                </span>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between group/btn pt-2">
            <span className="text-white font-black text-[11px] uppercase tracking-[0.2em] group-hover/btn:text-pink-400 transition-colors">
              Explore Now
            </span>
            <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(219,39,119,0.4)] transition-transform group-hover/btn:scale-110">
              <MoveRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RepairServices() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header - Fixed Spacing */}
        <div className="text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-orange-500">
            <span className="text-xs">✦</span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Apple Certified Solutions
            </span>
            <span className="text-xs">✦</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Professional Repair Services
          </h2>
          <p className="max-w-lg mx-auto text-slate-500 text-sm font-medium">
            Expert maintenance and hardware recovery in Kathmandu.
          </p>
        </div>

        {/* Row 1: 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SectionOne.map((item, idx) => (
            <ServiceCard key={idx} service={item} />
          ))}
        </div>

        {/* Row 2: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SectionTwo.map((item, idx) => (
            <ServiceCard key={idx} service={item} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SectionThree.map((item, idx) => (
            <ServiceCard key={idx} service={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
