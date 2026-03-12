"use client";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    // <ProtectedRoute allowedRoles={["admin"]}>
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* <SideBar /> */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <TopHeader /> */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
    // </ProtectedRoute>
  );
}
