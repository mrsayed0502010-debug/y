import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QuranPage from "./pages/QuranPage";
import AzkarPage from "./pages/AzkarPage";
import TasbihPage from "./pages/TasbihPage";
import PrayerPage from "./pages/PrayerPage";
import QiblaPage from "./pages/QiblaPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quran" element={<QuranPage />} />
          <Route path="/azkar" element={<AzkarPage />} />
          <Route path="/tasbih" element={<TasbihPage />} />
          <Route path="/prayer" element={<PrayerPage />} />
          <Route path="/qibla" element={<QiblaPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
