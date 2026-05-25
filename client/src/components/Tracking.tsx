"use client";

import React, { useState } from "react";
import { Status } from "@/lib/types/type";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

import {
  Search,
  Printer,
  Download,
  Smartphone,
  ClipboardList,
  History,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";


import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import {
  trackRepair,
  resetTrackingState,
} from "@/lib/store/tracking/trackingSlice";

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const dispatch = useAppDispatch();
  const { tracking, status } = useAppSelector((state) => state.tracking);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTrackingId(value);
    if (value.trim() === "") {
      dispatch(resetTrackingState());
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      dispatch(trackRepair(trackingId.trim()));
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const booking = tracking?.booking;
  const timeline = tracking?.timeline || [];

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "Pending Drop-off":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "Diagnosing":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "In Progress":
        return "bg-orange-500/20 text-orange-500 border-orange-500/30";
      case "Ready":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "Completed":
        return "bg-emerald-500/20 text-emerald-500 border-emerald-500/30";
      case "Cancelled":
        return "bg-red-500/20 text-red-500 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("repair-job-sheet");
    if (!element) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Repair-Ticket-${trackingId}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">

      <div className="max-w-4xl mx-auto px-4 pt-10">
        {/* Search */}
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
                placeholder="Enter Job ID (e.g. WF-H9C02G)"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all font-bold text-lg"
                value={trackingId}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              disabled={status === Status.LOADING || !trackingId.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-w-[140px]"
            >
              {status === Status.LOADING ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Searching...
                </>
              ) : (
                <>
                  <Search size={18} /> Search
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error */}
        {status === Status.ERROR && trackingId.trim() !== "" && (
          <div className="max-w-xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 animate-in fade-in duration-300">
            <AlertCircle size={20} className="shrink-0" />
            <span>Job ID not found. Please check your tracking ID again.</span>
          </div>
        )}

        {/* Success Content */}
        {status === Status.SUCCESS && booking && trackingId.trim() !== "" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex justify-between items-end print:hidden">
              <div>
                <span className="text-sm font-bold text-orange-600 uppercase tracking-widest">
                  Repair Ticket
                </span>
                <h2 className="text-2xl font-black italic">
                  {booking.trackingId}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition-all disabled:bg-slate-700"
                >
                  {isDownloading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Download size={16} />
                  )}
                  {isDownloading ? "Generating..." : "Download PDF"}
                </button>
              </div>
            </div>

            {/* Ticket Card */}
            <div
              id="repair-job-sheet"
              className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden"
            >
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-center text-orange-400 shrink-0">
                      <ClipboardList size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] bg-orange-500/20 text-orange-300 font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                          Live Ticket
                        </span>
                      </div>
                      <h2 className="text-2xl font-extrabold tracking-tight">
                        {booking.trackingId}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                      Current status
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(booking.currentStatus)}`}
                    >
                      {booking.currentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    <section className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl space-y-4">
                      <h4 className="flex items-center gap-2.5 text-xs font-black text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                        <User size={15} className="text-orange-500" /> Customer
                        Information
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <User size={14} />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                              Full Name
                            </p>
                            <p className="font-bold text-slate-800 text-sm">
                              {booking.user?.firstName} {booking.user?.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <Phone size={14} />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                              Contact Number
                            </p>
                            <p className="font-bold text-slate-800 text-sm">
                              {booking.user?.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <Mail size={14} />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                              Email Address
                            </p>
                            <p className="font-bold text-slate-800 text-sm break-all">
                              {booking.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl space-y-4">
                      <h4 className="flex items-center gap-2.5 text-xs font-black text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                        <Smartphone size={15} className="text-orange-500" />{" "}
                        Device Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 font-medium">
                            Device Type
                          </span>
                          <span className="font-bold text-slate-800 bg-white border border-slate-150 px-2.5 py-1 rounded-lg text-xs">
                            {booking.deviceType}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500 font-medium">
                            Model Details
                          </span>
                          <span className="font-bold text-slate-800">
                            {booking.deviceModel}
                          </span>
                        </div>
                        <div className="border-t border-slate-100 pt-3 mt-1 flex items-center gap-2 text-xs text-slate-400 font-medium">
                          <Calendar size={14} />
                          <span>
                            Registered on {formatDate(booking.createdAt)}
                          </span>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    <section className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl space-y-4">
                      <h4 className="flex items-center gap-2.5 text-xs font-black text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                        <ShieldCheck size={15} className="text-orange-500" />{" "}
                        Service Details
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                              Updates
                            </p>
                            <p className="text-sm font-bold text-slate-800">
                              {timeline.length} Logs
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                              Status Index
                            </p>
                            <p className="text-sm font-bold text-orange-600">
                              {booking.currentStatus}
                            </p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-slate-100">
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                            System Warranty Disclaimer
                          </p>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Standard repairs are protected by system policies.
                            Please keep this digital receipt for claiming
                            warranty.
                          </p>
                        </div>
                      </div>
                    </section>

                    {timeline.length > 0 && timeline[0].notes && (
                      <div className="p-5 bg-orange-50/60 rounded-2xl border border-orange-100/70 space-y-2.5">
                        <p className="text-[10px] font-black text-orange-800 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertCircle size={14} className="text-orange-500" />{" "}
                          Latest Update Note
                        </p>
                        <p className="text-sm text-orange-950 leading-relaxed font-semibold italic">
                          "{timeline[0].notes}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100">
                  <h4 className="flex items-center gap-2.5 text-xs font-black text-slate-400 uppercase tracking-wider mb-8">
                    <History size={15} className="text-orange-500" /> Repair
                    History & Logs
                  </h4>
                  <div className="relative pl-6 border-l border-slate-100 space-y-8 ml-3">
                    {timeline.map((log, index) => {
                      const isActive = index === 0;
                      return (
                        <div
                          key={index}
                          className="relative flex flex-col md:flex-row md:items-start justify-between gap-2"
                        >
                          <div
                            className={`absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 bg-white ${isActive ? "border-orange-500 ring-4 ring-orange-50" : "border-slate-200"}`}
                          >
                            {isActive ? (
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                            ) : (
                              <CheckCircle2
                                size={10}
                                className="text-green-500"
                              />
                            )}
                          </div>
                          <div className="space-y-1 max-w-xl">
                            <p
                              className={`text-sm font-bold tracking-tight ${isActive ? "text-slate-900" : "text-slate-500"}`}
                            >
                              {log.status}
                            </p>
                            {log.notes && (
                              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                {log.notes}
                              </p>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mt-1 md:mt-0">
                            {formatDate(log.updatedAt || log.createdAt)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-5 border-t border-slate-100 text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">
                  Repair Plus Nepal • Quality Guarantee • Live Status Tracking
                  Verified
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
