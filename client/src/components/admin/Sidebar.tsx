"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Smartphone,
  Laptop,
  Tablet,
  Monitor,
  Watch,
  Gamepad2,
  Headphones,
  ShoppingCart,
  Users,
  Wrench,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const dashboardItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
];

const deviceItems = [
  { title: "Repair Tracking", url: "/admin/tracking", icon: Smartphone },
  { title: "Booking Repair", url: "/admin/booking", icon: Laptop },
  { title: "Tablet Repair", url: "/admin/tablet", icon: Tablet },
  { title: "Desktop Repair", url: "/admin/desktop", icon: Monitor },
  { title: "Smart Watch", url: "/admin/watch", icon: Watch },
  { title: "Gaming Console", url: "/admin/gaming", icon: Gamepad2 },
  { title: "Accessories", url: "/admin/accessories", icon: Headphones },
];

const managementItems = [
  { title: "Repair Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Technicians", url: "/admin/technicians", icon: Wrench },
  { title: "Customers", url: "/admin/customers", icon: Users },
];

const systemItems = [
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function SideBar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const renderMenu = (items: any[]) => (
    <SidebarMenu className="gap-1">
      {items.map((item) => {
        const active = pathname === item.url || pathname.startsWith(item.url);

        return (
          <SidebarMenuItem key={item.title}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={`w-full transition-all duration-200 h-9 rounded-lg ${
                    active
                      ? "!bg-black !text-white hover:!bg-black/90 dark:!bg-white dark:!text-black"
                      : "text-slate-600 hover:bg-slate-100 hover:text-black dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 px-3 w-full"
                  >
                    <item.icon
                      className={`h-4 w-4 shrink-0 ${active ? "opacity-100" : "opacity-70"}`}
                    />
                    {!collapsed && (
                      <span className="text-[15px] font-medium tracking-tight truncate">
                        {item.title}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="text-xs font-semibold">
                  {item.title}
                </TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200/60 bg-white dark:bg-slate-950"
    >
      <SidebarHeader className="pt-5 pb-4 px-2">
        <div className="flex items-center gap-3 px-1.5 justify-center sm:justify-start">
          <div className="h-9 w-9 shrink-0 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
            <span className="font-bold text-sm tracking-tight">RS</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold leading-none tracking-tight text-slate-900 dark:text-white">
                Repair Shop
              </span>
              <span className="text-[10px] text-slate-400 font-bold mt-1 tracking-wider uppercase">
                Admin Panel
              </span>
            </div>
          )}
        </div>
        {!collapsed && (
          <hr className="mb-2 mt-4 border-slate-100 text-black dark:border-slate-800" />
        )}
      </SidebarHeader>

      <SidebarContent className="px-3 ">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400/80   ">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenu(dashboardItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400/80">
            Device Repairs
          </SidebarGroupLabel>
          <SidebarGroupContent>{renderMenu(deviceItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400/80">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenu(managementItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400/80 ">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>{renderMenu(systemItems)}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Added at the bottom */}
      <SidebarFooter className="p-3 border-t border-slate-100 dark:border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  className="w-full h-9 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 transition-colors"
                  onClick={() => console.log("Logging out...")}
                >
                  <div className="flex items-center gap-3 px-3 w-full">
                    <LogOut className="h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <span className="text-[13.5px] font-medium tracking-tight">
                        Logout
                      </span>
                    )}
                  </div>
                </SidebarMenuButton>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent
                  side="right"
                  className="text-xs font-semibold text-red-500"
                >
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
