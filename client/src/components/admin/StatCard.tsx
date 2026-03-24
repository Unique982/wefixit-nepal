"use client";
import {
  Smartphone,
  DollarSign,
  Wrench,
  Clock,
  CheckCircle2,
} from "lucide-react";
const stats = [
  {
    title: "Total Repairs",
    value: "1,284",
    change: "+12.5% from last week",
    type: "up",
    icon: Wrench,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Today Revenue",
    value: "$3,456",
    change: "+8.2% from yesterday",
    type: "up",
    icon: DollarSign,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Devices in Repair",
    value: "45",
    change: "Active jobs",
    type: "neutral",
    icon: Smartphone,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Pending Repairs",
    value: "12",
    change: "-3 from yesterday",
    type: "down",
    icon: Clock,
    color: "from-red-500 to-red-600",
  },
  {
    title: "Completed Repairs",
    value: "156",
    change: "+24 today",
    type: "up",
    icon: CheckCircle2,
    color: "from-emerald-500 to-emerald-600",
  },
];
export function StatCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition flex justify-between"
        >
          <div>
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-xl font-bold">{item.value}</h2>
            <p
              className={`text-xs ${
                item.type === "up"
                  ? "text-green-600"
                  : item.type === "down"
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {item.change}
            </p>
          </div>

          <div
            className={`h-12 w-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${item.color}`}
          >
            <item.icon />
          </div>
        </div>
      ))}
    </div>
  );
}
