"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Laptop,
  Watch,
  Tablet,
  ChevronRight,
  ChevronLeft,
  Calendar,
  User,
  Phone,
  MapPin,
  Wrench,
  CheckCircle,
  AlertCircle,
  Cpu,
  ClipboardList,
  Fingerprint,
  ShieldCheck,
  Banknote,
  UserCog,
  Construction,
  Activity,
  Hash,
  Layers,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const DEVICE_TYPES = [
  { id: "iphone", label: "iPhone", icon: Smartphone },
  { id: "macbook", label: "MacBook", icon: Laptop },
  { id: "ipad", label: "iPad", icon: Tablet },
  { id: "watch", label: "Apple Watch", icon: Watch },
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Device Info
    deviceType: "iphone",
    modelName: "",
    serialNumber: "",
    icloudStatus: "OFF",
    physicalCondition: "Grade A (Mint)", // Added: Crucial for repair shops

    // Technical Info
    issue: "",
    estimatedCost: "1500",
    advancePaid: "0", // Added: Finance tracking
    technician: "Main Tech Lab",
    priority: "Standard", // Added: Workflow management

    // Customer Info
    customerName: "",
    phone: "",
    altPhone: "", // Added: Recovery contact
    address: "",
    date: new Date().toISOString().split("T")[0],
    completionDate: "", // Added: Customer expectation management
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const inputStyles =
    "h-11 md:h-12 bg-white border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 rounded-xl transition-all text-sm w-full";
  const labelStyles =
    "text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 md:mb-2 inline-block ml-1";

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-4 px-3 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-[20px] md:rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          {/* Header */}
          <div className="p-5 md:p-10 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-slate-900 text-[9px] md:text-[10px] font-black text-white px-2 py-0.5 rounded uppercase tracking-tighter">
                  RepairPlus Admin
                </span>
                <span className="bg-blue-600 text-[9px] md:text-[10px] font-black text-white px-2 py-0.5 rounded uppercase tracking-tighter">
                  New Intake
                </span>
              </div>
              <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                Device Diagnostics & Entry
              </h2>
              <p className="text-[10px] md:text-sm font-medium text-slate-500 mt-0.5">
                Repair Tracking System — Kathmandu Hub
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end opacity-40">
              <p className="text-[10px] font-black uppercase text-slate-400">
                Current Session
              </p>
              <p className="text-xs font-bold text-slate-900">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mt-6 px-6 md:px-20 lg:px-32">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all border-4 ${
                      step >= i
                        ? "bg-slate-900 border-blue-100 text-white shadow-lg"
                        : "bg-white border-slate-100 text-slate-300"
                    }`}
                  >
                    {step > i ? (
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      i
                    )}
                  </div>
                </div>
                {i < 3 && (
                  <div
                    className={`h-[2px] flex-1 mx-2 rounded-full ${step > i ? "bg-slate-900" : "bg-slate-200"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="p-5 md:p-10">
            {/* STEP 1: DEVICE DETAILS */}
            {step === 1 && (
              <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {DEVICE_TYPES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        setFormData({ ...formData, deviceType: item.id })
                      }
                      className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border-2 transition-all group ${
                        formData.deviceType === item.id
                          ? "border-blue-600 bg-blue-50/50 shadow-inner"
                          : "border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50"
                      }`}
                    >
                      <item.icon
                        className={`w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 ${formData.deviceType === item.id ? "text-blue-600" : "text-slate-400"}`}
                      />
                      <span
                        className={`text-[9px] md:text-xs font-black uppercase tracking-tighter ${formData.deviceType === item.id ? "text-blue-700" : "text-slate-500"}`}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <div className="space-y-1">
                    <Label className={labelStyles}>Apple Model Name</Label>
                    <div className="relative">
                      <Cpu className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="e.g. iPhone 15 Pro Max"
                        className={`${inputStyles} pl-11`}
                        value={formData.modelName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            modelName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>Serial / IMEI Number</Label>
                    <div className="relative">
                      <Fingerprint className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Enter Serial Number"
                        className={`${inputStyles} pl-11`}
                        value={formData.serialNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serialNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>Physical Condition</Label>
                    <div className="relative">
                      <Activity className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Scratches, Dents, etc."
                        className={`${inputStyles} pl-11`}
                        value={formData.physicalCondition}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            physicalCondition: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>iCloud Status</Label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="ON / OFF / Bypass"
                        className={`${inputStyles} pl-11`}
                        value={formData.icloudStatus}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            icloudStatus: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>Job Priority</Label>
                    <div className="relative">
                      <Layers className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Standard / Urgent"
                        className={`${inputStyles} pl-11`}
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({ ...formData, priority: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>Estimated Cost (Rs.)</Label>
                    <div className="relative">
                      <Banknote className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        type="number"
                        placeholder="Amount"
                        className={`${inputStyles} pl-11`}
                        value={formData.estimatedCost}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            estimatedCost: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="md:col-span-full space-y-1">
                    <Label className={labelStyles}>
                      Detailed Fault Description
                    </Label>
                    <Textarea
                      placeholder="Describe the problem in detail (e.g., Water damage, No power, Cracked screen)..."
                      className="min-h-[100px] md:min-h-[120px] rounded-2xl border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 resize-none p-4 text-sm"
                      onChange={(e) =>
                        setFormData({ ...formData, issue: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: CUSTOMER & FINANCIALS */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1">
                    <Label className={labelStyles}>Customer Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        className={`${inputStyles} pl-11`}
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customerName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>Primary Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="98XXXXXXXX"
                        className={`${inputStyles} pl-11`}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>
                      Advance Payment (Optional)
                    </Label>
                    <div className="relative">
                      <Hash className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Advance Amount"
                        className={`${inputStyles} pl-11`}
                        value={formData.advancePaid}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            advancePaid: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>Expected Completion</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        type="date"
                        className={`${inputStyles} pl-11`}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            completionDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <Label className={labelStyles}>
                      Pickup/Delivery Address
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 md:top-4 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Location in Kathmandu/Nepal"
                        className={`${inputStyles} pl-11`}
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PREVIEW */}
            {step === 3 && (
              <div className="space-y-6 animate-in zoom-in-95 duration-500">
                <div className="bg-white rounded-[20px] border-2 border-slate-100 overflow-hidden shadow-sm">
                  <div className="bg-slate-900 p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 p-2 rounded-lg shrink-0">
                        <ClipboardList className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white text-[11px] md:text-xs font-black uppercase tracking-widest leading-none">
                          Job Sheet Verification
                        </h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-1">
                          ID: RP-{Math.floor(Math.random() * 90000) + 10000}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full uppercase">
                      Review Only
                    </span>
                  </div>

                  <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase border-b pb-2">
                        Technical Summary
                      </h4>
                      <div className="text-sm space-y-2">
                        <p className="flex justify-between font-bold">
                          <span>Model:</span> {formData.modelName}
                        </p>
                        <p className="flex justify-between">
                          <span>Condition:</span> {formData.physicalCondition}
                        </p>
                        <p className="flex justify-between text-blue-600 font-mono">
                          <span>Serial:</span> {formData.serialNumber}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase border-b pb-2">
                        Finance & Schedule
                      </h4>
                      <div className="text-sm space-y-2">
                        <p className="flex justify-between">
                          <span>Estimate:</span> Rs. {formData.estimatedCost}
                        </p>
                        <p className="flex justify-between text-emerald-600">
                          <span>Advance:</span> Rs. {formData.advancePaid}
                        </p>
                        <p className="flex justify-between font-bold">
                          <span>Due Date:</span>{" "}
                          {formData.completionDate || "Not Set"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase border-b pb-2">
                        Client Info
                      </h4>
                      <div className="text-sm space-y-2">
                        <p className="font-bold">{formData.customerName}</p>
                        <p className="text-slate-500">{formData.phone}</p>
                        <p className="text-slate-500 truncate">
                          {formData.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] md:text-[11px] leading-relaxed text-amber-900 font-medium">
                    Please verify the **Serial Number** and **Physical
                    Condition** grade. These cannot be changed once the Job
                    Sheet is sent to the customer portal.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 md:mt-10 pt-6 md:pt-8 border-t border-slate-100 gap-4">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1}
                className="w-full sm:w-auto text-[10px] md:text-xs font-black uppercase tracking-widest h-11 md:h-12 px-6 hover:bg-slate-50 disabled:opacity-0"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button
                onClick={
                  step === 3
                    ? () => alert("Job Created in Database!")
                    : nextStep
                }
                className={`w-full sm:w-auto h-11 md:h-12 px-8 md:px-10 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 ${step === 3 ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-900 hover:bg-blue-600 text-white"}`}
              >
                {step === 3 ? "Finalize Job Entry" : "Next Step"}
                {step !== 3 && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
