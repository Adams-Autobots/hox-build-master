import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ExhibitionsPage from "./pages/divisions/ExhibitionsPage";
import EventsPage from "./pages/divisions/EventsPage";
import RetailPage from "./pages/divisions/RetailPage";
import InteriorsPage from "./pages/divisions/InteriorsPage";
import ExhibitionsGalleryPage from "./pages/gallery/ExhibitionsGalleryPage";
import EventsGalleryPage from "./pages/gallery/EventsGalleryPage";
import RetailGalleryPage from "./pages/gallery/RetailGalleryPage";
import InteriorsGalleryPage from "./pages/gallery/InteriorsGalleryPage";
import AuthPage from "./pages/AuthPage";
import GalleryAdminPage from "./pages/admin/GalleryAdminPage";
import SitemapPage from "./pages/SitemapPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/divisions/exhibitions" element={<ExhibitionsPage />} />
          <Route path="/divisions/events" element={<EventsPage />} />
          <Route path="/divisions/retail" element={<RetailPage />} />
          <Route path="/divisions/interiors" element={<InteriorsPage />} />
          <Route path="/gallery/exhibitions" element={<ExhibitionsGalleryPage />} />
          <Route path="/gallery/events" element={<EventsGalleryPage />} />
          <Route path="/gallery/retail" element={<RetailGalleryPage />} />
          <Route path="/gallery/interiors" element={<InteriorsGalleryPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin/gallery" element={<GalleryAdminPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sitemap.xml" element={<SitemapPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
