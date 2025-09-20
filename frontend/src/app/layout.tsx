import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'AI Content Platform',
  description: 'Dashboard for AI-driven content generation',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-white shadow p-4 flex justify-between">
          <span className="font-bold">AI Content Platform</span>
        </nav>
        <main className="p-6 max-w-5xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}