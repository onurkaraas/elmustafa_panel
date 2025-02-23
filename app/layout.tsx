import type React from 'react';
import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | El Mustafa',
    default: 'El Mustafa - Video Platform',
  },
  description: 'El Mustafa video platform - Watch and manage your videos',
  generator: 'v0.dev',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

import './globals.css';
