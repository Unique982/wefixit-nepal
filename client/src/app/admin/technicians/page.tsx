"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Settings2,
  Star,
  Activity,
  ShieldCheck,
  Smartphone,
  Mail,
  ArrowUpRight,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Mock Data for the squad
const technicians = [
  {
    id: "T-01",
    name: "Bishal Rai",
    role: "SENIOR APPLE EXPERT",
    status: "Online",
    load: 82,
    rating: 4.9,
    avatar: "BR",
    color: "bg-blue-600",
  },
  {
    id: "T-02",
    name: "Suman KC",
    role: "LOGIC BOARD SPECIALIST",
    status: "Offline",
    load: 0,
    rating: 4.7,
    avatar: "SK",
    color: "bg-slate-900",
  },
  {
    id: "T-03",
    name: "Anil Shrestha",
    role: "DISPLAY TECHNICIAN",
    status: "Online",
    load: 45,
    rating: 4.8,
    avatar: "AS",
    color: "bg-indigo-600",
  },
];

export default function TechSquadPortal() {
  const [selectedTech, setSelectedTech] = useState(technicians[0]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-blue-100 p-4 md:p-10">
      <div className="max-w-[1300px] mx-auto space-y-12">
        {/* Header: Minimalist & High-Contrast */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-semibold tracking-tighter italic text-slate-900">
              Squad <span className="text-slate-300">Operations</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Personnel & Workflow Management
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
              <Input
                placeholder="Search team..."
                className="h-12 pl-12 bg-white border-slate-200/60 rounded-2xl shadow-sm focus-visible:ring-4 focus-visible:ring-blue-50 transition-all font-medium"
              />
            </div>
            <Button className="h-12 bg-slate-900 hover:bg-black text-white rounded-2xl px-6 font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">
              <Plus className="w-4 h-4 mr-2" /> Add Member
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Master List (Bento-inspired) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-2 mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Team List
              </span>
              <Settings2 className="w-4 h-4 text-slate-300 hover:text-slate-600 cursor-pointer transition-colors" />
            </div>

            <div className="space-y-2">
              {technicians.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-3xl transition-all duration-300 group border",
                    selectedTech.id === tech.id
                      ? "bg-white border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
                      : "bg-transparent border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 rounded-2xl border-4 border-white shadow-sm overflow-hidden">
                      <AvatarFallback
                        className={cn(
                          "text-white font-black text-xs",
                          tech.color,
                        )}
                      >
                        {tech.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-900 leading-tight">
                        {tech.name}
                      </p>
                      <p className="text-[9px] text-slate-400 font-black mt-1 uppercase tracking-wider">
                        {tech.role}
                      </p>
                    </div>
                  </div>
                  {tech.status === "Online" && (
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Simple Pagination Footer for Mobile list */}
            <div className="flex items-center justify-between px-2 pt-6">
              <span className="text-[10px] font-black uppercase text-slate-300">
                Showing 3 of 3
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg border border-slate-100"
                >
                  <ChevronLeft className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg border border-slate-100"
                >
                  <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Detailed Bento Dashboard */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)]">
              {/* Profile Header */}
              <div className="flex justify-between items-start mb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                  <div
                    className={cn(
                      "h-24 w-24 rounded-[2.5rem] flex items-center justify-center text-white text-3xl font-black shadow-2xl transition-transform hover:rotate-3 cursor-default",
                      selectedTech.color,
                    )}
                  >
                    {selectedTech.avatar}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                        {selectedTech.name}
                      </h2>
                      <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[9px] font-black text-slate-300 uppercase tracking-widest">
                        {selectedTech.id}
                      </span>
                    </div>
                    <p className="text-blue-600 text-[11px] font-black uppercase tracking-[0.2em] italic">
                      {selectedTech.role}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-2xl text-slate-300 hover:text-slate-900 transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Active Workload */}
                <div className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 group relative">
                  <div className="flex items-center justify-between text-slate-400 mb-8">
                    <Activity className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      Active Workload
                    </span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-5xl font-black text-slate-900 tracking-tighter">
                      {selectedTech.load}
                      <span className="text-xl text-slate-300 font-medium">
                        %
                      </span>
                    </p>
                    <div className="w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${selectedTech.load}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Satisfaction Rating */}
                <div className="p-8 bg-slate-900 rounded-[2.5rem] flex flex-col justify-between text-white group cursor-pointer hover:shadow-2xl hover:shadow-slate-900/20 active:scale-[0.98] transition-all">
                  <div className="flex items-center justify-between opacity-30">
                    <Star className="w-5 h-5 fill-white" />
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <div>
                    <p className="text-5xl font-black leading-none mb-2 tracking-tighter">
                      {selectedTech.rating}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                      Customer Satisfaction
                    </p>
                  </div>
                </div>

                {/* Technical Skills & Actions */}
                <div className="md:col-span-2 p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                      <Smartphone className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                        Core Specialty
                      </p>
                      <p className="text-base font-bold text-slate-800">
                        Advanced Board Microsoldering
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <Button
                      variant="outline"
                      className="flex-1 md:flex-none h-14 rounded-2xl border-slate-100 px-8 font-black text-[10px] uppercase tracking-widest gap-3 bg-slate-50/50 hover:bg-white transition-all"
                    >
                      <Mail className="w-4 h-4 text-slate-400" /> Message
                    </Button>
                    <Button className="flex-1 md:flex-none h-14 rounded-2xl bg-blue-600 text-white px-8 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100">
                      View Stats
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
