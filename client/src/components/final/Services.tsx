import {
  Smartphone,
  Battery,
  Droplets,
  Cpu,
  ArrowRight,
  BatteryChargingIcon,
} from "lucide-react";

const services = [
  {
    title: "Screen Repair",
    description:
      "Broken glass or faulty Retina displays? We use genuine OEM components for perfect clarity.",
    icon: <Smartphone size={28} className="text-[#1D35FF]" />,
    iconBg: "bg-[#E0E7FF]",
  },
  {
    title: "Battery Swap",
    description:
      "Restoring 100% health to your iPhone or MacBook with high-capacity original cells.",
    icon: <BatteryChargingIcon size={28} className="text-[#00D1FF]" />,
    iconBg: "bg-green-100",
  },
  {
    title: "Water Damage",
    description:
      "Advanced ultrasonic cleaning and component-level micro-soldering to revive liquid-damaged boards.",
    icon: <Droplets size={28} className="text-indigo-600" />,
    iconBg: "bg-indigo-100",
  },
  {
    title: "Logic Board",
    description:
      "Specialized micro-repair on MacBooks. GPU, CPU, and power rail diagnostics and fixes.",
    icon: <Cpu size={28} className="text-rose-600" />,
    iconBg: "bg-rose-100",
  },
];

export default function Services() {
  return (
    <section className="py-24 px-6 bg-slate-50" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-sky-500 text-xs font-bold uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2 className="font-bold text-3xl md:text-5xl mb-4">
            Expert Apple Care Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white p-8 rounded-3xl border border-slate-100 hover:border-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`${service.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h4 className="text-4xl sm:text-xl md:text-2xl font-semibold  text-slate-900">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-slate-500 text-sm sm:text-lg md:text-[13px] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Learn More */}
              <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ArrowRight size={16} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
