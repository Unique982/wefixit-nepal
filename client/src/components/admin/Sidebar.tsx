"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

import {
  LayoutDashboard,
  Users,
  Wrench,
  BarChart3,
  Settings,
  LogOut,
  ClipboardList,
  FileText,
  MessageSquare,
  Send,
  Terminal,
  PlusCircle,
  Bot,
  Bell,
  ShoppingCart,
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
  TooltipProvider,
} from "@/components/ui/tooltip";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  badge?: number | string | null;
}

interface SidebarGroupType {
  label: string;
  items: SidebarItem[];
}

interface SideBarProps {
  role: "admin" | "customer";
  unreadChatCount?: number;
}

export function SideBar({ role, unreadChatCount = 0 }: SideBarProps) {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const collapsed = state === "collapsed" && !isMobile;

  // --- LOGOUT MANAGEMENT FUNCTION ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token", { path: "/" });
    Cookies.remove("role", { path: "/" });

    // Force Hard Redirect to Login Page
    window.location.href = "/auth/login";
  };

  // --- ADMIN NAVIGATION CONFIGURATION ---
  const adminGroups: SidebarGroupType[] = [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      label: "Management",
      items: [
        {
          title: "Repair Tracking",
          url: "/admin/dashboard/tracking",
          icon: ShoppingCart,
        },
        {
          title: "Bookings List",
          url: "/admin/dashboard/booking",
          icon: ClipboardList,
        },
        {
          title: "Invoice",
          url: "/admin/dashboard/invoice",
          icon: ClipboardList,
        },

        { title: "Customers", url: "/admin/dashboard/users", icon: Users },
      ],
    },
    {
      label: "System & Communication",
      items: [
        {
          title: "Testimonials",
          url: "/admin/dashboard/testimonials",
          icon: MessageSquare,
        },
        {
          title: "Support Chat",
          url: "/admin/dashboard/support",
          icon: MessageSquare,
          badge: unreadChatCount > 0 ? unreadChatCount : null,
        },
        {
          title: "Send Notification",
          url: "/admin/dashboard/send-notification",
          icon: Send,
        },
        {
          title: "API Tester",
          url: "/admin/dashboard/api-tester",
          icon: Terminal,
        },
        { title: "Settings", url: "/admin/dashboard/settings", icon: Settings },
      ],
    },
  ];

  // --- CUSTOMER NAVIGATION CONFIGURATION ---
  const customerGroups: SidebarGroupType[] = [
    {
      label: "Overview",
      items: [
        {
          title: "My Repairs",
          url: "/customer/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Book a Repair",
          url: "/customer/dashboard/book-repair",
          icon: PlusCircle,
        },
      ],
    },
    {
      label: "Billing & History",
      items: [
        {
          title: "Invoices",
          url: "/customer/dashboard/invoices",
          icon: FileText,
        },
        {
          title: "Testimonials",
          url: "/customer/dashboard/testimonials",
          icon: MessageSquare,
        },
      ],
    },
    {
      label: "Support & Actions",
      items: [
        {
          title: "AI Assistant",
          url: "/customer/dashboard/ai-assistant",
          icon: Bot,
        },
        {
          title: "Notifications",
          url: "/customer/dashboard/notifications",
          icon: Bell,
        },
        {
          title: "Support Chat",
          url: "/customer/dashboard/support",
          icon: MessageSquare,
          badge: unreadChatCount > 0 ? unreadChatCount : null,
        },
        {
          title: "Profile",
          url: "/customer/dashboard/profile",
          icon: MessageSquare,
          badge: unreadChatCount > 0 ? unreadChatCount : null,
        },
      ],
    },
  ];

  const activeGroups = role === "admin" ? adminGroups : customerGroups;

  const renderMenu = (items: SidebarItem[]) => (
    <SidebarMenu className="gap-1" suppressHydrationWarning={true}>
      {items.map((item) => {
        const active =
          pathname === item.url ||
          (item.url !== "/admin/dashboard" &&
            item.url !== "/customer/dashboard" &&
            pathname.startsWith(item.url));

        return (
          <SidebarMenuItem key={item.title}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={`w-full transition-all duration-200 h-9 rounded-lg relative group ${
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
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        active
                          ? "opacity-100 scale-105"
                          : "opacity-70 group-hover:opacity-100"
                      }`}
                    />
                    {!collapsed && (
                      <span className="text-[14px] font-medium tracking-tight truncate flex-1">
                        {item.title}
                      </span>
                    )}

                    {/* Badge Pill UI System */}
                    {item.badge && (
                      <span
                        className={`flex h-5 min-w-5 items-center justify-center rounded-full text-[10px] font-bold px-1 transition-all ${
                          active
                            ? "bg-white text-black dark:bg-black dark:text-white"
                            : "bg-blue-600 text-white"
                        } ${
                          collapsed
                            ? "absolute top-1 right-1 h-2 w-2 min-w-0 p-0 overflow-hidden text-[0px] rounded-full"
                            : ""
                        }`}
                      >
                        {collapsed ? "" : item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent
                  side="right"
                  className="text-xs font-semibold hidden md:block"
                >
                  {item.title}
                  {item.badge && ` (${item.badge})`}
                </TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return (
    <TooltipProvider>
      <Sidebar
        collapsible="icon"
        className="border-r border-slate-200/60 bg-white dark:bg-slate-950 transition-all duration-300"
      >
        {/* Header Area */}
        <SidebarHeader className="pt-5 pb-4 px-3">
          <div
            className={`flex items-center gap-3 px-1 ${collapsed ? "justify-center" : "justify-start"}`}
          >
            <div className="h-9 w-9 shrink-0 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="font-bold text-sm tracking-tight">RS</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0 transition-opacity duration-200">
                <span className="text-sm font-bold leading-none tracking-tight text-slate-900 dark:text-white">
                  WEFixit
                </span>
                <span className="text-[10px] text-slate-400 font-bold mt-1 tracking-wider uppercase">
                  {role === "admin" ? "Admin Panel" : "Customer Portal"}
                </span>
              </div>
            )}
          </div>
          {!collapsed && (
            <hr className="mb-2 mt-4 border-slate-100 dark:border-slate-800" />
          )}
        </SidebarHeader>

        {/* Scrollable Content Area */}
        <SidebarContent className="px-3 space-y-4">
          {activeGroups.map((group) => (
            <SidebarGroup key={group.label} className="p-0">
              {!collapsed && (
                <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400/80 mb-1 block">
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent className={collapsed ? "mt-2" : ""}>
                {renderMenu(group.items)}
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* Footer Area */}
        {/* Premium Footer Area */}
        <SidebarFooter className="p-3 border-t border-slate-100 dark:border-slate-800 bg-gradient-to-t from-slate-50 to-white dark:from-slate-950 dark:to-slate-950/50">
          <SidebarMenu>
            <SidebarMenuItem>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className={`w-full h-11 rounded-xl flex items-center transition-all duration-300 relative overflow-hidden group select-none
              ${
                collapsed
                  ? "justify-center bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200/60 hover:border-red-200 dark:bg-slate-900 dark:hover:bg-red-950/30 dark:border-slate-800 dark:hover:border-red-900/50"
                  : "px-4 bg-slate-50 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50/50 text-slate-700 hover:text-red-600 border border-slate-200/60 hover:border-red-100 dark:bg-slate-900/50 dark:hover:from-red-950/20 dark:hover:to-slate-900 dark:border-slate-800/80 dark:hover:border-red-950"
              }
              active:scale-[0.97] focus:outline-none shadow-sm hover:shadow-md hover:shadow-red-500/5
            `}
                  >
                    {/* Ambient Background Glow Effect on Hover (Only when expanded) */}
                    {!collapsed && (
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
                    )}

                    <div
                      className={`flex items-center gap-3 w-full relative z-10 ${collapsed ? "justify-center" : ""}`}
                    >
                      <div
                        className={`p-1.5 rounded-lg transition-all duration-300 
                ${
                  collapsed
                    ? ""
                    : "bg-slate-200/60 group-hover:bg-red-500 group-hover:text-white dark:bg-slate-800"
                }`}
                      >
                        <LogOut className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:scale-105" />
                      </div>

                      {!collapsed && (
                        <div className="flex flex-col items-start text-left flex-1 min-w-0 transition-all duration-300">
                          <span className="text-[13px] font-bold tracking-tight text-slate-800 dark:text-slate-200 group-hover:text-red-600 transition-colors">
                            Sign Out
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium truncate group-hover:text-red-400/80 transition-colors">
                            End current session
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                </TooltipTrigger>

                {collapsed && (
                  <TooltipContent
                    side="right"
                    sideOffset={12}
                    className="text-xs font-bold text-white bg-slate-900 dark:bg-slate-50 dark:text-slate-900 border-none shadow-xl px-3 py-1.5 rounded-lg"
                  >
                    Sign Out
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
