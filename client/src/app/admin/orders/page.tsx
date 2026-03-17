"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentOrders = [
  {
    id: "#001",
    customer: "Anish Sharma",
    product: "Pizza Margherita",
    status: "Completed",
    total: "$24.50",
    date: "2026-03-12",
  },
  {
    id: "#002",
    customer: "Rita Karki",
    product: "Seafood Pasta",
    status: "Pending",
    total: "$32.00",
    date: "2026-03-13",
  },
  {
    id: "#003",
    customer: "Suman Thapa",
    product: "Salad Bowl",
    status: "Cancelled",
    total: "$12.50",
    date: "2026-03-13",
  },
  {
    id: "#004",
    customer: "Nisha Rai",
    product: "Cheeseburger",
    status: "Completed",
    total: "$18.00",
    date: "2026-03-14",
  },
  {
    id: "#005",
    customer: "Prakash Shrestha",
    product: "Ice Cream",
    status: "Completed",
    total: "$8.50",
    date: "2026-03-14",
  },
];

export default function OrdersTable() {
  return (
    <Card className="shadow-lg border border-gray-100 mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {order.customer}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {order.product}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {order.total}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
