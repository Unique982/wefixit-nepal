export default function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-2">Transparent Pricing</h2>
        <p className="text-slate-500 mb-12">
          Competitive rates for premium service. All prices starting from.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* iPhone Card */}
          <div className="border border-slate-100 rounded-3xl p-8 bg-white shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-12 bg-blue-600 rounded-md"></div>
            </div>
            <h3 className="text-xl font-bold">iPhone Repair</h3>
            <p className="text-xs text-slate-400 mb-6 font-medium">
              Screens, Batteries, Charging Ports
            </p>
            <div className="text-4xl font-bold mb-8">
              Rs. 2,499
              <span className="text-sm text-slate-300 font-normal">
                /starts
              </span>
            </div>
            <ul className="text-sm space-y-4 mb-8 text-slate-600">
              <li>30 min turnaround</li>
              <li>Original Display</li>
              <li>6 Mo Warranty</li>
            </ul>
            <button className="w-full py-3 bg-slate-50 rounded-full font-semibold border border-slate-200">
              Check Model List
            </button>
          </div>

          {/* MacBook Card (Blue Highlight) */}
          <div className="bg-[#1D35FF] rounded-3xl p-8 text-white shadow-2xl relative lg:-translate-y-4">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00E5FF] text-[#1D35FF] text-[10px] font-black px-4 py-1 rounded-full uppercase">
              Most Popular
            </span>
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-8 bg-white rounded-sm"></div>
            </div>
            <h3 className="text-xl font-bold">MacBook Service</h3>
            <p className="text-xs text-blue-200 mb-6 font-medium">
              Logic Board, Keyboards, Screen
            </p>
            <div className="text-4xl font-bold mb-8">
              Rs. 5,999
              <span className="text-sm text-blue-300 font-normal">/starts</span>
            </div>
            <ul className="text-sm space-y-4 mb-8">
              <li>Component-level fix</li>
              <li>Same-day service</li>
              <li>Free cleaning included</li>
            </ul>
            <button className="w-full py-3 bg-white text-[#1D35FF] rounded-full font-bold">
              Get Estimate
            </button>
          </div>

          {/* iPad Card */}
          <div className="border border-slate-100 rounded-3xl p-8 bg-white shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="w-10 h-14 bg-blue-600 rounded-md"></div>
            </div>
            <h3 className="text-xl font-bold">iPad Solutions</h3>
            <p className="text-xs text-slate-400 mb-6 font-medium">
              Digitizers, Glass, Battery
            </p>
            <div className="text-4xl font-bold mb-8">
              Rs. 3,499
              <span className="text-sm text-slate-300 font-normal">
                /starts
              </span>
            </div>
            <ul className="text-sm space-y-4 mb-8 text-slate-600">
              <li>Adhesive sealing</li>
              <li>Pencil support fix</li>
              <li>Factory-spec finish</li>
            </ul>
            <button className="w-full py-3 bg-slate-50 rounded-full font-semibold border border-slate-200">
              Check Model List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
