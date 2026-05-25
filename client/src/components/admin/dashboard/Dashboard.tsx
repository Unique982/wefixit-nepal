"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Wrench,
  Smartphone,
  ClipboardList,
  CheckCircle2,
  DollarSign,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDistanceToNow } from "date-fns";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

interface DashboardStats {
  totalUsers: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalRevenue: number;
  recentBookings: any[];
  chartData: any[];
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await APIWITHTOKEN.get("/admin/dashboard");
      return res.data.data;
    },
  });

  const chartData = stats?.chartData || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-slate-500">
          Welcome to the WeFixIt Admin Dashboard.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block">
                Total Repairs
              </span>
              <span className="text-2xl font-bold">
                {stats?.totalRepairs || "1,284"}
              </span>
            </div>
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Wrench className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs font-semibold text-green-500">
              +12.5% from last week
            </div>
          </CardContent>
        </Card>

        {/* Today Revenue */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block">
                Today Revenue
              </span>
              <span className="text-2xl font-bold">
                Rs. {stats?.totalRevenue?.toLocaleString() || "3,456"}
              </span>
            </div>
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <DollarSign className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs font-semibold text-green-500">
              +8.2% from yesterday
            </div>
          </CardContent>
        </Card>

        {/* Devices in Repair */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block">
                Devices in Repair
              </span>
              <span className="text-2xl font-bold">
                {stats?.devicesInRepair || "45"}
              </span>
            </div>
            <div className="p-2 bg-purple-500 rounded-lg text-white">
              <Smartphone className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-400 font-medium">
              Active jobs
            </div>
          </CardContent>
        </Card>

        {/* Pending Repairs */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block">
                Pending Repairs
              </span>
              <span className="text-2xl font-bold">
                {stats?.pendingRepairs || "12"}
              </span>
            </div>
            <div className="p-2 bg-red-500 rounded-lg text-white">
              <Clock className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs font-semibold text-red-500">
              -3 from yesterday
            </div>
          </CardContent>
        </Card>

        {/* Completed Repairs */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 block">
                Completed Repairs
              </span>
              <span className="text-2xl font-bold">
                {stats?.completedRepairs || "156"}
              </span>
            </div>
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs font-semibold text-green-500">
              +24 today
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Bookings Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b" }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="bookings"
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                stats.recentBookings.map((booking) => (
                  <div key={booking._id} className="flex items-center">
                    <span className="relative flex h-2 w-2 mr-4">
                      {booking.currentStatus === "Pending Approval" ||
                      booking.currentStatus === "Pending Drop-off" ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </>
                      ) : booking.currentStatus === "Completed" ? (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      ) : (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                      )}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {booking.isGuest
                          ? "New Guest Booking"
                          : "New Repair Booking"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {booking.deviceBrand} {booking.deviceModel} -{" "}
                        {booking.currentStatus}
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-slate-500">
                      {formatDistanceToNow(new Date(booking.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500 text-center py-4">
                  No recent activity found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
