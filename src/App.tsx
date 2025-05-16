
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CoinDetail from "./pages/CoinDetail";
import Learn from "./pages/Learn";
import BlockchainFundamentals from "./pages/BlockchainFundamentals";
import TradingBasics from "./pages/TradingBasics";
import CryptoWallets from "./pages/CryptoWallets";
import DefiExplained from "./pages/DefiExplained";
import NftBasics from "./pages/NftBasics";
import TechnicalAnalysis from "./pages/TechnicalAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/blockchain-fundamentals" element={<BlockchainFundamentals />} />
          <Route path="/learn/trading-basics" element={<TradingBasics />} />
          <Route path="/learn/crypto-wallets" element={<CryptoWallets />} />
          <Route path="/learn/defi-explained" element={<DefiExplained />} />
          <Route path="/learn/nft-basics" element={<NftBasics />} />
          <Route path="/learn/technical-analysis" element={<TechnicalAnalysis />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
