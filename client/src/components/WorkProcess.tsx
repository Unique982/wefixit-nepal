"use client";
import { motion } from "framer-motion";
import {
  Phone,
  CalendarCheck,
  Search,
  ShieldCheck,
  Cpu,
  Toolbox, // Corrected from ToolCase
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

const steps = [
  {
    step: "STEP-01",
    title: "Book Your Repair",
    desc: "Call us or schedule online. We'll confirm your appointment and prepare the necessary parts.",
    icon: <CalendarCheck className="w-5 h-5 text-white" />,
  },
  {
    step: "STEP-02",
    title: "Device Inspection",
    desc: "Certified technicians carefully inspect your device to identify all issues.",
    icon: <Search className="w-5 h-5 text-white" />,
  },
  {
    step: "STEP-03",
    title: "Diagnosis Report",
    desc: "We provide a transparent repair report with estimated time and cost.",
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
  },
  {
    step: "STEP-04",
    title: "Parts Procurement",
    desc: "We source only high-quality or original parts for your device.",
    icon: <Cpu className="w-5 h-5 text-white" />,
  },
  {
    step: "STEP-05",
    title: "Expert Repair",
    desc: "Our certified technicians repair your device using modern tools and techniques.",
    icon: <Toolbox className="w-5 h-5 text-white" />,
  },
  {
    step: "STEP-06",
    title: "Quality Testing",
    desc: "We run full diagnostics to ensure your device works perfectly.",
    icon: <CheckCircle className="w-5 h-5 text-white" />,
  },
  {
    step: "STEP-07",
    title: "Customer Review",
    desc: "You can check and approve the repaired device before handover.",
    icon: <Star className="w-5 h-5 text-white" />,
  },
  {
    step: "STEP-08",
    title: "Delivery & Support",
    desc: "We deliver your device safely with warranty and after-service support.",
    icon: <Clock className="w-5 h-5 text-white" />,
  },
];

export default function WorkProcess() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-orange-500 font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-1 mb-2">
            ✦ WORK PROCESS ✦
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1a134d] mb-4">
            How We Handle Your Device
          </h2>

          <p className="text-gray-500 max-w-2xl text-center leading-relaxed">
            From booking to delivery, we follow a transparent and professional
            workflow to ensure your device gets the care it deserves.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left Steps (Even Index: 0, 2, 4, 6) */}
          <div className="space-y-12 hidden lg:block">
            {steps
              .filter((_, i) => i % 2 === 0)
              .map((item, index) => (
                <StepItem key={index} step={item} delay={index * 0.1} />
              ))}
          </div>

          {/* Center Image */}
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-xl">
              <img
                src="https://themes.envytheme.com/fixo/wp-content/uploads/2023/11/banner-4.webp"
                alt="Technician working"
                className="w-full h-[600px] object-cover"
              />
            </div>

            {/* Floating Contact Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1a134d] text-white p-6 rounded-3xl shadow-2xl flex flex-col gap-2 min-w-[280px]"
            >
              <span className="text-xs font-medium text-gray-300">
                Free Consultancy Now
              </span>
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 p-3 rounded-full">
                  <Phone className="w-6 h-6 fill-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  (800)-236-8937
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Steps (Odd Index: 1, 3, 5, 7) */}
          <div className="space-y-12 hidden lg:block">
            {steps
              .filter((_, i) => i % 2 !== 0)
              .map((item, index) => (
                <StepItem key={index} step={item} delay={index * 0.1} />
              ))}
          </div>
        </div>

        {/* Mobile view */}
        <div className="lg:hidden mt-12 space-y-12">
          {steps.map((item, index) => (
            <StepItem key={index} step={item} delay={index * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, delay }: { step: (typeof steps)[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} // Prevents re-animating for speed
      transition={{
        duration: 0.3,
        delay: delay,
        ease: "easeOut",
      }}
      className="flex gap-6 items-start"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
        {step.icon}
      </div>
      <div>
        <span className="text-xs font-bold text-gray-400 tracking-tighter block mb-2">
          {step.step}
        </span>
        <h3 className="text-2xl font-bold text-[#1a134d] mb-2">{step.title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-md">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}
