"use client";

import { useState } from "react";
import {
  Settings2,
  Globe,
  Mail,
  Save,
  UploadCloud,
  Clock,
  Languages,
  ShieldCheck,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = [
  { label: "General", value: "general", icon: <Globe className="w-4 h-4" /> },
  { label: "Email", value: "email", icon: <Mail className="w-4 h-4" /> },
  { label: "Other", value: "other", icon: <Settings2 className="w-4 h-4" /> },
];

export default function SettingsComponent() {
  const [activeTab, setActiveTab] = useState("general");
  const [form, setForm] = useState({
    siteName: "",
    siteDescription: "",
    logoUrl: "",
    faviconUrl: "",
    smtpHost: "",
    smtpPort: "",
    smtpEmail: "",
    smtpPassword: "",
    phone: "",
    timezone: "Asia/Kathmandu",
    language: "en",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (section: string) => {
    console.log(`Saving ${section}...`, form);
  };

  const inputStyles =
    "h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-all font-medium text-sm sm:text-base";

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="p-6 sm:p-8 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
          <div className="space-y-1">
            <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              System Settings
            </h1>
            <p className="text-[11px] sm:text-sm font-medium text-slate-500">
              Configure your application preferences and system variables.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-xs font-black bg-slate-900 text-white uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Admin
              Access
            </span>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-4 pt-5 sm:mt-5 overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 pb-3 sm:pb-4  sm:text-sm text-sm font-bold  border-b-2 ${
                activeTab === tab.value
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-6 sm:p-8">
        {activeTab === "general" && (
          <div className="max-w-7xl space-y-8">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <Label className="text-[11px] sm:text-xs font-black uppercase text-slate-400 ">
                  Site Name
                </Label>
                <Input
                  name="siteName"
                  value={form.siteName}
                  onChange={handleChange}
                  placeholder="e.g. Repair Management System"
                  className={inputStyles}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] sm:text-xs font-black uppercase text-slate-400 ">
                  Logo URL
                </Label>
                <Input
                  name="logoUrl"
                  value={form.logoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                  className={inputStyles}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label className="text-[11px] sm:text-xs font-black uppercase text-slate-400 tracking-widest">
                  Favicon Setup
                </Label>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30">
                  <div className="flex-1 w-full">
                    <Input
                      type="file"
                      className="cursor-pointer bg-white border-slate-200 file:font-bold file:text-xs sm:file:text-sm file:uppercase w-full"
                      onChange={(e: any) => {
                        if (e.target.files?.[0]) {
                          setForm({
                            ...form,
                            faviconUrl: URL.createObjectURL(e.target.files[0]),
                          });
                        }
                      }}
                    />
                  </div>
                  {form.faviconUrl ? (
                    <img
                      src={form.faviconUrl}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-md border-2 border-white bg-white p-1 object-contain"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 border-slate-100 bg-slate-100 flex items-center justify-center">
                      <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label className="text-[11px] sm:text-xs font-black uppercase text-slate-400 tracking-widest">
                  Site Description
                </Label>
                <Textarea
                  name="siteDescription"
                  value={form.siteDescription}
                  onChange={handleChange}
                  placeholder="Write a short description of your business..."
                  className="min-h-[120px] sm:min-h-[140px] bg-slate-50/50 border-slate-200 font-medium p-3 sm:p-4 focus:bg-white transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-50">
              <Button
                onClick={() => handleSubmit("General")}
                className="bg-slate-900 font-black uppercase text-[11px] sm:text-xs tracking-widest hover:bg-slate-800 h-12 px-6 sm:px-10 rounded-xl transition-all shadow-lg shadow-slate-200"
              >
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* --- Email Tab --- */}
        {activeTab === "email" && (
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {["smtpHost", "smtpPort", "smtpEmail", "smtpPassword"].map(
                (field, i) => {
                  const labels = [
                    "SMTP Host",
                    "SMTP Port",
                    "Sender Email",
                    "App Password",
                  ];
                  return (
                    <div className="space-y-2" key={field}>
                      <Label className="text-[11px] sm:text-xs font-black uppercase text-slate-400 tracking-widest">
                        {labels[i]}
                      </Label>
                      <Input
                        type={field === "smtpPassword" ? "password" : "text"}
                        name={field}
                        value={(form as any)[field]}
                        onChange={handleChange}
                        placeholder={
                          field === "smtpHost"
                            ? "smtp.gmail.com"
                            : field === "smtpPort"
                              ? "587"
                              : field === "smtpEmail"
                                ? "admin@domain.com"
                                : "••••••••••••"
                        }
                        className={inputStyles}
                      />
                    </div>
                  );
                },
              )}
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <Button
                onClick={() => handleSubmit("Email")}
                className="bg-slate-900 font-black uppercase text-[11px] sm:text-xs tracking-widest hover:bg-slate-800 h-12 px-6 sm:px-10 rounded-xl shadow-lg shadow-slate-200"
              >
                <Save className="w-4 h-4 mr-2" /> Update Connection
              </Button>
            </div>
          </div>
        )}

        {/* --- Other Tab --- */}
        {activeTab === "other" && (
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <Label className="text-[11px] sm:text-xs font-black uppercase text-slate-400 tracking-widest">
                  Support Contact
                </Label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputStyles}
                  placeholder="+977..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label className="text-[11px] sm:text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" /> Timezone
                  </Label>
                  <Select
                    value={form.timezone}
                    onValueChange={(v) => setForm({ ...form, timezone: v })}
                  >
                    <SelectTrigger className={inputStyles}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kathmandu">
                        Asia/Kathmandu
                      </SelectItem>
                      <SelectItem value="UTC">UTC (Universal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] sm:text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-1">
                    <Languages className="w-3 h-3 sm:w-4 sm:h-4" /> Language
                  </Label>
                  <Select
                    value={form.language}
                    onValueChange={(v) => setForm({ ...form, language: v })}
                  >
                    <SelectTrigger className={inputStyles}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="np">Nepali (NP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-50">
              <Button
                onClick={() => handleSubmit("Other")}
                className="bg-slate-900 font-black uppercase text-[11px] sm:text-xs tracking-widest hover:bg-slate-800 h-12 px-6 sm:px-10 rounded-xl shadow-lg shadow-slate-200"
              >
                <Save className="w-4 h-4 mr-2" /> Finalize Config
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
