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

// Configure QueryClient with more aggressive optimization settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // Data stays fresh for 30 minutes
      gcTime: 60 * 60 * 1000, // Keep unused data in cache for 1 hour
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

// Ultra-lightweight loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-solana-purple border-t-transparent rounded-full animate-spin" />
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