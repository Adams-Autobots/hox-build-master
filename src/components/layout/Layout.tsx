import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { StructuredData } from '@/components/seo/StructuredData';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StructuredData />
      <ErrorBoundary fallback={null}>
        <CustomCursor />
      </ErrorBoundary>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
