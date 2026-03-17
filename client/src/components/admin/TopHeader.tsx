// components/top-navbar.tsx
"use client";

import { useState } from "react";
import { Bell, Search, User, Settings, LogOut, Menu, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const notifications = [
  { id: 1, message: "New order from Table 5", time: "2m ago", unread: true },
  { id: 2, message: "Order #1024 is ready", time: "10m ago", unread: true },
  { id: 3, message: "New review received ⭐", time: "1h ago", unread: true },
];

export function TopNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/60 flex items-center justify-between px-3 sm:px-4 md:px-6 gap-2 sm:gap-4 shadow-sm">
      {/* Left: Sidebar trigger + Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <SidebarTrigger className="shrink-0 h-9 w-9" />

        {/* Desktop search */}
        <div className="relative hidden md:flex items-center flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search orders, menu items..."
            className="pl-9 h-9 bg-muted/50 border-border/50 focus-visible:bg-background focus-visible:ring-1 w-full transition-all"
          />
        </div>

        {/* Mobile search toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 shrink-0"
          onClick={() => setSearchOpen((prev) => !prev)}
          aria-label="Toggle search"
        >
          {searchOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>

        {/* Mobile search input (expands inline) */}
        {searchOpen && (
          <div className="relative flex md:hidden flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              autoFocus
              placeholder="Search..."
              className="pl-9 h-9 bg-muted/50 border-border/50 w-full"
            />
          </div>
        )}
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0 ">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9"
              aria-label={`${unreadCount} notifications`}
            >
              <Bell className="h-[18px] w-[18px] text-muted-foreground" />
              {unreadCount > 0 && (
                <Badge
                  className={cn(
                    "absolute -top-1 -right-1 h-[18px] min-w-[18px] px-1",
                    "flex items-center justify-center text-[10px] font-semibold",
                    "bg-primary text-primary-foreground border-2 border-card",
                  )}
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 p-0" sideOffset={8}>
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <DropdownMenuLabel className="p-0 text-sm font-semibold">
                Notifications
              </DropdownMenuLabel>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
              >
                Mark all read
              </Button>
            </div>

            <div className="max-h-72 overflow-y-auto">
              {notifications.map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  className="flex items-start gap-3 px-4 py-3 cursor-pointer focus:bg-muted/60"
                >
                  {notif.unread && (
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  )}
                  <div
                    className={cn(
                      "flex flex-col gap-0.5",
                      !notif.unread && "pl-5",
                    )}
                  >
                    <p className="text-sm leading-snug">{notif.message}</p>
                    <span className="text-xs text-muted-foreground">
                      {notif.time}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>

            <div className="border-t px-4 py-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground justify-center"
              >
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 h-9 px-2 sm:px-3 hover:bg-muted/60"
              aria-label="User menu"
            >
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarImage src="/logo.png" alt="Admin" />
                <AvatarFallback className="bg-primary text-primary-foreground text-[11px] font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-sm font-medium">Admin</span>
                <span className="text-[11px] text-muted-foreground">
                  admin@restaurant.com
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
            <div className="px-3 py-2 border-b mb-1">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground truncate">
                admin@restaurant.com
              </p>
            </div>

            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4 text-muted-foreground" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
