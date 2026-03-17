"use client";

import { ReactNode } from "react";

import { SideBar } from "@/components/admin/Sidebar";
import { TopNavbar } from "@/components/admin/TopHeader";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <SideBar />

        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar />

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 overflow-auto pb-20 md:pb-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
