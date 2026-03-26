"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/lib/store/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Provider store={store}>
          <Toaster position="top-right" reverseOrder={false} />
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        </Provider>
      </body>
    </html>
  );
}
