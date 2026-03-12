"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Menu,
  X,
  Wrench,
  Phone,
  Mail,
  User,
  Lock,
} from "lucide-react";
import Link from "next/link";

const RepairPlusHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "/services" },
    { name: "PAGES", href: "/pages" },
    { name: "SHOP", href: "/shop" },
    { name: "NEWS", href: "/news" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <header className="w-full font-sans">
        {/* 1. TOP INFO BAR */}
        <div className="bg-white py-4 px-4 md:px-10 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3 self-start lg:self-center">
              <div className="bg-[#40C4FF] p-2 rounded-lg shadow-sm">
                <Wrench className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none">
                  Repair<span className="text-[#40C4FF]">Plus</span>
                </h1>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Premium Tech Support
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full lg:w-auto">
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

        {/* 2. MAIN NAVBAR */}
        <nav
          className={`w-full z-40 bg-[#111827] transition-all duration-300 ${isSticky ? "fixed top-0 left-0 shadow-2xl" : "relative"}`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="flex justify-between items-center h-14 md:h-16">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white flex items-center gap-2 font-bold text-[10px] tracking-[2px]"
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
                      className="px-5 h-full flex items-center text-[11px] font-bold tracking-[2px] text-gray-300 hover:text-[#40C4FF] hover:bg-white/5 transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center">
                {/* LOGIN REMOVED - ONLY SIGN UP BUTTON REMAINS */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#40C4FF] text-[#111827] px-6 py-2 md:py-2.5 rounded font-black text-[10px] md:text-[11px] tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(64,196,255,0.3)]"
                >
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* --- SIGN UP / LOGIN MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                  <Wrench className="text-[#40C4FF]" size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-sm text-gray-500">
                  Log in to manage your repairs
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#40C4FF] focus:outline-none text-sm transition-all"
                  />
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#40C4FF] focus:outline-none text-sm transition-all"
                  />
                </div>

                <button className="w-full bg-[#111827] text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-all shadow-lg">
                  LOGIN NOW
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  Don't have an account?{" "}
                  <span className="text-[#40C4FF] cursor-pointer hover:underline">
                    Create one here
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MOBILE SIDEBAR --- */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <aside
          className={`absolute top-0 left-0 w-[280px] h-full bg-[#111827] p-8 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
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
    </>
  );
};

const InfoItem = ({ icon, title, sub }) => (
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shrink-0">
      {icon}
    </div>
    <div className="overflow-hidden">
      <h4 className="text-[10px] md:text-[12px] font-black text-slate-800 leading-none truncate">
        {title}
      </h4>
      <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-tighter">
        {sub}
      </p>
    </div>
  </div>
);

export default RepairPlusHeader;
