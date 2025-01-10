import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SolanaWalletProvider } from "./components/WalletProvider";

// Lazy load pages with loading boundaries
const Index = lazy(() => import("./pages/Index"));
const Purchase = lazy(() => import("./pages/Purchase"));

// Configure QueryClient with aggressive optimization settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

// Ultra-lightweight loading fallback
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/50">
    <div className="w-6 h-6 border-2 border-solana-purple border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SolanaWalletProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="*" element={<Index />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </SolanaWalletProvider>
  </QueryClientProvider>
);

export default App;