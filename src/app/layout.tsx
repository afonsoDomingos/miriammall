import type { Metadata } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { DatabaseProvider } from '../context/DatabaseContext';
import { ToastProvider } from '../context/ToastContext';
import ScrollToTop from '../components/ScrollToTop';
import WhatsAppWidget from '../components/WhatsAppWidget';
import WelcomePopup from '../components/WelcomePopup';
import CookieBanner from '../components/CookieBanner';
import GoogleAdScript from '../components/GoogleAdScript';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://miriammall.com'),
  title: 'Miriam Mall | O Novo Centro de Compras e Negócios de Homoíne',
  description:
    'Seja bem-vindo ao Miriam Mall no Distrito de Homoíne, Inhambane. O destino de compras, lazer e a melhor oportunidade de investimento e arrendamento de espaços comerciais da região.',
  keywords: [
    'Miriam Mall',
    'Homoíne',
    'Inhambane',
    'Moçambique',
    'Shopping Center Moçambique',
    'Arrendamento de lojas Homoíne',
    'Comércio Inhambane',
    'Investimento Moçambique',
  ],
  authors: [{ name: 'Miriam Mall' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://miriammall.com',
  },
  openGraph: {
    title: 'Miriam Mall | O Novo Centro de Compras e Negócios de Homoíne',
    description:
      'Seja bem-vindo ao Miriam Mall no Distrito de Homoíne, Inhambane. O destino de compras, lazer e a melhor oportunidade de investimento e arrendamento de espaços comerciais da região.',
    url: 'https://miriammall.com',
    siteName: 'Miriam Mall',
    locale: 'pt_MZ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-primary">
        <GoogleAdScript />
        <ToastProvider>
          <DatabaseProvider>
            {children}
            <ScrollToTop />
            <WhatsAppWidget />
            <WelcomePopup />
            <CookieBanner />
          </DatabaseProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
