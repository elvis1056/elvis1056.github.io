import type { Metadata } from 'next';

import { AuthInit } from '@/components/AuthInit';
import Navbar from '@/components/Navbar';

import { QueryProvider } from './query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: '5dpapa - 電商與部落格',
  description: '電商網站兼部落格系統',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>
        <QueryProvider>
          <AuthInit />
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
