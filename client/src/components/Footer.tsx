import Link from "next/link";
import {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Wrench,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Services",
      links: [
        "Electrical Engineering",
        "Precision Plumbing",
        "HVAC Solutions",
        "Smart Home Install",
      ],
    },
    {
      title: "Company",
      links: [
        "Our Master Craftsmen",
        "Safety Standards",
        "Training Center",
        "Equipment Arsenal",
      ],
    },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-slate-400 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          {/* Left: Branding & Vision */}
          <div className="lg:max-w-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Wrench size={22} className="text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase">
                WEFIXIT <span className="text-blue-500">NEPAL</span>
              </span>
            </div>
            <p className="text-lg text-slate-300 font-light leading-relaxed">
              Redefining maintenance in Kathmandu with precision, reliability,
              and world-class craftsmanship.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-all group"
                >
                  <Icon
                    size={18}
                    className="group-hover:text-white transition-colors"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Links */}
          <div className="flex flex-wrap gap-12 sm:gap-24">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="text-white font-bold text-sm uppercase  mb-8 italic">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="group flex items-center gap-2 hover:text-white transition-colors"
                      >
                        <ChevronRight
                          size={14}
                          className="text-blue-500 opacity-0 group-hover:opacity-100   "
                        />
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: Direct Contact & Location */}
          <div className="lg:max-w-xs w-full">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 italic">
              Quick Contact
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-500/10 p-2 rounded-lg text-blue-500">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">Headquarters</p>
                  <p className="text-sm">Baneshwor, Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500">
                  <Phone size={18} />
                </div>
                <p className="text-white font-medium">+977-1-4XXXXXX</p>
              </div>
              <Link
                href="mailto:info@wefixit.com"
                className="flex items-center gap-4 group"
              >
                <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <p className="text-white font-medium group-hover:text-blue-500 transition-colors">
                  Contact Support
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-xs font-medium">
          © {currentYear} WEFIXIT NEPAL — PRECISE. POWERFUL. PROFESSIONAL.
        </div>
      </div>
    </footer>
  );
}
