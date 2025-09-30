import type { Metadata } from 'next';

import { QueryProvider } from './query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'aye1234 - 電商與部落格',
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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
