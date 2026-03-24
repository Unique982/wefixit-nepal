"use client";

import { useState } from "react";
import {
  User,
  Lock,
  Camera,
  Mail,
  ShieldCheck,
  UserCircle,
  Hash,
  MapPin,
  Save,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminProfileClean() {
  const [profile, setProfile] = useState({
    fullName: "Unique Neupane",
    email: "admin@wefixit.com.np",
    adminId: "WF-KA-01",
    branch: "Kathmandu Central",
    avatar: "",
  });

  // एकदमै सादा र सफा स्टायल
  const inputStyles =
    "h-10 bg-white border-slate-300 focus:border-blue-600 focus:ring-0 transition-all text-sm rounded-md shadow-sm";

  const labelStyles =
    "text-[12px] font-semibold text-slate-700 mb-1.5 inline-block";

  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg shadow-sm">
      {/* HEADER: No Gradients, Just Clean Border */}
      <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Manage your administrative profile and security credentials.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded text-blue-700">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Super Admin
          </span>
        </div>
      </div>

      <div className="p-8">
        {/* SECTION: Personal Info */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8 pb-2 border-b border-slate-50">
            <UserCircle className="w-5 h-5 text-slate-400" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
              Personal Information
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* AVATAR: Square with subtle rounds, more 'Pro' look */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className="w-28 h-28 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                  <User className="w-10 h-10 text-slate-300" />
                </div>
                <label className="absolute -bottom-2 -right-2 p-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 shadow-sm transition-all text-slate-600">
                  <Camera className="w-4 h-4" />
                  <input type="file" className="hidden" />
                </label>
              </div>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                Profile Photo
              </p>
            </div>

            {/* FORM: Grid with precise spacing */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className={labelStyles}>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    defaultValue={profile.fullName}
                    className={`${inputStyles} pl-9`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className={labelStyles}>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    type="email"
                    defaultValue={profile.email}
                    className={`${inputStyles} pl-9`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className={labelStyles}>Admin ID</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    defaultValue={profile.adminId}
                    className={`${inputStyles} pl-9 bg-slate-50`}
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className={labelStyles}>Branch</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Input
                    defaultValue={profile.branch}
                    className={`${inputStyles} pl-9`}
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end pt-4">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold h-10 px-6 rounded-md shadow-sm transition-all active:scale-95">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Security */}
        <div>
          <div className="flex items-center gap-2 mb-8 pb-2 border-b border-slate-50">
            <Lock className="w-5 h-5 text-slate-400" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
              Security & Password
            </h2>
          </div>

          <div className="max-w-2xl space-y-6">
            <div className="space-y-1">
              <Label className={labelStyles}>Current Password</Label>
              <Input
                type="password"
                placeholder="••••••••••••"
                className={inputStyles}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className={labelStyles}>New Password</Label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  className={inputStyles}
                />
              </div>
              <div className="space-y-1">
                <Label className={labelStyles}>Verify Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  className={inputStyles}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="outline"
                className="text-xs font-bold border-slate-300 h-10 px-6 rounded-md hover:bg-slate-50 transition-all active:scale-95"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
