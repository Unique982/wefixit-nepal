"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

interface Invoice {
  _id: string;
  booking:
    | {
        _id: string;
        trackingId: string;
        deviceType: string;
        deviceModel: string;
      }
    | string;
  user:
    | { _id: string; firstName: string; lastName: string; email: string }
    | string;
  amount: number;
  status: "PENDING" | "VERIFICATION_REQUIRED" | "PAID" | "CANCELLED";
  pdfUrl?: string;
  paymentProofUrl?: string;
  createdAt: string;
}

const statusConfig = {
  PENDING: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
  VERIFICATION_REQUIRED: {
    label: "Verify Payment",
    className: "bg-blue-100 text-blue-800",
  },
  PAID: { label: "Paid", className: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-800" },
};

export default function InvoiceComponent() {
  const queryClient = useQueryClient();
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  // Search, Filter र Pagination स्टेटहरू
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetching data
  const {
    data: invoices,
    isLoading,
    isError,
    refetch,
  } = useQuery<Invoice[]>({
    queryKey: ["admin-invoices"],
    queryFn: async () => {
      const res = await APIWITHTOKEN.get("/admin/invoices");
      return res.data.data;
    },
  });

  // Verification handling
  const verifyMutation = useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: string;
      action: "APPROVE" | "REJECT";
    }) => {
      await APIWITHTOKEN.put(`/admin/invoice/${id}/verify`, { action });
    },
    onSuccess: (_, variables) => {
      toast.success(`Payment ${variables.action.toLowerCase()}d successfully!`);
      queryClient.invalidateQueries({ queryKey: ["admin-invoices"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to verify payment");
    },
  });

  // Download handling
  const handleDownload = async (
    invoiceId: string,
    bookingId: string,
    trackingId: string,
  ) => {
    try {
      setIsDownloading(invoiceId);
      const res = await APIWITHTOKEN.get(`/booking/${bookingId}/invoice`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice-${trackingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Invoice downloaded successfully");
    } catch (error: any) {
      toast.error("Failed to download invoice");
    } finally {
      setIsDownloading(null);
    }
  };

  // Helper functions safely typed
  const getUser = (user: Invoice["user"]) => {
    if (!user || typeof user === "string") return { name: "N/A", email: "" };
    return { name: `${user.firstName} ${user.lastName}`, email: user.email };
  };

  const getBooking = (booking: Invoice["booking"]) => {
    if (!booking || typeof booking === "string")
      return {
        bookingId: typeof booking === "string" ? booking : "",
        trackingId: "N/A",
        device: "N/A",
      };
    return {
      bookingId: booking._id,
      trackingId: booking.trackingId,
      device: `${booking.deviceType} - ${booking.deviceModel}`,
    };
  };

  // Filter र Search को लजिक
  const filteredInvoices = (invoices || []).filter((inv) => {
    const { name, email } = getUser(inv.user);
    const { trackingId, device } = getBooking(inv.booking);

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination को लजिक
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoices</h2>
          <p className="text-slate-500">Manage and verify client payments.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>

          {/* Add Invoice बटन र यसको आवश्यक Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Invoice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>
                  Enter the invoice details below to manually create an invoice.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 text-sm text-slate-500 text-center">
                Invoice form inputs go here.
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <CardTitle>All Invoices</CardTitle>
                <CardDescription>
                  Review uploaded payment proofs and mark as verified.
                </CardDescription>
              </div>
            </div>

            {/* Search Input र Status Filter Select थपिएको ठाउँ */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search invoice..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-8"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(val) => {
                  setStatusFilter(val);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="VERIFICATION_REQUIRED">
                    Verify Payment
                  </SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center py-8 text-slate-500">
              <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
              <p>Failed to load invoices.</p>
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No invoices found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Tracking ID</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Proof</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentInvoices.map((inv) => {
                      const { name, email } = getUser(inv.user);
                      const { bookingId, trackingId, device } = getBooking(
                        inv.booking,
                      );
                      const config = statusConfig[inv.status];

                      return (
                        <TableRow key={inv._id}>
                          <TableCell>
                            <div className="font-medium">{name}</div>
                            <div className="text-xs text-slate-500">
                              {email}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{device}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {trackingId}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            Rs. {inv.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${config.className} hover:${config.className}`}
                            >
                              {config.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {inv.paymentProofUrl ? (
                              <a
                                href={inv.paymentProofUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                View Screenshot
                              </a>
                            ) : (
                              <span className="text-slate-400 text-sm">
                                Not uploaded
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() =>
                                  handleDownload(inv._id, bookingId, trackingId)
                                }
                                disabled={
                                  isDownloading === inv._id || !bookingId
                                }
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                {isDownloading === inv._id ? "..." : "PDF"}
                              </Button>

                              {(inv.status === "PENDING" ||
                                inv.status === "VERIFICATION_REQUIRED") && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="h-8 bg-green-600 hover:bg-green-700 text-white"
                                    disabled={verifyMutation.isPending}
                                    onClick={() =>
                                      verifyMutation.mutate({
                                        id: inv._id,
                                        action: "APPROVE",
                                      })
                                    }
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  {inv.status === "VERIFICATION_REQUIRED" && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      disabled={verifyMutation.isPending}
                                      onClick={() =>
                                        verifyMutation.mutate({
                                          id: inv._id,
                                          action: "REJECT",
                                        })
                                      }
                                    >
                                      Reject
                                    </Button>
                                  )}
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination नियन्त्रण UI सेक्सन */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500 font-medium">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {indexOfFirstItem + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-700">
                    {Math.min(indexOfLastItem, filteredInvoices.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredInvoices.length}
                  </span>{" "}
                  entries
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <div className="text-xs font-medium text-slate-700">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
