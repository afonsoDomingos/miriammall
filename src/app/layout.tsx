import type { Metadata } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { DatabaseProvider } from '../context/DatabaseContext';
import ScrollToTop from '../components/ScrollToTop';

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
        <DatabaseProvider>
          {children}
          <ScrollToTop />
        </DatabaseProvider>
      </body>
    </html>
  );
}
