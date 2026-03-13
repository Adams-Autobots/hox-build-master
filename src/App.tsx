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

// Retry wrapper for lazy imports — handles chunk load failures on flaky mobile connections
function lazyRetry(factory: () => Promise<any>, retries = 2): ReturnType<typeof lazy> {
  return lazy(() =>
    factory().catch((err) => {
      if (retries > 0) {
        // Force reload from server, not cache
        return new Promise<any>((resolve) => {
          setTimeout(() => resolve(lazyRetry(factory, retries - 1)), 500);
        }).then((mod) => ({ default: mod })).catch(() => factory());
      }
      throw err;
    })
  );
}

// Lazy: everything else (loaded on navigation)
const WorkPage = lazyRetry(() => import("./pages/WorkPage"));
const AboutPage = lazyRetry(() => import("./pages/AboutPage"));
const ContactPage = lazyRetry(() => import("./pages/ContactPage"));
const ExhibitionsPage = lazyRetry(() => import("./pages/divisions/ExhibitionsPage"));
const EventsPage = lazyRetry(() => import("./pages/divisions/EventsPage"));
const RetailPage = lazyRetry(() => import("./pages/divisions/RetailPage"));
const InteriorsPage = lazyRetry(() => import("./pages/divisions/InteriorsPage"));
const ExhibitionsGalleryPage = lazyRetry(() => import("./pages/gallery/ExhibitionsGalleryPage"));
const EventsGalleryPage = lazyRetry(() => import("./pages/gallery/EventsGalleryPage"));
const RetailGalleryPage = lazyRetry(() => import("./pages/gallery/RetailGalleryPage"));
const InteriorsGalleryPage = lazyRetry(() => import("./pages/gallery/InteriorsGalleryPage"));
const AuthPage = lazyRetry(() => import("./pages/AuthPage"));
const GalleryAdminPage = lazyRetry(() => import("./pages/admin/GalleryAdminPage"));
const PrivacyPolicyPage = lazyRetry(() => import("./pages/PrivacyPolicyPage"));
const TermsPage = lazyRetry(() => import("./pages/TermsPage"));
const BlogIndexPage = lazyRetry(() => import("./pages/blog/BlogIndexPage"));
const BlogPostPage = lazyRetry(() => import("./pages/blog/BlogPostPage"));
const LandingPage = lazyRetry(() => import("./pages/landing/LandingPage"));
const NotFound = lazyRetry(() => import("./pages/NotFound"));

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
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/exhibition-stands-dubai" element={<LandingPage />} />
            <Route path="/event-production-dubai" element={<LandingPage />} />
            <Route path="/interior-fit-out-dubai" element={<LandingPage />} />
            <Route path="/retail-display-dubai" element={<LandingPage />} />
            <Route path="/get-a-quote" element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
