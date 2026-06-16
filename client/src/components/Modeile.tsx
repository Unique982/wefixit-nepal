"use client";
import React from "react";
import Image from "next/image";

const autoServices = [
  { title: "Motherboard", image: "/motherboard-repair.jpg" },
  { title: "Back Panel", image: "/backpanel-repair.jpg" },
  { title: "Screen Repair", image: "/screen-repair.jpg" },
  { title: "Battery Fix", image: "/battery-repair.jpg" },
  { title: "Speaker Repair", image: "/speaker-repair.jpg" },
  { title: "Camera Fix", image: "/camera-repair.jpg" },
];

const VisualCard = ({ service }) => (
  <div className="relative h-[220px] w-[160px] md:h-[400px] md:w-[300px] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl flex-shrink-0 group cursor-pointer">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    </div>

    {/* Simple Title Overlay */}
    <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-8">
      <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tighter leading-none">
        {service.title}
      </h3>
    </div>
  </div>
);

export default function AutoImageScroll() {
  return (
    <section className="py-12 bg-white overflow-hidden">
      {/* Header with Orange Accents */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex items-center gap-2 text-orange-500 mb-1">
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Apple Certified
          </span>
        </div>
        <h2 className="text-2xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
          Our Services
        </h2>
      </div>

      {/* Infinite Auto-Scrolling Container */}
      <div className="relative flex overflow-hidden">
        {/* Triple the array to ensure no gaps during the loop */}
        <div className="flex gap-4 md:gap-6 animate-infinite-scroll py-4 px-4">
          {[...autoServices, ...autoServices, ...autoServices].map(
            (item, idx) => (
              <VisualCard key={idx} service={item} />
            ),
          )}
        </div>

        <style jsx global>{`
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-33.33% - 12px));
            }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 25s linear infinite;
          }
          /* Pause on touch/hover for better mobile UX */
          .animate-infinite-scroll:hover,
          .animate-infinite-scroll:active {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
