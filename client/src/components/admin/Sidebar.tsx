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
  { title: "Mobile Repair", url: "/admin/mobile", icon: Smartphone },
  { title: "Laptop Repair", url: "/admin/laptop", icon: Laptop },
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
    <SidebarMenu>
      {items.map((item) => {
        const active = pathname.startsWith(item.url);

        return (
          <SidebarMenuItem key={item.title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild isActive={active}>
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition hover:bg-muted font-semibold"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />

                    {!collapsed && (
                      <span className="text-sm font-medium">{item.title}</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>

              {collapsed && (
                <TooltipContent side="right">{item.title}</TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-3">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold ">
            RS
          </div>

          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Repair Shop</span>
              <span className="text-xs text-muted-foreground">Admin Panel</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* OVERVIEW */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenu(dashboardItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* DEVICES */}
        <SidebarGroup>
          <SidebarGroupLabel>Device Repairs</SidebarGroupLabel>
          <SidebarGroupContent>{renderMenu(deviceItems)}</SidebarGroupContent>
        </SidebarGroup>

        {/* MANAGEMENT */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenu(managementItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SYSTEM */}
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>{renderMenu(systemItems)}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
