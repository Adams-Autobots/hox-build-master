import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollToTop } from "@/components/ScrollToTop";

// Eager: homepage (critical path)
import Index from "./pages/Index";

// Lazy: everything else (loaded on navigation)
const WorkPage = lazy(() => import("./pages/WorkPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ExhibitionsPage = lazy(() => import("./pages/divisions/ExhibitionsPage"));
const EventsPage = lazy(() => import("./pages/divisions/EventsPage"));
const RetailPage = lazy(() => import("./pages/divisions/RetailPage"));
const InteriorsPage = lazy(() => import("./pages/divisions/InteriorsPage"));
const ExhibitionsGalleryPage = lazy(() => import("./pages/gallery/ExhibitionsGalleryPage"));
const EventsGalleryPage = lazy(() => import("./pages/gallery/EventsGalleryPage"));
const RetailGalleryPage = lazy(() => import("./pages/gallery/RetailGalleryPage"));
const InteriorsGalleryPage = lazy(() => import("./pages/gallery/InteriorsGalleryPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const GalleryAdminPage = lazy(() => import("./pages/admin/GalleryAdminPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal loading state — avoids layout shift
function PageLoader() {
  return <div className="min-h-screen bg-background" />;
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<WorkPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
