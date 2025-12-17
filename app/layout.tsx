import type { Metadata } from 'next';

import 'github-markdown-css/github-markdown-light.css';

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
      <head>
        <meta
          content="hce2ToOyyPUu1SFJ41CA6EpBz1rqcIqFFYfWKO5MKSM"
          name="google-site-verification"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body {
              opacity: 0;
              transition: opacity .5s ease-in;
            }
            body.loaded {
              opacity: 1;
            }
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.addEventListener('load', () => {
              document.body.classList.add('loaded');
            });
          `,
          }}
        />
      </head>
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
