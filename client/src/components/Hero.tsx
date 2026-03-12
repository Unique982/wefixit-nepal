"use client";
import { ArrowRight, Shield, Zap, Award, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const stats = [
    { icon: <Zap size={20} />, title: "Fast Repair", desc: "24-48 Hours" },
    { icon: <Shield size={20} />, title: "Warranty", desc: "90-Day Coverage" },
    { icon: <Award size={20} />, title: "Certified", desc: "Expert Techs" },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center bg-slate-950 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/download.jpg"
          alt="Workshop"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent md:bg-gradient-to-r md:from-slate-950 md:via-slate-950/90" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-6 py-12">
        <div className="max-w-4xl">
          {/* Label */}
          <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-6">
            Professional Tech Support
          </p>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-4 tracking-tight">
            We Fix It Right, <br />
            <span className="text-blue-500 italic font-serif">Every Time.</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-2xl max-w-2xl mb-8 leading-relaxed font-light">
            From smartphones to laptops, our certified technicians deliver fast,
            reliable repairs with a satisfaction guarantee.
          </p>

          {/* --- NEW: TRUSTED REVIEWS SECTION --- */}
          <div className="flex flex-wrap items-center gap-6 mb-10 animate-in fade-in slide-in-from-left duration-700">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative h-12 w-12 rounded-full border-2 border-slate-950 overflow-hidden bg-slate-800 shadow-xl"
                >
                  <Image
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-white text-sm font-bold">
                4.9/5{" "}
                <span className="text-slate-400 font-normal ml-1">
                  from 2,000+ reviews
                </span>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mb-16">
            <Link
              href="/services"
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-5 px-10 rounded-xl transition-all shadow-xl shadow-blue-900/40 hover:-translate-y-1 active:scale-95 group"
            >
              Our Services{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/track"
              className="flex items-center justify-center border-2 border-white/10 hover:border-blue-500 text-white font-extrabold py-5 px-10 rounded-xl transition-all bg-white/5 backdrop-blur-md hover:-translate-y-1 active:scale-95"
            >
              Track Your Repair
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 bg-slate-900/40 border border-white/5 p-5 rounded-2xl backdrop-blur-xl hover:bg-slate-800/60 transition-colors"
              >
                <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_50px_2px_rgba(59,130,246,0.3)]" />
    </section>
  );
}
