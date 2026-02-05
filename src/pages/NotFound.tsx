import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { HoverText } from "@/components/ui/HoverText";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-9xl font-bold text-primary/20">404</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 hox-brand">
              <HoverText>page not found.</HoverText>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                back to home
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
