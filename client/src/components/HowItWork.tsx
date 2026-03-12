import Image from "next/image";
import { ShieldCheck, Award, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Book Your Repair",
      description:
        "Select your device and the issue online. Get an instant quote and book a time slot.",
    },
    {
      id: 2,
      title: "Drop-off or Mail-in",
      description:
        "Visit one of our locations or use our secure shipping kit to send your device to us.",
    },
    {
      id: 3,
      title: "Get it Back",
      description:
        "Our techs fix your device. We test it thoroughly and send it back good as new.",
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="text-blue-600" size={24} />,
      title: "Expert Techs",
      desc: "Our technicians are certified and undergo regular training for the latest hardware.",
    },
    {
      icon: <Award className="text-blue-600" size={24} />,
      title: "1-Year Warranty",
      desc: "We stand behind our work. All parts and labor come with a comprehensive warranty.",
    },
    {
      icon: <Zap className="text-blue-600" size={24} />,
      title: "Quick Turnaround",
      desc: "Most phone repairs are finished in 2 hours, and laptops within 24-48 hours.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-20 md:mb-32">
          {/* Left: Content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-500 text-base md:text-lg mb-12 max-w-lg leading-relaxed">
              Repairing your device has never been easier. We've streamlined our
              process to save you time and hassle.
            </p>

            <div className="relative space-y-10">
              {/* Vertical line connecting dots (Desktop only) */}
              <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-100 hidden sm:block" />

              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 group"
                >
                  <div className="z-10 flex-shrink-0 w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-200">
                    {step.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image Card */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative group">
              {/* Decorative background shape */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />

              <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-square xl:aspect-[4/3] rounded-[2rem] overflow-hidden border-[6px] md:border-[12px] border-white shadow-2xl">
                <Image
                  src="/download.jpg"
                  alt="Technician working"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 pt-16 border-t border-slate-100">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center sm:items-start text-center sm:text-left group"
            >
              <div className="mb-6 p-4 rounded-2xl bg-blue-50 text-blue-600 transition-transform group-hover:-translate-y-1">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h4>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
