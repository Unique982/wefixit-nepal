"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 22000 },
  { month: "Mar", revenue: 19800 },
  { month: "Apr", revenue: 24500 },
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 32000 },
];

const orderTrends = [
  { week: "W1", orders: 180 },
  { week: "W2", orders: 220 },
  { week: "W3", orders: 195 },
  { week: "W4", orders: 260 },
];

const categoryData = [
  { name: "Pizza", value: 35 },
  { name: "Seafood", value: 25 },
  { name: "Salads", value: 15 },
  { name: "Desserts", value: 15 },
  { name: "Drinks", value: 10 },
];

// Modern color palette
const COLORS = [
  "#FF6B6B", // red-ish
  "#4ECDC4", // teal
  "#FFA600", // amber
  "#6A4C93", // purple
  "#1A535C", // dark teal
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Analytics
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Revenue analytics, order trends, and popular items
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <Card className="shadow-lg border border-gray-100">
          <CardHeader>
            <CardTitle className="text-base md:text-lg font-semibold">
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                  formatter={(v: number) => [
                    `$${v.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF6B6B"
                  fillOpacity={1}
                  fill="url(#revGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Orders */}
        <Card className="shadow-lg border border-gray-100">
          <CardHeader>
            <CardTitle className="text-base md:text-lg font-semibold">
              Weekly Order Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={orderTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="week" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="orders" fill="#4ECDC4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card className="shadow-lg border border-gray-100 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base md:text-lg font-semibold">
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  paddingAngle={4}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                  formatter={(v: number) => [`${v}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 w-full mt-3">
              {categoryData.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: COLORS[i] }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                  <span className="ml-auto font-medium text-gray-800">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="shadow-lg border border-gray-100 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base md:text-lg font-semibold">
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {[
              { label: "Avg. Order Value", value: "$32.50", change: "+5.2%" },
              { label: "Customer Return Rate", value: "68%", change: "+3.1%" },
              { label: "Avg. Prep Time", value: "18 min", change: "-2 min" },
              { label: "Table Turnover", value: "3.2x/day", change: "+0.4" },
            ].map((m) => (
              <div key={m.label} className="flex items-center justify-between">
                <span className="text-gray-500">{m.label}</span>
                <div className="text-right">
                  <span className="font-bold text-gray-900">{m.value}</span>
                  <span
                    className={`ml-2 text-sm ${m.change.startsWith("-") ? "text-red-500" : "text-green-500"}`}
                  >
                    {m.change}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
