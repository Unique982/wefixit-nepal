import React from "react";
import {
  Smartphone,
  Battery,
  Droplets,
  Cpu,
  Keyboard,
  Camera,
  MoveRight,
} from "lucide-react";

const services = [
  {
    title: "Screen Repair",
    description:
      "Original displays for iPhone, iPad, and MacBook with True Tone calibration.",
    icon: <Smartphone className="text-amber-500 w-5 h-5" />,
    iconBg: "bg-amber-50",
    link: "#",
  },
  {
    title: "Battery Replacement",
    description: "High-capacity premium cells with 100% health guaranteed.",
    icon: <Battery className="text-purple-500 w-5 h-5" />,
    iconBg: "bg-purple-50",
    link: "#",
  },
  {
    title: "Water Damage",
    description: "Advanced ultrasonic cleaning and component-level drying.",
    icon: <Droplets className="text-yellow-500 w-5 h-5" />,
    iconBg: "bg-yellow-50",
    link: "#",
  },
  {
    title: "Logic Board Repair",
    description: "Micro-soldering and IC replacement for dead devices.",
    icon: <Cpu className="text-indigo-500 w-5 h-5" />,
    iconBg: "bg-indigo-50",
    link: "#",
  },
  {
    title: "Keyboard & Trackpad",
    description:
      "Fixed butterfly or scissor mechanisms and haptic touch issues.",
    icon: <Keyboard className="text-yellow-500 w-5 h-5" />,
    iconBg: "bg-yellow-50",
    link: "#",
  },
  {
    title: "Camera Fix",
    description:
      "Lens replacement and sensor alignment for crystal clear photos.",
    icon: <Camera className="text-purple-500 w-5 h-5" />,
    iconBg: "bg-purple-50",
    link: "#",
  },
];

const RepairServices = () => {
  return (
    <section className="py-12 px-6 bg-slate-50/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-500">
            ✦ OUR SPECIALTIES✦
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Professional Repair Services
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            From screen replacements to complex motherboard repairs, we cover
            every aspect of your Apple ecosystem.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start"
            >
              {/* Icon Container */}
              <div
                className={`p-3 rounded-xl ${service.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {service.title}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              <a
                href={service.link}
                className="text-blue-600 text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-wider"
              >
                Learn more
                <MoveRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RepairServices;
