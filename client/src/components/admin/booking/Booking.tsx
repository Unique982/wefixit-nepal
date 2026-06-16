"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Filter,
  Search,
  Plus,
  Edit,
  Loader2,
  CheckCircle,
} from "lucide-react";

// Core Shadcn Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Status } from "@/lib/types/type";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import {
  adminViewAllBooking,
  bookingStatusUpdate,
} from "@/lib/store/booking/bookingSlice";
import { toast } from "sonner";

// Status Palette
const statusColors: Record<string, string> = {
  "Pending Approval": "bg-pink-50 text-pink-600 border-pink-100",
  "Pending Drop-off": "bg-amber-50 text-amber-600 border-amber-100",
  Diagnosing: "bg-blue-50 text-blue-600 border-blue-100",
  "Waiting for Parts": "bg-orange-50 text-orange-600 border-orange-100",
  "In Progress": "bg-indigo-50 text-indigo-600 border-indigo-100",
  "Ready for Pickup": "bg-purple-50 text-purple-600 border-purple-100",
  Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
};

export default function RepairBookingsPage() {
  const dispatch = useAppDispatch();

  // Extract data from your slice state
  const { bookings, status, meta } = useAppSelector((state) => state.booking);

  // Filter and pagination local states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch dynamic data from the database on parameter mutations
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(
        adminViewAllBooking({
          page: currentPage,
          limit: itemsPerPage,
          status: statusFilter === "All" ? undefined : statusFilter,
          search: searchTerm || undefined,
        }),
      );
    }, 400); // Debounce to prevent server flooding on every single stroke keypress

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, searchTerm, statusFilter, currentPage]);

  // Reset page layout frame if a search metric mutates
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const loadingToast = toast.loading("Updating status...");
    try {
      const result = await dispatch(
        bookingStatusUpdate(id, {
          status: newStatus,
          notes: `Admin updated status to ${newStatus}`,
        }) as any,
      );

      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success(`Status successfully updated to ${newStatus}!`);
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("An unexpected error occurred");
    }
  };
  return (
    <div className="w-full space-y-5 max-w-full overflow-hidden">
      {/* ─── 1. TOP SECTION HEADING WITH ADD BOOKING BUTTON ─── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-0.5">
          <h1 className="text-[22px] md:text-2xl font-bold tracking-tight text-slate-900">
            Repair Bookings
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-normal">
            Manage all customer repair requests dynamically from the database.
          </p>
        </div>

        {/* Add Booking Button */}
        <Link href="/admin/dashboard/booking/add" className="w-full sm:w-auto">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm h-10 px-4 rounded-xl shadow-sm flex items-center gap-2 shrink-0 w-full justify-center transition-colors">
            <Plus className="w-4 h-4" />
            Add Booking
          </Button>
        </Link>
      </div>

      {/* ─── 2. INTEGRATED CARD CONTAINER ─── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col w-full">
        {/* 🔍 FILTER ENGINE HEADER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-b border-slate-100 bg-white">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search tracking ID, customer name or phone..."
              className="pl-10 h-10 w-full bg-white border-slate-200/80 rounded-xl text-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-200 shadow-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="w-full sm:w-auto shrink-0">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full sm:w-[160px] h-10 bg-white border-slate-200/80 rounded-xl text-sm text-slate-700 font-medium shadow-none focus:ring-0">
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5 text-slate-400" />
                  <SelectValue placeholder="All Statuses" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending Approval">
                  Pending Approval
                </SelectItem>
                <SelectItem value="Pending Drop-off">
                  Pending Drop-off
                </SelectItem>
                <SelectItem value="Diagnosing">Diagnosing</SelectItem>
                <SelectItem value="Waiting for Parts">
                  Waiting for Parts
                </SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Ready for Pickup">
                  Ready for Pickup
                </SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 📊 DYNAMIC TABLE INTERFACE */}
        {/* Removed 'scrollbar-thin' to prevent custom styled system trackbars, used clean layout styling */}
        <div className="w-full overflow-x-auto relative min-h-[250px]">
          {status === Status.LOADING && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                Synchronizing Database...
              </div>
            </div>
          )}

          {/* Table layout adjustments: Switched from fixed to auto-fluid table layouts with precise layout constraints */}
          <Table className="w-full min-w-[900px] table-auto">
            <TableHeader className="bg-slate-50/40 border-b border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-slate-700 text-[13px] uppercase tracking-wider py-3.5 pl-5 w-[8%]">
                  S.N
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-[13px] uppercase tracking-wider py-3.5 w-[15%]">
                  Tracking ID
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-[13px] uppercase tracking-wider py-3.5 w-[25%]">
                  Customer
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-[13px] uppercase tracking-wider py-3.5 w-[15%]">
                  Device
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-[13px] uppercase tracking-wider py-3.5 w-[17%]">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-[13px] uppercase tracking-wider py-3.5 w-[12%]">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-slate-700 text-[13px] uppercase tracking-wider py-3.5 text-right pr-5 w-[18%]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-slate-400 text-sm"
                  >
                    No bookings found matching your active filter criteria.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking, index) => {
                  const serialNumber =
                    (currentPage - 1) * itemsPerPage + index + 1;

                  const firstName = booking.customerFirstName || "N/A";
                  const lastName = booking.customerLastName || "";
                  const email = booking.customerEmail || "No Email Provided";

                  return (
                    <TableRow
                      key={booking._id}
                      className="hover:bg-slate-50/30 border-b border-slate-100/80 transition-colors"
                    >
                      <TableCell className="font-semibold font-mono text-sm text-slate-600 py-4 pl-5">
                        {serialNumber}
                      </TableCell>
                      {/* Tracking ID */}
                      <TableCell className="font-semibold font-mono text-sm text-blue-600 py-4">
                        {booking.trackingId}
                      </TableCell>
                      {/* Customer Info */}
                      <TableCell className="py-4">
                        <div className="flex flex-col max-w-[220px]">
                          <div className="font-semibold text-slate-900 text-[14px] flex items-center gap-1.5">
                            <span className="truncate">
                              {firstName} {lastName}
                            </span>
                            {booking.isGuest && (
                              <Badge className="bg-pink-100 text-pink-600 hover:bg-pink-100 border-none rounded px-1.5 py-0 text-[10px] font-bold shadow-none shrink-0 scale-90 origin-left">
                                Guest
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 font-normal mt-0.5 truncate">
                            {email}
                          </div>
                        </div>
                      </TableCell>
                      {/* Device Profile */}
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-[10px] font-medium px-1.5 py-0 bg-slate-50 text-slate-500 border-slate-200 rounded-md shadow-none shrink-0"
                          >
                            {booking.deviceType}
                          </Badge>
                        </div>
                      </TableCell>
                      {/* Dynamic Status Badges */}
                      <TableCell className="py-4">
                        <span
                          className={`text-xs px-2.5 py-1.5 rounded-full border shadow-none inline-block text-center whitespace-nowrap min-w-[125px] font-medium ${
                            statusColors[booking.currentStatus] ||
                            "bg-slate-50 text-slate-600 border-slate-100"
                          }`}
                        >
                          {booking.currentStatus}
                        </span>
                      </TableCell>
                      {/* Date Format Parser */}
                      <TableCell className="text-slate-500 text-xs py-4 whitespace-nowrap">
                        {new Date(booking.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </TableCell>
                      {/* 🛠️ ACTIONS (View & Edit Layout) */}
                      <TableCell className="text-right py-4 pr-5">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* 👁️ View Detailed File */}
                          <Link
                            href={`/admin/dashboard/booking/${booking._id}`}
                            className="inline-flex items-center justify-center rounded-lg text-xs font-medium border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 h-8 px-2.5 transition-all shadow-sm gap-1 shrink-0"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            View
                          </Link>

                          {/* 📝 Edit File Button */}
                          <Link
                            href={`/admin/dashboard/booking/edit/${booking._id}`}
                            className="inline-flex items-center justify-center rounded-lg text-xs font-medium border border-blue-200/60 bg-blue-50/40 hover:bg-blue-50 text-blue-600 h-8 px-2.5 transition-all shadow-none gap-1 shrink-0"
                          >
                            <Edit className="w-3.5 h-3.5 text-blue-400" />
                            Edit
                          </Link>

                          {/* ✅ Approve Button */}
                          {booking.currentStatus === "Pending Approval" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2.5 rounded-lg text-xs font-medium border-emerald-200/60 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-600 shadow-none gap-1 shrink-0 transition-all"
                              onClick={() =>
                                handleUpdateStatus(booking._id, "Diagnosing")
                              }
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                              Approve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* 🔀 PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-slate-100 bg-white">
          {/* Left Side: Meta Text Info */}
          <div className="text-xs sm:text-sm text-slate-500 font-medium text-center sm:text-left order-2 sm:order-1">
            Showing page{" "}
            <span className="text-slate-800 font-semibold">
              {meta?.currentPage || currentPage}
            </span>{" "}
            of{" "}
            <span className="text-slate-800 font-semibold">
              {meta?.totalPages || 1}
            </span>{" "}
            ({meta?.total || bookings.length} total records)
          </div>

          {/* Right Side: Page Controls Wrapper */}
          <div className="flex items-center justify-center sm:justify-end gap-1.5 w-full sm:w-auto order-1 sm:order-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200/80 rounded-xl font-medium text-xs h-8 text-slate-600 hover:bg-slate-50 shadow-none px-3 transition-colors"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || status === Status.LOADING}
            >
              Previous
            </Button>

            {/* 🔢 Dynamic Numbered Buttons */}
            <div className="flex items-center gap-1">
              {Array.from({ length: meta?.totalPages || 1 }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;

                return (
                  <Button
                    key={pageNumber}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={`w-8 h-8 rounded-xl font-semibold text-xs p-0 shadow-none transition-all ${
                      isActive
                        ? "bg-slate-900 text-white hover:bg-slate-900"
                        : "border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                    onClick={() => setCurrentPage(pageNumber)}
                    disabled={status === Status.LOADING}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200/80 rounded-xl font-medium text-xs h-8 text-slate-600 hover:bg-slate-50 shadow-none px-3 transition-colors"
              onClick={() =>
                setCurrentPage((prev) =>
                  meta?.totalPages && prev < meta.totalPages ? prev + 1 : prev,
                )
              }
              disabled={
                currentPage === (meta?.totalPages || 1) ||
                status === Status.LOADING
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
