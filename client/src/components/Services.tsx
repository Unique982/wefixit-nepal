"use client";
import { motion } from "framer-motion";
import {
  Smartphone,
  Laptop,
  Tablet,
  Monitor,
  Watch,
  ArrowRight,
  Star,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

const services = [
  {
    title: "Mobile Repair",
    desc: "I recently had an emergency device issue, and this technician provided quick and reliable service. They arrived promptly and resolved it efficiently.",
    icon: <Smartphone className="w-5 h-5 text-blue-600" />,
    rating: 5.0,
  },
  {
    title: "Laptop Repair",
    desc: "Pro-level hardware diagnostics, thermal paste replacement, and high-speed SSD upgrades to revive your system performance instantly.",
    icon: <Laptop className="w-5 h-5 text-orange-600" />,
    rating: 4.9,
  },
  {
    title: "Tablet & iPad",
    desc: "Professional digitizer bonding and charging port restoration for all generation iPads and Android tablets with original parts.",
    icon: <Tablet className="w-5 h-5 text-purple-600" />,
    rating: 5.0,
  },
  {
    title: "Console Fix",
    desc: "HDMI port replacements and internal cooling system cleaning for PlayStation and Xbox consoles by certified experts.",
    icon: <Monitor className="w-5 h-5 text-green-600" />,
    rating: 4.8,
  },
  {
    title: "Smart Watch",
    desc: "Expert battery replacement and water damage recovery for Apple Watch and high-end wearables with liquid-tight sealing.",
    icon: <Watch className="w-5 h-5 text-red-600" />,
    rating: 5.0,
  },
];

export default function ServiceScroll() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header matching your Testimonials layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-slate-900" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-500">
                Our Specialties
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter">
              Professional Repair Services
            </h2>
          </div>

          {/* Google Rating Style */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Color_Icon.svg"
              alt="Google"
              className="w-8 h-8"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg text-slate-900">4.9</span>
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Customer Satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[350px] md:w-[420px] snap-start bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 uppercase tracking-tighter text-sm">
                    {service.title}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Certified Technician
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed font-medium italic">
                  &quot;{service.desc}&quot;
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase hover:text-blue-800 transition-colors">
                    Book Service <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar & Navigation Info */}
        <div className="flex items-center justify-between mt-8 border-t border-slate-100 pt-8">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
              1/5
            </span>
            <div className="w-48 h-[2px] bg-slate-100 relative rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-slate-900"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          <button className="group flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-slate-900 uppercase">
            View All Services{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
