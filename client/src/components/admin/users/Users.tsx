"use client";
import React, { useState } from "react";
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
import {
  Users,
  RefreshCw,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Mail,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { toast } from "sonner"; // toast लाई इम्पोर्ट गरिएको
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

// मिसिङ भएको roleConfig थपिएको
const roleConfig: Record<string, { label: string; className: string }> = {
  admin: { label: "Admin", className: "bg-purple-100 text-purple-800" },
  client: { label: "Client", className: "bg-blue-100 text-blue-800" },
  technician: { label: "Technician", className: "bg-green-100 text-green-800" },
};

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL"); // स्टेट थपिएको
  const [page, setPage] = useState(1);
  const limit = 10;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // useQuery मा refetch र isError थपिएको तथा रोल फिल्टर params मा मिलाइएको
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-users", page, limit, debouncedSearch, roleFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(roleFilter !== "ALL" && { role: roleFilter }),
        ...(debouncedSearch && { search: debouncedSearch }),
      });
      const res = await APIWITHTOKEN.get(`/admin/users?${params.toString()}`);
      return res.data;
    },
  });

  const users = data?.data || [];
  const total = data?.total || 0; // total रेकर्ड्स निकालिएको
  const totalPages = data?.totalPages || 1;

  // मिति फर्माट गर्ने फङ्सन थपिएको
  const formatJoinedDate = (dateString: string) => {
    try {
      if (!dateString) return "N/A";
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await APIWITHTOKEN.delete(`/admin/users/${id}`);
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
    },
  });

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  const indexOfFirstItem = (page - 1) * limit;
  const indexOfLastItem = Math.min(indexOfFirstItem + limit, total);

  return (
    <div className="space-y-6">
      {/* शीर्ष भाग (Invoice Page को जस्तै दुरुस्तै Layout) */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-slate-500">Manage and view platform members.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>

          {/* Add User बटन र Dialog (Invoice को Add Invoice जस्तै सेम) */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Enter user details below to manually register a new account.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 text-sm text-slate-500 text-center">
                User registration form inputs go here.
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* मुख्य कार्ड सेक्सन (Invoice को All Invoices कार्डको सेम कपी) */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Review registered user roles, status, and contact details.
                </CardDescription>
              </div>
            </div>

            {/* Search Input र Role Filter Select (Invoice को जस्तै) */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm} // सटीक स्टेटमा म्याप गरिएको
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
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
              <p>Failed to load users.</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No users found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border">
                {/* सेम तालिका ढाँचा (Table Structure) */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Joined Date</TableHead>
                      <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user: User) => {
                      const config = roleConfig[user.role] || {
                        label: user.role,
                        className: "bg-slate-100 text-slate-800",
                      };

                      return (
                        <TableRow key={user._id}>
                          <TableCell>
                            <div className="font-medium">
                              {user.firstName
                                ? `${user.firstName} ${user.lastName || ""}`.trim()
                                : "N/A"}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {user.email || "N/A"}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {user.phone || "N/A"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${config.className} hover:${config.className}`}
                            >
                              {config.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-sm text-slate-500">
                            {formatJoinedDate(user.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDelete(user._id)}
                                disabled={deleteMutation.isPending}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* पाजिनेसन कन्ट्रोल (Invoice Page को जस्तै दुरुस्तै कपी र एलाइनमेन्ट) */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-500 font-medium">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {total === 0 ? 0 : indexOfFirstItem + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-slate-700">
                    {indexOfLastItem}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">{total}</span>{" "}
                  entries
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <div className="text-xs font-medium text-slate-700">
                    Page {page} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
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
