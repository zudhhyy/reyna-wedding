import Navbar from '@/components/base/navbar';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reyna & Wasiq's Wedding",
  description: 'October 26, 2025 — Join us in celebration!',
  keywords: 'wedding, Reyna, Wasiq, celebration, October 26, 2025',
  authors: [{ name: 'Reyna & Wasiq' }],
  creator: 'Reyna & Wasiq',
  openGraph: {
    title: "Reyna & Wasiq's Wedding",
    description: 'October 26, 2025 — Join us in celebration!',
    url: 'https://reynawasiqsaeed.com/',
    siteName: "Reyna & Wasiq's Wedding",
    images: [
      {
        url: '/logo-social.png',
        width: 1200,
        height: 630,
        alt: 'Reyna & Wasiq Wedding Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Reyna & Wasiq's Wedding",
    description: 'October 26, 2025 — Join us in celebration!',
    images: ['/logo-social.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-foreground font-lucy min-h-screen max-w-xl mx-auto">
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
