import Navbar from '@/components/base/navbar';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reyna & Wasiq's Wedding",
  description: 'October 26, 2025 — Join us in celebration!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-foreground font-lucy min-h-screen">
        <Navbar />

        {/* MAIN CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="text-center py-6 text-xs font-lucy text-secondary">
          © {new Date().getFullYear()} Reyna & Wasiq — All rights reserved
        </footer>
      </body>
    </html>
  );
}
