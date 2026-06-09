import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KERIGMA 24H — Relógio de Oração',
  description:
    'Rede de Oração, Evangelização e Discipulado — Assembleia de Deus Jardim Del Rey, São José dos Pinhais - PR. Pescar almas é amar pessoas.',
  keywords: ['kerigma', 'oração', 'evangelismo', 'assembleia de deus', 'vigília', 'noite do reencontro'],
  authors: [{ name: 'Projeto Kerigma' }],
  openGraph: {
    title: 'KERIGMA 24H — Relógio de Oração',
    description: 'Participe da Rede de Oração 24h. Pescar almas é amar pessoas.',
    type: 'website',
    locale: 'pt_BR',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#0057FF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(0,13,46,0.95)',
              border: '1px solid rgba(0,87,255,0.3)',
              color: 'white',
              backdropFilter: 'blur(20px)',
            },
          }}
        />
      </body>
    </html>
  );
}
