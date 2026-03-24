"use client";
import React, { useState } from "react";
import {
  Search,
  Printer,
  Download,
  User,
  Smartphone,
  ClipboardList,
  History,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import RepairPlusNavbar from "@/components/Navbar";

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  // Yo data API bata fetch hunchha - Example details thapidiyeko chhu
  const repairData = {
    jobId: "RP-9921",
    customer: {
      name: "Unique Neupane",
      phone: "+977 9800000000",
      email: "unique@example.com",
      address: "Kathmandu, Nepal",
    },
    device: {
      model: "iPhone 13 Pro",
      serial: "SN-A2638-XYZ789",
      condition: "Minor scratches on body",
      reportedIssue: "Display flickering and Battery draining fast",
    },
    service: {
      technician: "Ramesh Sharma",
      partsReplaced: "Original OLED Display, 3095mAh Battery",
      technicianNote:
        "Device opened and cleaned. New display calibrated. Battery health restored to 100%.",
      totalCost: "Rs. 12,500",
      warranty: "90 Days on Parts",
      estimatedDelivery: "March 28, 2026",
    },
    status: "In Progress",
    progress: 60,
    logs: [
      {
        time: "Mar 20, 10:00 AM",
        activity: "Job Created & Device Received",
        icon: "received",
      },
      {
        time: "Mar 21, 02:30 PM",
        activity: "Initial Diagnosis Completed",
        icon: "done",
      },
      {
        time: "Mar 22, 11:15 AM",
        activity: "Parts Ordered (Display & Battery)",
        icon: "done",
      },
      {
        time: "Mar 23, 04:00 PM",
        activity: "Repair Process Started",
        icon: "active",
      },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId) setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <RepairPlusNavbar />

      <div className="max-w-4xl mx-auto px-4 pt-10">
        {/* Simple & Bold Search */}
        <div className="text-center mb-10 print:hidden">
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
            TRACK REPAIR
          </h1>
          <p className="text-slate-500 font-medium">
            Enter your Job ID to access full repair details
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 max-w-xl mx-auto flex gap-2"
          >
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Enter Job ID (e.g. RP-9921)"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all font-bold text-lg"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 rounded-xl font-bold transition-all">
              Search
            </button>
          </form>
        </div>

        {showDetails && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* Header Actions */}
            <div className="flex justify-between items-end print:hidden">
              <div>
                <span className="text-sm font-bold text-orange-600 uppercase tracking-widest">
                  Repair Ticket
                </span>
                <h2 className="text-2xl font-black italic">
                  {repairData.jobId}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all"
                >
                  <Printer size={16} /> Print Job Sheet
                </button>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition-all">
                  <Download size={16} /> Download PDF
                </button>
              </div>
            </div>

            {/* Main Job Sheet Content */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden">
              {/* Top Status Bar */}
              <div className="bg-slate-900 p-6 text-white flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                    <ClipboardList size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">
                      Current Status
                    </p>
                    <p className="text-xl font-bold text-orange-400 uppercase tracking-wide">
                      {repairData.status}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Estimated Completion
                  </p>
                  <p className="text-lg font-bold">
                    {repairData.service.estimatedDelivery}
                  </p>
                </div>
              </div>

              <div className="p-8">
                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Left: Customer & Device */}
                  <div className="space-y-8">
                    <section>
                      <h4 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase mb-4 tracking-tighter">
                        <User size={16} /> Customer Information
                      </h4>
                      <div className="space-y-1">
                        <p className="text-xl font-bold text-slate-800">
                          {repairData.customer.name}
                        </p>
                        <p className="text-slate-500 font-medium">
                          {repairData.customer.phone}
                        </p>
                        <p className="text-slate-500 text-sm">
                          {repairData.customer.address}
                        </p>
                      </div>
                    </section>

                    <section>
                      <h4 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase mb-4 tracking-tighter">
                        <Smartphone size={16} /> Device Information
                      </h4>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                        <p className="flex justify-between">
                          <span className="text-slate-500 text-sm">Model:</span>
                          <span className="font-bold">
                            {repairData.device.model}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-slate-500 text-sm">
                            Serial:
                          </span>
                          <span className="font-mono text-xs font-bold">
                            {repairData.device.serial}
                          </span>
                        </p>
                        <p className="text-xs text-slate-400 mt-2 italic border-t pt-2 border-slate-200">
                          Note: {repairData.device.condition}
                        </p>
                      </div>
                    </section>
                  </div>

                  {/* Right: Repair Details */}
                  <div className="space-y-8">
                    <section>
                      <h4 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase mb-4 tracking-tighter">
                        <ShieldCheck size={16} /> Service Details
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase">
                            Reported Issue
                          </p>
                          <p className="text-sm font-bold text-red-500">
                            {repairData.device.reportedIssue}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase">
                            Parts Replaced / Used
                          </p>
                          <p className="text-sm font-medium text-slate-700">
                            {repairData.service.partsReplaced}
                          </p>
                        </div>
                        <div className="pt-2">
                          <p className="text-2xl font-black text-orange-600 tracking-tight">
                            {repairData.service.totalCost}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Inclusive of all taxes
                          </p>
                        </div>
                      </div>
                    </section>

                    <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <p className="text-xs font-bold text-orange-800 uppercase mb-1 flex items-center gap-1">
                        <AlertCircle size={14} /> Technician's Log
                      </p>
                      <p className="text-sm text-orange-900 leading-relaxed font-medium">
                        "{repairData.service.technicianNote}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vertical Timeline */}
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h4 className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase mb-8 tracking-tighter">
                    <History size={16} /> Repair History & Logs
                  </h4>
                  <div className="relative space-y-6 ml-2">
                    {repairData.logs.map((log, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                              log.icon === "active"
                                ? "bg-white border-orange-500 text-orange-500 animate-pulse"
                                : "bg-slate-100 border-slate-200 text-slate-400"
                            }`}
                          >
                            {log.icon === "done" || log.icon === "received" ? (
                              <CheckCircle2
                                size={12}
                                className="text-green-500"
                              />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            )}
                          </div>
                          {index !== repairData.logs.length - 1 && (
                            <div className="w-0.5 h-10 bg-slate-100" />
                          )}
                        </div>
                        <div>
                          <p
                            className={`text-sm font-bold ${log.icon === "active" ? "text-slate-900" : "text-slate-500"}`}
                          >
                            {log.activity}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            {log.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Repair Plus Nepal • Quality Guarantee •{" "}
                  {repairData.service.warranty} Warranty
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
