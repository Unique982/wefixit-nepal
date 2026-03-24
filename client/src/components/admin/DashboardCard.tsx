"use client";
import { StatCard } from "./StatCard";
import {
  ShoppingCart,
  DollarSign,
  Armchair,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const dailySales = [
  { day: "Mon", sales: 4200 },
  { day: "Tue", sales: 3800 },
  { day: "Wed", sales: 5100 },
  { day: "Thu", sales: 4600 },
  { day: "Fri", sales: 6200 },
  { day: "Sat", sales: 7800 },
  { day: "Sun", sales: 7200 },
];

const ordersByHour = [
  { hour: "9AM", orders: 12 },
  { hour: "10AM", orders: 18 },
  { hour: "11AM", orders: 28 },
  { hour: "12PM", orders: 45 },
  { hour: "1PM", orders: 52 },
  { hour: "2PM", orders: 38 },
  { hour: "3PM", orders: 22 },
  { hour: "4PM", orders: 15 },
  { hour: "5PM", orders: 20 },
  { hour: "6PM", orders: 35 },
  { hour: "7PM", orders: 48 },
  { hour: "8PM", orders: 55 },
  { hour: "9PM", orders: 42 },
];

const topItems = [
  { name: "Margherita Pizza", value: 145 },
  { name: "Caesar Salad", value: 120 },
  { name: "Grilled Salmon", value: 98 },
  { name: "Pasta Carbonara", value: 87 },
  { name: "Chocolate Cake", value: 76 },
];

const PIE_COLORS = [
  "hsl(24, 95%, 53%)",
  "hsl(160, 84%, 39%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 84%, 60%)",
  "hsl(262, 83%, 58%)",
];

const recentRepairs = [
  {
    id: "RPR-1028",
    device: "iPhone 13",
    customer: "Ram",
    status: "In Progress",
    cost: "$120",
  },
  {
    id: "RPR-1027",
    device: "Samsung S21",
    customer: "Sita",
    status: "Completed",
    cost: "$80",
  },
  {
    id: "RPR-1026",
    device: "Redmi Note 10",
    customer: "Hari",
    status: "Pending",
    cost: "$40",
  },
];

const statusColor: Record<string, string> = {
  Pending: "bg-warning/10 text-warning border-warning/20",
  Preparing: "bg-primary/10 text-primary border-primary/20",
  Ready: "bg-secondary/10 text-secondary border-secondary/20",
  Completed: "bg-success/10 text-success border-success/20",
};

const Index = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Manage all repair jobs and track progress
        </p>
      </div>

      {/* Stats */}
      <StatCard />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Daily Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dailySales}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${value}`, "Sales"]}
                />
                <Bar
                  dataKey="sales"
                  fill="hsl(24, 95%, 53%)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={topItems}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={4}
                >
                  {topItems.map((_, idx) => (
                    <Cell key={idx} fill={PIE_COLORS[idx]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {topItems.map((item, idx) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: PIE_COLORS[idx] }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders by Hour + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Orders by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ordersByHour}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 10 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(160, 84%, 39%)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs border-b">
                    <th className="text-left pb-3 font-medium">Order</th>
                    <th className="text-left pb-3 font-medium">Table</th>
                    <th className="text-left pb-3 font-medium hidden md:table-cell">
                      Customer
                    </th>
                    <th className="text-left pb-3 font-medium">Status</th>
                    <th className="text-right pb-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRepairs.map((rp) => (
                    <tr key={rp.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{rp.id}</td>
                      <td className="py-3">{rp.table}</td>
                      <td className="py-3 hidden md:table-cell">
                        {rp.customer}
                      </td>
                      <td className="py-3">
                        <Badge
                          variant="outline"
                          className={statusColor[rp.status]}
                        >
                          {rp.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-right font-medium">
                        {rp.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
