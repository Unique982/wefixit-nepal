import {
  Microscope,
  Droplets,
  MicroscopeIcon,
  BrushCleaningIcon,
} from "lucide-react";

export default function LabSection() {
  return (
    <section className="py-12 px-6 bg-gray-50" id="lab">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div>
            <h3 className="text-4xl  text-slate-900 mb-8 font-bold  md:text-5xl ">
              Inside Our High-Tech Lab
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              At our Apple repair lab, we use professional-grade equipment for
              precise diagnostics and repairs. Every workstation is ESD-safe,
              allowing our technicians to safely handle sensitive components.
              From micro-soldering to logic board restorations, we ensure every
              device is restored to peak performance.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="size-14 shrink-0 rounded-2xl bg-black text-white shadow-lg flex items-center justify-center text-primary">
                  <MicroscopeIcon />
                </div>
                <div>
                  <h5 className="font-bold text-lg">Micro-Soldering Station</h5>
                  <p className="text-sm text-slate-500">
                    Precision microscopes allow repairs on tiny 0.1mm
                    components, ensuring high-quality logic board restorations.
                  </p>
                </div>
              </div>

              {/* Ultrasonic Bath */}
              <div className="flex gap-6">
                <div className="size-14 shrink-0 rounded-2xl bg-black shadow-lg flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined">
                    <BrushCleaningIcon />
                  </span>
                </div>
                <div>
                  <h5 className="font-bold text-lg">
                    Ultrasonic Cleaning Bath
                  </h5>
                  <p className="text-sm text-slate-500">
                    Removes water damage and corrosion from internal components
                    safely and effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                className="rounded-3xl h-64 w-full object-cover"
                alt="Close up of technician working under a digital microscope"
                src="https://wefixitstorenepal.com/images/2840301@2x.png"
              />
              <img
                className="rounded-3xl h-48 w-full object-cover"
                alt="High tech server and electronic repair tools"
                src="https://wefixitstorenepal.com/images/Asset%201@2x.png"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                className="rounded-3xl h-48 w-full object-cover"
                alt="Apple device internals being tested"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7GbeKjAT-jfZNVDyCqhDaGSooQoI-m98Lee_Bpd7oLWAz09Xvy5e0wYsi50RMFUN6LfKx1m7aoUCZDSX5HR23KMbPFuTuLy3rN-Lvz2qJO1GDi1Gm6FbbzrBAkTcv7flvuFX82RRfpoFWqsjGTWRIGwCQjVSR8hzuF7-tYmnY4KOl224AgBWdBqyX9ibrBj_JZe1raFTev7nhk1hX2jhiybOquPv-qHEBCtPSbQZL6hl0uyOGW80WPKocaopxp7nKonRmQD8sC9y8"
              />
              <img
                className="rounded-3xl h-64 w-full object-cover"
                alt="A clean professional electronic repair workstation"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSvrL5AdyMD9ryXh4xkV2QWYdoNDVg7TK1pn4mlOeyRYLgXnpb-QrrdFFq3li8ErVT4EUd2TMOT-14Xr5Ajplx9ohnNbFR0ytsBXKQ2MxGyVYYen7_J7Dhr5jdKofNQUr0Tyz4CxWNygfY32EFcuFV4o92x69hYRTLSpnuE2HwahoDt6smyMDFOKMpknNIAVZH3_9exFRDuRj_8K6O2aYcXjl_m5DZSEwcPL6qU4VxxsXOP4xpfvzO7EkaZsuwqf8aHZ6Ow7meef-r"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
