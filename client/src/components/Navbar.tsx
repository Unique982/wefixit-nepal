"use client";
import { useState, useEffect } from "react";
import { Wrench, Phone, Mail, MapPin, Clock, Menu, X } from "lucide-react";
import Link from "next/link";
import AuthModal from "./Model";

const RepairPlusNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "#services" },
    { name: "PRICING", href: "#pricing" },
    { name: "TRACKING", href: "/tracking" },
    { name: "BOOKING", href: "/booking" },
    { name: "ABOUT US", href: "#about-us" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header className="w-full font-sans">
        {/* TOP INFO BAR */}
        <div className="bg-white py-3 px-4 md:px-10 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-3 md:gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-[#40C4FF] p-2 rounded-lg shadow-sm">
                <Wrench className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-800">
                  Repair<span className="text-[#40C4FF]">Plus</span>
                </h1>
                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                  Premium Tech Support
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full lg:w-auto">
              <InfoItem
                icon={<Phone size={16} className="text-[#40C4FF]" />}
                title="+977 12345678"
                sub="Call Us Now"
              />
              <InfoItem
                icon={<Mail size={16} className="text-[#40C4FF]" />}
                title="info@repair.com"
                sub="Email Us"
              />
              <div className="hidden md:block">
                <InfoItem
                  icon={<MapPin size={16} className="text-[#40C4FF]" />}
                  title="Kathmandu"
                  sub="Nepal"
                />
              </div>
              <div className="hidden md:block">
                <InfoItem
                  icon={<Clock size={16} className="text-[#40C4FF]" />}
                  title="09:00 - 18:00"
                  sub="Mon - Sat"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <nav
          className={`w-full z-40 bg-[#111827] transition-all duration-300 ${isSticky ? "fixed top-0 left-0 shadow-xl" : "relative"}`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="flex justify-between items-center h-14 md:h-16">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white flex items-center gap-2 font-bold text-[10px] tracking-[1.5px]"
              >
                {isMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} className="text-[#40C4FF]" />
                )}
                MENU
              </button>

              <ul className="hidden md:flex items-center h-full space-x-1">
                {navLinks.map((link) => (
                  <li key={link.name} className="h-full">
                    <Link
                      href={link.href}
                      className="px-5 h-full flex items-center text-[11px] font-bold tracking-[1.5px] text-gray-300 hover:text-[#40C4FF] hover:bg-white/5 transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#40C4FF] text-[#111827] px-5 md:px-6 py-2 md:py-2.5 rounded font-black text-[10px] md:text-[11px] tracking-wide hover:bg-white transition-all shadow-md"
                >
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* MOBILE SIDEBAR */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <aside
            className={`absolute top-0 left-0 w-[280px] h-full bg-[#111827] p-8 transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <span className="text-white font-black">MENU</span>
              <X
                className="text-[#40C4FF]"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white font-bold tracking-widest hover:text-[#40C4FF]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </header>

      {/* AUTH MODAL */}
      {isModalOpen && <AuthModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
};

// Info Item Component
const InfoItem = ({ icon, title, sub }) => (
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shrink-0">
      {icon}
    </div>
    <div className="overflow-hidden">
      <h4 className="text-[10px] md:text-[12px] font-black text-slate-800 truncate">
        {title}
      </h4>
      <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">
        {sub}
      </p>
    </div>
  </div>
);

export default RepairPlusNavbar;
