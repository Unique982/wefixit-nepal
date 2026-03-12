import React from "react";
import Image from "next/image";
import { Settings, ShieldCheck, Clock, Star } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-12 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 order-2 lg:order-1">
          <div className="space-y-3 sm:space-y-4">
            <div className="relative rounded-tr-[60px] md:rounded-tr-[100px] overflow-hidden h-48 sm:h-64 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=500"
                alt="Tech repair"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative rounded-br-[60px] md:rounded-br-[100px] overflow-hidden h-48 sm:h-64 shadow-sm">
              <Image
                src="https://themes.envytheme.com/fixo/wp-content/uploads/2023/11/banner-4.webp"
                alt="Tablet repair"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-12">
            <div className="relative rounded-bl-[60px] md:rounded-bl-[100px] overflow-hidden h-48 sm:h-64 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=500"
                alt="Electronics"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative rounded-tl-[60px] md:rounded-tl-[100px] overflow-hidden h-48 sm:h-64 shadow-sm">
              <Image
                src="https://themes.envytheme.com/fixo/wp-content/uploads/2023/11/banner-4.webp"
                alt="Soldering"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col space-y-6 order-1 lg:order-2">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-xs tracking-widest uppercase flex items-center gap-1">
              ✦ ABOUT US ✦
            </span>
          </div>

          <h2 className="text-3xl md:text-[42px] font-extrabold text-[#0F172A] leading-[1.1] tracking-tight">
            Empowering Your Devices:
            <br className="hidden sm:block" />
            <span className="text-slate-700"> Crafting Solutions</span>
          </h2>

          <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed max-w-lg">
            Welcome to our shop, where technology meets expertise. With a
            passion for problem-solving and a dedication to exceptional service,
            we bring your dead electronics back to life.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Settings className="w-6 h-6" />
              </div>
              <span className="font-bold text-[#0F172A] text-sm">
                Expert Technicians
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="font-bold text-[#0F172A] text-sm">
                Quality Repairs
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Clock className="w-6 h-6" />
              </div>
              <span className="font-bold text-[#0F172A] text-sm">
                Quick Turnaround
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Star className="w-6 h-6" />
              </div>
              <span className="font-bold text-[#0F172A] text-sm">
                Highly Rated
              </span>
            </div>
          </div>

          <p className="text-slate-500 text-[14px] leading-relaxed pt-6 border-t border-slate-100">
            Our mission is to provide reliable, efficient, and affordable repair
            services, ensuring that your devices are restored to optimal
            functionality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
