import React from "react";
import {
  MousePointer2,
  Settings2,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Diagnostics & Quoting",
    subtitle: "Step 01",
    description:
      "Our experts perform a deep-dive technical audit of your device. We identify the root cause—whether it's a micro-solder issue or a software glitch—and provide a transparent NRs estimate instantly.",
    icon: <MousePointer2 className="w-4 h-4 text-blue-600" />,
    accent: "bg-blue-500",
    image:
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Precision Engineering",
    subtitle: "Step 02",
    description:
      "We don't just 'fix' things; we restore them. Using industry-grade heat guns and precision tools, our technicians replace damaged components with genuine, high-performance parts.",
    icon: <Settings2 className="w-4 h-4 text-purple-600" />,
    accent: "bg-purple-500",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Rigorous Quality Check",
    subtitle: "Step 03",
    description:
      "Before your device leaves our bench, it undergoes a 30-point stress test. We check battery cycles, touch responsiveness, and thermal performance to ensure it feels brand new.",
    icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    accent: "bg-emerald-500",
    image:
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Ready for Pickup",
    subtitle: "Step 04",
    description:
      "Once the 'Magic Fix' is complete, you'll receive a real-time notification. Every repair is backed by our 90-day warranty and a digital service report for your records.",
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    accent: "bg-amber-500",
    image:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800",
  },
];

const HowItWorksAlternating = () => {
  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20 lg:mb-32">
          <h2 className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-6">
            The Workflow
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            How we bring your <br className="hidden md:block" /> tech back to
            life.
          </h3>
        </div>

        {/* Steps Container */}
        <div className="space-y-24 md:space-y-40 lg:space-y-52">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col gap-12 lg:gap-32 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Text Content */}
              <div className="flex-1 w-full space-y-8">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                    {step.icon}
                  </div>
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                    {step.subtitle}
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-lg text-slate-500 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2">
                  <button className="group flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-colors">
                    Learn more about our process
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Visual Side */}
              <div className="flex-1 w-full relative group">
                {/* Decorative Blob */}
                <div
                  className={`absolute -inset-4 md:-inset-10 rounded-[4rem] opacity-10 blur-3xl transition-opacity group-hover:opacity-20 ${step.accent}`}
                />

                {/* Image Card */}
                <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border-[6px] md:border-[12px] border-white">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full aspect-[4/3] object-cover grayscale-[20%] group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-700"
                  />
                </div>

                {/* Floating Step Badge (Optional flourish) */}
                <div className="absolute -bottom-6 -right-6 md:right-8 z-20 bg-white p-4 rounded-2xl shadow-xl hidden md:block">
                  <div
                    className={`w-12 h-1.5 rounded-full mb-2 ${step.accent}`}
                  />
                  <span className="text-xs font-bold text-slate-400 uppercase italic">
                    Phase 0{index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksAlternating;
