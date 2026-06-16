"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Eye,
  Edit3,
  Trash2,
  PlusCircle,
  Download,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const trackingOrders = [
  {
    id: "RS-9842",
    customer: "Olivia Rhye",
    email: "olivia@untitledui.com",
    device: "iPhone 14 Pro",
    status: "In Progress",
    technician: "Bishal Rai",
    avatar: "OR",
  },
  {
    id: "RS-9840",
    customer: "Phoenix Baker",
    email: "phoenix@untitledui.com",
    device: "MacBook Air M2",
    status: "Completed",
    technician: "Suman KC",
    avatar: "PB",
  },
  {
    id: "RS-9838",
    customer: "Lana Steiner",
    email: "lana@untitledui.com",
    device: "iPad Pro 11",
    status: "Pending",
    technician: "Unassigned",
    avatar: "LS",
  },
];

const statusStyles: Record<string, { color: string; bg: string; icon: any }> = {
  Pending: {
    color: "text-slate-500",
    bg: "border-slate-200 bg-slate-50",
    icon: Clock,
  },
  "In Progress": {
    color: "text-amber-600",
    bg: "border-amber-100 bg-amber-50/50",
    icon: AlertCircle,
  },
  Completed: {
    color: "text-emerald-600",
    bg: "border-emerald-100 bg-emerald-50/50",
    icon: CheckCircle2,
  },
};

export default function TrackingManagement() {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return trackingOrders.filter((order) => {
      const matchesStatus =
        filterStatus === "All" || order.status === filterStatus;
      const matchesSearch =
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.device.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [filterStatus, searchQuery]);

  return (
    <TooltipProvider>
      <div className="p-4 md:p-8 bg-slate-50/50 dark:bg-slate-950 min-h-screen transition-all">
        <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
          {/* Header - Stacked on Mobile, Row on Desktop */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">
                Repair <span className="text-blue-600">Tracking</span>
              </h1>
              <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-[0.2em] opacity-70">
                Manage active repair orders
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <Button
                variant="outline"
                className="flex-1 lg:flex-none h-11 border-slate-200 bg-white font-black text-[10px] uppercase tracking-widest gap-2 rounded-xl shadow-sm"
              >
                <Download className="w-4 h-4" /> Export
              </Button>
              <Button className="flex-1 lg:flex-none h-11 bg-slate-900 hover:bg-black text-white font-black text-[10px] uppercase tracking-widest rounded-xl px-6 shadow-xl shadow-slate-900/20">
                <PlusCircle className="w-4 h-4 mr-2" /> New Order
              </Button>
            </div>
          </div>

          {/* Stats - 1 col on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                label: "Total Repairs",
                val: trackingOrders.length,
                icon: Package,
                color: "text-blue-600",
              },
              {
                label: "Active",
                val: 1,
                icon: AlertCircle,
                color: "text-amber-600",
              },
              {
                label: "Done",
                val: 1,
                icon: CheckCircle2,
                color: "text-emerald-600",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all"
              >
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] group-hover:text-blue-400 transition-colors">
                    {stat.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-black mt-1 text-slate-900 dark:text-white">
                    {stat.val}
                  </p>
                </div>
                <stat.icon
                  className={cn(
                    "w-10 h-10 opacity-10 group-hover:opacity-100 transition-all duration-500",
                    stat.color,
                  )}
                />
              </div>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 bg-white border-slate-200 rounded-xl shadow-sm focus-visible:ring-blue-100 placeholder:text-slate-400 placeholder:font-bold placeholder:text-[10px] placeholder:uppercase"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 px-6 border-slate-200 bg-white rounded-xl font-black text-[10px] uppercase tracking-widest gap-3 shrink-0",
                    filterStatus !== "All" &&
                      "border-blue-500 text-blue-600 bg-blue-50/50",
                  )}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {filterStatus === "All" ? "Filter Status" : filterStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl p-2 shadow-2xl border-slate-100"
              >
                <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 p-2 tracking-widest">
                  Filter By
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["All", "Pending", "In Progress", "Completed"].map(
                  (status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className="flex items-center justify-between rounded-lg font-bold text-xs py-3 px-3 cursor-pointer"
                    >
                      {status}
                      {filterStatus === status && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Table Container - Mobile Scroll Fix */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <Table className="min-w-[800px] lg:min-w-full">
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-b border-slate-100 hover:bg-transparent">
                    <TableHead className="py-5 px-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Order ID
                    </TableHead>
                    <TableHead className="py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Customer
                    </TableHead>
                    <TableHead className="py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Device
                    </TableHead>
                    <TableHead className="py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Status
                    </TableHead>
                    <TableHead className="py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Technician
                    </TableHead>
                    <TableHead className="py-5 px-6 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((order) => (
                      <TableRow
                        key={order.id}
                        className="group border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                      >
                        <TableCell className="py-5 px-6 font-black text-sm text-blue-600 tracking-tighter">
                          {order.id}
                        </TableCell>
                        <TableCell className="py-5">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 rounded-xl border-2 border-white shadow-sm shrink-0">
                              <AvatarFallback className="bg-slate-100 text-[10px] font-black text-slate-600">
                                {order.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold text-slate-900 truncate">
                                {order.customer}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase truncate tracking-tighter">
                                {order.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-5">
                          <span className="text-[10px] font-black uppercase tracking-tight text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/50">
                            {order.device}
                          </span>
                        </TableCell>
                        <TableCell className="py-5">
                          <div
                            className={cn(
                              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest shadow-sm",
                              statusStyles[order.status]?.color,
                              statusStyles[order.status]?.bg,
                            )}
                          >
                            <div className="h-1.5 w-1.5 rounded-full animate-pulse bg-current" />
                            {order.status}
                          </div>
                        </TableCell>
                        <TableCell className="py-5 font-bold text-xs text-slate-600 italic">
                          {order.technician}
                        </TableCell>
                        <TableCell className="py-5 px-6 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <ActionIcon
                              icon={Eye}
                              label="View"
                              color="hover:text-blue-600 hover:bg-blue-50"
                            />
                            <ActionIcon
                              icon={Edit3}
                              label="Edit"
                              color="hover:text-amber-600 hover:bg-amber-50"
                            />
                            <ActionIcon
                              icon={Trash2}
                              label="Delete"
                              color="hover:text-red-600 hover:bg-red-50"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-48 text-center">
                        <div className="flex flex-col items-center justify-center space-y-2 opacity-30">
                          <Search className="w-8 h-8" />
                          <p className="font-black uppercase text-[11px] tracking-[0.3em]">
                            No Results Found
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination - Column on Mobile */}
            <div className="px-6 py-5 bg-slate-50/30 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest order-2 sm:order-1">
                Showing{" "}
                <span className="text-slate-900">{filteredData.length}</span> of{" "}
                {trackingOrders.length}
              </p>
              <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none h-10 px-4 rounded-xl border-slate-200 bg-white font-black text-[10px] uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none h-10 px-4 rounded-xl border-slate-200 bg-white font-black text-[10px] uppercase tracking-widest"
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function ActionIcon({
  icon: Icon,
  label,
  color,
}: {
  icon: any;
  label: string;
  color: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-9 w-9 rounded-xl transition-all", color)}
        >
          <Icon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="bg-slate-900 text-[9px] font-black uppercase tracking-[0.2em] text-white border-0 py-2 px-3"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
