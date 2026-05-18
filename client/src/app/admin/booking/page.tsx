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
  Layers,
  Activity,
  Hash,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner"; // Or your preferred toast library
import { useAppDispatch } from "@/hooks/hook";
import { createBooking } from "@/lib/store/booking/bookingSlice";

const DEVICE_TYPES = [
  { id: "iphone", label: "iPhone", icon: Smartphone, brand: "Apple" },
  { id: "macbook", label: "MacBook", icon: Laptop, brand: "Apple" },
  { id: "ipad", label: "iPad", icon: Tablet, brand: "Apple" },
  { id: "watch", label: "Apple Watch", icon: Watch, brand: "Apple" },
];

export default function Booking() {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    deviceType: "iphone",
    deviceBrand: "Apple",
    deviceModel: "",
    issueDescription: "",
    // Customer Info
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    // Additional UI-only fields (for display/notes)
    serialNumber: "",
    physicalCondition: "Grade A (Mint)",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleFinalSubmit = async () => {
    setLoading(true);
    // Combine fields if necessary or send as is
    const result = await dispatch(createBooking(formData as any));
    setLoading(false);

    if (result.success) {
      toast.success("Booking Created Successfully!");
      // Reset or redirect
    } else {
      toast.error(result.message);
    }
  };

  const inputStyles =
    "h-11 md:h-12 bg-white border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 rounded-xl transition-all text-sm w-full";
  const labelStyles =
    "text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 md:mb-2 inline-block ml-1";

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-4 px-3 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-[20px] md:rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mt-6 px-6 md:px-20 lg:px-32">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all border-4 ${step >= i ? "bg-slate-900 border-blue-100 text-white" : "bg-white border-slate-100 text-slate-300"}`}
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
            {step === 1 && (
              <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {DEVICE_TYPES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          deviceType: item.id,
                          deviceBrand: item.brand,
                        })
                      }
                      className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border-2 transition-all ${formData.deviceType === item.id ? "border-blue-600 bg-blue-50/50" : "border-slate-100 bg-white"}`}
                    >
                      <item.icon
                        className={`w-6 h-6 mb-2 ${formData.deviceType === item.id ? "text-blue-600" : "text-slate-400"}`}
                      />
                      <span className="text-[9px] md:text-xs font-black uppercase">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1">
                    <Label className={labelStyles}>Model Name</Label>
                    <Input
                      placeholder="e.g. iPhone 15 Pro"
                      className={inputStyles}
                      value={formData.deviceModel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deviceModel: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="md:col-span-full space-y-1">
                    <Label className={labelStyles}>Issue Description</Label>
                    <Textarea
                      placeholder="Describe the problem..."
                      className="min-h-[100px] rounded-2xl"
                      value={formData.issueDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          issueDescription: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1">
                    <Label className={labelStyles}>First Name</Label>
                    <Input
                      className={inputStyles}
                      value={formData.customerFirstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerFirstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>Last Name</Label>
                    <Input
                      className={inputStyles}
                      value={formData.customerLastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerLastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>Email</Label>
                    <Input
                      type="email"
                      className={inputStyles}
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className={labelStyles}>Phone</Label>
                    <Input
                      className={inputStyles}
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <Label className={labelStyles}>Address</Label>
                    <Input
                      className={inputStyles}
                      value={formData.customerAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in zoom-in-95 duration-500">
                <div className="bg-white rounded-[20px] border-2 border-slate-100 p-6">
                  <h3 className="font-black uppercase text-sm mb-4">Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>
                      <span className="text-slate-400">Device:</span>{" "}
                      {formData.deviceBrand} {formData.deviceModel}
                    </p>
                    <p>
                      <span className="text-slate-400">Customer:</span>{" "}
                      {formData.customerFirstName} {formData.customerLastName}
                    </p>
                    <p className="col-span-2">
                      <span className="text-slate-400">Issue:</span>{" "}
                      {formData.issueDescription}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-slate-100 gap-4">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1 || loading}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button
                disabled={loading}
                onClick={step === 3 ? handleFinalSubmit : nextStep}
                className={`w-full sm:w-auto h-11 md:h-12 px-10 rounded-xl font-bold uppercase tracking-widest ${step === 3 ? "bg-blue-600" : "bg-slate-900"}`}
              >
                {loading
                  ? "Processing..."
                  : step === 3
                    ? "Finalize Booking"
                    : "Next Step"}
                {step !== 3 && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
