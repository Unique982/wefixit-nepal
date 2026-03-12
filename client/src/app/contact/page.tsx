import React from "react";
import Image from "next/image";

const ContactHero = () => {
  return (
    <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden flex items-center bg-white">
      {/* Background Image - Human Tech Focused */}
      <div className="absolute inset-0 z-0 lg:left-[30%]">
        <Image
          // High-quality image showing human hands doing precision repair
          src="https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1600&q=80"
          alt="Precision electronic repair"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Sophisticated White Gradient Overlay 
          From solid white on the left to transparent on the right 
      */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/90 to-transparent w-full md:w-[80%]" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-16 w-full">
        <div className="flex flex-col gap-4">
          {/* Breadcrumb - Clean & Muted */}
          <nav className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-widest uppercase text-slate-400">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">
              Home
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600">Contact Us</span>
          </nav>

          {/* Main Heading - Heavy, Premium Typography */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F172A] tracking-tighter leading-none">
            Get in <span className="text-blue-600">Touch.</span>
          </h1>

          <p className="max-w-md text-slate-500 text-lg font-medium leading-relaxed">
            Have a broken device or a custom project? Reach out to our
            technicians in Kathmandu.
          </p>
        </div>
      </div>

      {/* Glassmorphism Decorative Elements */}
      <div className="absolute left-[-5%] top-1/4 w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] z-10 pointer-events-none" />
      <div className="absolute left-[10%] bottom-0 w-40 h-40 bg-slate-100/80 rounded-full blur-[80px] z-10 pointer-events-none" />
    </section>
  );
};

export default ContactHero;
