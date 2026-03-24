"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toast } from "radix-ui";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/lib/store/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <Provider store={store}>
          <Toaster position="top-right" reverseOrder={false} />
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </Provider>
      </body>
    </html>
  );
}
