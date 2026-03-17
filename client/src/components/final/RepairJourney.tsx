import {
  CalendarCheck,
  Microscope,
  Wrench,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    id: "1. Book",
    desc: "Online or via phone",
    icon: <CalendarCheck className="text-blue-600" size={24} />,
  },
  {
    id: "2. Diagnose",
    desc: "Under the microscope",
    icon: <Microscope className="text-cyan-400" size={24} />,
  },
  {
    id: "3. Repair",
    desc: "Genuine part install",
    icon: <Wrench className="text-blue-700" size={24} />,
  },
  {
    id: "4. Test",
    desc: "30-point quality check",
    icon: <FileCheck className="text-cyan-400" size={24} />,
  },
  {
    id: "5. Pickup",
    desc: "Ready for action",
    icon: <CheckCircle2 className="text-green-500" size={24} />,
  },
];

export default function RepairJourney() {
  return (
    <section className="bg-[#0B1221] py-12 text-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-4xl font-black mb-4">Seamless Repair Journey</h2>
        <p className="text-slate-400 mb-20 text-sm tracking-wide">
          Fixed in 5 simple steps
        </p>

        {/* Steps Container */}
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
          {/* Background Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent z-0" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center flex-1"
            >
              {/* Circular Icon Container */}
              <div className="w-24 h-24 rounded-full bg-[#161E2E] border-[3px] border-[#2D3748] flex items-center justify-center mb-8 shadow-2xl transition-transform hover:scale-110">
                <div className="flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              {/* Text Content */}
              <h4 className="font-bold text-lg mb-2">{step.id}</h4>
              <p className="text-slate-400 text-xs font-medium tracking-tight">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
