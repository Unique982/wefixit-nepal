"use client";

import React, { useState } from "react";
import {
  X,
  Save,
  Smartphone,
  User,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface EditOrderSheetProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function EditOrderSheet({
  isOpen,
  onClose,
  order,
}: EditOrderSheetProps) {
  if (!order) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[540px] p-0 border-l border-slate-100 bg-white overflow-y-auto">
        {/* Custom Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-50 px-6 py-5 flex items-center justify-between">
          <div>
            <SheetTitle className="text-xl font-black tracking-tight text-slate-900 uppercase">
              Edit Order {order.id}
            </SheetTitle>
            <SheetDescription className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Update repair details and status
            </SheetDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full h-9 w-9 bg-slate-50 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-8 space-y-8">
          {/* Section 1: Basic Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Device Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Customer Name
                </Label>
                <Input
                  defaultValue={order.customer}
                  className="rounded-xl border-slate-200 h-11 font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Device Model
                </Label>
                <Input
                  defaultValue={order.device}
                  className="rounded-xl border-slate-200 h-11 font-semibold"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-slate-50" />

          {/* Section 2: Status & Technician */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-orange-50 rounded-lg text-orange-600">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Repair Management
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Order Status
                </Label>
                <Select defaultValue={order.status}>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                    <SelectItem value="Pending" className="font-bold py-2">
                      Pending
                    </SelectItem>
                    <SelectItem
                      value="In Progress"
                      className="font-bold py-2 text-orange-600"
                    >
                      In Progress
                    </SelectItem>
                    <SelectItem
                      value="Completed"
                      className="font-bold py-2 text-emerald-600"
                    >
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                  Assign Technician
                </Label>
                <Select defaultValue={order.technician}>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                    <SelectItem value="Bishal Rai" className="font-bold py-2">
                      Bishal Rai
                    </SelectItem>
                    <SelectItem value="Suman KC" className="font-bold py-2">
                      Suman KC
                    </SelectItem>
                    <SelectItem value="Unassigned" className="font-bold py-2">
                      Unassigned
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                Technician Notes
              </Label>
              <Textarea
                placeholder="Write specific instructions or issues..."
                className="min-h-[120px] rounded-2xl border-slate-200 p-4 font-medium leading-relaxed resize-none focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Section 3: Costing */}
          <div className="bg-slate-50 rounded-[2rem] p-6 space-y-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Estimated Cost (Rs.)
              </Label>
              <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase">
                Estimate Only
              </span>
            </div>
            <Input
              type="number"
              defaultValue="12500"
              className="bg-white border-none h-14 rounded-2xl text-2xl font-black text-slate-900 shadow-sm"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-slate-50 p-6 flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest border-slate-200 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button className="flex-[2] h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20">
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
