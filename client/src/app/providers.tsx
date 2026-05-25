"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import store from "@/lib/store/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Using useState ensures the QueryClient instance stays alive across re-renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute default stale tim
          },
        },
      }),
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={0}>
          <Toaster richColors position="top-right" />
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}
