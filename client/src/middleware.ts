// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userRole = req.cookies.get("role")?.value?.toLowerCase().trim();
  const { pathname } = req.nextUrl;

  if (
    !token &&
    (pathname.startsWith("/admin") || pathname.startsWith("/customer"))
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token && pathname.startsWith("/auth/login")) {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/customer/dashboard", req.url));
  }

  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/customer/dashboard", req.url));
  }

  if (pathname.startsWith("/customer") && userRole === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/admin/:path*", "/customer/:path*"],
};
