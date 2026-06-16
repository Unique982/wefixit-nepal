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
import Link from "next/link";
import { useAppSelector } from "@/hooks/hook";
import { useAuthStore } from "@/lib/store/authStore";

const notifications = [
  { id: 1, message: "New order from Table 5", time: "2m ago", unread: true },
  { id: 2, message: "Order #1024 is ready", time: "10m ago", unread: true },
  { id: 3, message: "New review received ⭐", time: "1h ago", unread: true },
];

export function TopNavbar() {
  // const { login, user } = useAuthStore();
  // console.log("Login User data", login);
  // console.log(" User data", user?.firstName);
  // const userName = user ? `${user.firstName} ${user.lastName}` : "";
  // const userEmail = user?.email;
  // const userInitials = user
  //   ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
  //   : "";
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
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0 ">
        {/* Notifications */}

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
                  Ts
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-sm font-medium">User Testing</span>
                <span className="text-[11px] text-muted-foreground"></span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
            <div className="px-3 py-2 border-b mb-1">
              <p className="text-sm font-medium">Testing</p>
              <p className="text-xs text-muted-foreground truncate">
                testing@gmail.com
              </p>
            </div>
            <Link href="/admin/profile">
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <User className="h-4 w-4 text-muted-foreground" />
                Profile
              </DropdownMenuItem>
            </Link>
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
