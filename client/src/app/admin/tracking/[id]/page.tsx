"use client";

import React from "react";
import {
  ArrowLeft,
  Printer,
  MoreHorizontal,
  Wrench,
  User,
  Smartphone,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Send,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function PremiumRepairView() {
  const order = {
    id: "RS-9842",
    status: "In Progress",
    customer: "Olivia Rhye",
    email: "olivia@untitledui.com",
    device: "iPhone 14 Pro",
    technician: "Bishal Rai",
    date: "March 18, 2026",
    issue:
      "Broken screen and unresponsive touch. Needs genuine parts replacement.",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 p-4 md:p-6 lg:p-10 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Navigation & Action Bar - Fully Responsive Stack */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 truncate">
                  {order.id}
                </h1>
                <Badge className="bg-orange-100/50 text-orange-600 border-orange-200 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {order.status}
                </Badge>
              </div>
              <p className="text-xs md:text-sm font-bold text-slate-400">
                Received on {order.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none h-10 md:h-11 border-slate-200 bg-white font-black text-[10px] md:text-xs uppercase tracking-widest gap-2 rounded-xl px-4"
            >
              <Printer className="w-4 h-4" />{" "}
              <span className="hidden xs:inline">Print Ticket</span>
            </Button>
            <Button className="flex-1 sm:flex-none h-10 md:h-11 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl px-4 md:px-6 shadow-lg shadow-blue-500/20">
              Update Status
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Side: Order & Timeline (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Device Info Card */}
            <Card className="border-none shadow-[0_8px_40px_rgba(0,0,0,0.04)] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white">
              <div className="bg-slate-50/50 px-6 md:px-8 py-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Device Details
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-blue-600 font-bold gap-1 hover:bg-blue-50 px-3"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </Button>
              </div>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Model & Brand
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-100 rounded-xl md:rounded-2xl">
                        <Smartphone className="w-5 h-5 text-slate-600" />
                      </div>
                      <span className="text-base md:text-lg font-black text-slate-900 leading-none">
                        {order.device}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Assigned Technician
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 rounded-xl md:rounded-2xl text-blue-600">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <span className="text-base md:text-lg font-black text-slate-900 leading-none">
                        {order.technician}
                      </span>
                    </div>
                  </div>
                </div>
                <Separator className="my-6 md:my-8 bg-slate-100/80" />
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Description of Issue
                  </p>
                  <p className="text-sm font-semibold text-slate-600 leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-100/50">
                    {order.issue}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Responsive Timeline - Vertical on Mobile, Horizontal on Desktop */}
            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-6 md:mb-8">
                Repair Journey
              </span>
              <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-2">
                {/* Horizontal line for desktop */}
                <div className="absolute top-5 left-0 hidden md:block w-full h-0.5 bg-slate-100 -z-0" />
                {/* Vertical line for mobile */}
                <div className="absolute top-0 left-5 md:hidden w-0.5 h-full bg-slate-100 -z-0" />

                {[
                  { label: "Check-in", time: "10:00 AM", active: true },
                  { label: "Inspection", time: "11:30 AM", active: true },
                  {
                    label: "Repairing",
                    time: "Now",
                    active: true,
                    pulse: true,
                  },
                  { label: "QC Check", time: "Pending", active: false },
                  { label: "Ready", time: "Pending", active: false },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-3 bg-white md:px-2"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl md:rounded-2xl flex items-center justify-center border-2 transition-all shrink-0",
                        step.active
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white border-slate-100 text-slate-300",
                        step.pulse &&
                          "animate-pulse ring-4 ring-blue-50 md:ring-8",
                      )}
                    >
                      {step.active ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-left md:text-center">
                      <p
                        className={cn(
                          "text-[11px] font-black uppercase tracking-tight",
                          step.active ? "text-slate-900" : "text-slate-400",
                        )}
                      >
                        {step.label}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 leading-none">
                        {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Customer & Summary (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Customer Details */}
            <Card className="border-none shadow-[0_8px_40px_rgba(0,0,0,0.04)] rounded-[1.5rem] md:rounded-[2rem] bg-white p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xl font-black text-slate-600 shrink-0">
                    {order.customer.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-black text-slate-900 truncate">
                      {order.customer}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      Regular Client
                    </p>
                  </div>
                </div>

                <Separator className="bg-slate-50" />

                <div className="space-y-4">
                  {[
                    { icon: Mail, text: order.email },
                    { icon: Phone, text: "+977 980 1234567" },
                    { icon: MapPin, text: "New Road, Kathmandu" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <item.icon className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 truncate">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button className="w-full h-12 bg-slate-900 hover:bg-black text-white font-black text-[11px] uppercase tracking-[0.1em] rounded-2xl shadow-xl transition-all active:scale-[0.98]">
                  <Send className="w-3.5 h-3.5 mr-2" /> Notify Customer
                </Button>
              </div>
            </Card>

            {/* Financial Summary */}
            <div className="bg-blue-600 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-white space-y-6 shadow-2xl shadow-blue-500/30">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
                    Status
                  </p>
                  <h4 className="text-xl font-black uppercase tracking-tight">
                    Unpaid
                  </h4>
                </div>
                <div className="p-2.5 bg-blue-500 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-blue-100" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
                    Total Estimate
                  </p>
                  <p className="text-3xl md:text-4xl font-black tabular-nums tracking-tighter">
                    Rs. 12,500
                  </p>
                </div>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-black rounded-xl h-12 transition-transform active:scale-95 shadow-lg shadow-black/10">
                  Generate Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
