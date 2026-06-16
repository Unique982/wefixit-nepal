"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  // Added missing imports
  Play as Youtube,
  MessageCircle as Tiktok,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Services",
      links: ["Smart Phone", "Mac Book", "Smart Watch", "IPad"],
    },
    {
      title: "Quick Links",
      links: ["Home", "About", "Service", "Pricing"],
    },
  ];

  // Define social icons with their respective components and links
  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/wefixitnepal" },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/wefixit_nepal?igsh=MWMyeDNmanQ1ODl6eg==",
    },
    {
      Icon: Tiktok,
      href: "https://www.tiktok.com/@wefixit.nepal?_r=1&_t=ZS-9527YgllbgO",
    },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-slate-400 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
          {/* Left: Branding & Vision */}
          <div className="lg:max-w-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-white rounded-lg shadow-sm">
                <Image
                  src="/WEfixit (1).png"
                  alt="WEFixit Logo"
                  width={35}
                  height={35}
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">
                WE<span className="text-blue-600">Fixit</span>
              </h1>
            </div>

            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Redefining maintenance in Kathmandu with precision, reliability,
              and world-class craftsmanship.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 hover:-translate-y-1 transition-all group"
                >
                  <social.Icon
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
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-8 opacity-80">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="group flex items-center gap-2 hover:text-white transition-colors text-sm"
                      >
                        <ChevronRight
                          size={14}
                          className="text-blue-500 transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0"
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
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-8 opacity-80">
              Quick Contact
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-blue-500/10 p-2 rounded-lg text-blue-500">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Headquarters
                  </p>
                  <p className="text-sm text-slate-500">
                    Baneshwor, Kathmandu, Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500">
                  <Phone size={18} />
                </div>
                <p className="text-white font-semibold text-sm">
                  +977-1-4XXXXXX
                </p>
              </div>

              <Link
                href="mailto:info@wefixit.com"
                className="flex items-center gap-4 group"
              >
                <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail size={18} />
                </div>
                <p className="text-white font-semibold text-sm group-hover:text-blue-500 transition-colors">
                  Contact Support
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 text-center text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase">
          © {currentYear} WEFIXIT NEPAL — PRECISE. POWERFUL. PROFESSIONAL.
        </div>
      </div>
    </footer>
  );
}
