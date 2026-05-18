"use client";

import React from "react";
import {
  CalendarCheck,
  Microscope,
  Wrench,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    id: "Book",
    num: "1",
    desc: "Online or via phone",
    color: "bg-blue-600",
    icon: <CalendarCheck className="text-white" size={32} />,
  },
  {
    id: "Diagnose",
    num: "2",
    desc: "Under the microscope",
    color: "bg-purple-600",
    icon: <Microscope className="text-white" size={32} />,
  },
  {
    id: "Repair",
    num: "3",
    desc: "Genuine part install",
    color: "bg-pink-600",
    icon: <Wrench className="text-white" size={32} />,
  },
  {
    id: "Test",
    num: "4",
    desc: "30-point quality check",
    color: "bg-[#00D1FF]",
    icon: <FileCheck className="text-white" size={32} />,
  },
  {
    id: "Pickup",
    num: "5",
    desc: "Ready for action",
    color: "bg-green-600",
    icon: <CheckCircle2 className="text-white" size={32} />,
  },
];

export default function RepairJourney() {
  return (
    <section className="bg-white py-16 lg:py-24 text-black overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">
            Seamless Repair Journey
          </h2>
          <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">
            Fixed in 5 simple steps
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4">
          {/* Desktop Horizontal Line */}
          <div className="hidden md:block absolute top-14 left-0 w-full h-[2px] bg-slate-100 z-0" />

          {/* Mobile Vertical Line */}
          <div className="block md:hidden absolute left-14 top-0 w-[2px] h-full bg-slate-100 z-0" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-row md:flex-col items-center w-full md:w-auto group cursor-pointer touch-manipulation"
            >
              {/* ICON CONTAINER */}
              <div className="relative shrink-0 w-28 h-28 rounded-full bg-white p-2 shadow-xl border border-slate-50 flex items-center justify-center mb-0 md:mb-8 transition-transform duration-300">
                {/* ICON ZOOM (Hover for PC, Active for Mobile) */}
                <div
                  className={`w-full h-full rounded-full ${step.color} flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110 group-active:scale-110 active:scale-110`}
                >
                  {step.icon}
                </div>

                {/* NUMBER BADGE ZOOM (Hover for PC, Active for Mobile) */}
                <div
                  className={`absolute -top-1 -right-1 w-9 h-9 rounded-full border-4 border-white text-white text-xs font-black flex items-center justify-center shadow-lg z-20 ${step.color} transition-transform duration-500 ease-out group-hover:scale-125 group-hover:rotate-12 group-active:scale-125 active:scale-125`}
                >
                  {step.num}
                </div>
              </div>

              {/* TEXT BOX */}
              <div className="ml-8 md:ml-0 text-left md:text-center transition-all duration-300 group-hover:translate-y-[-2px] group-active:translate-y-[-2px]">
                <h4 className="font-black text-xl md:text-lg mb-1 group-hover:text-blue-600 group-active:text-blue-600 transition-colors">
                  {step.id}
                </h4>
                <p className="text-[#64748B] text-xs font-bold tracking-widest uppercase">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
