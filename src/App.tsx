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

// Configure QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries to prevent unnecessary network requests
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnMount: false, // Prevent refetching when component mounts
    },
  },
});

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-[#2D243F]">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-solana-purple border-t-transparent rounded-full animate-spin"></div>
      <div className="text-solana-purple font-pixel text-sm animate-pulse">
        Loading...
      </div>
    </div>
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