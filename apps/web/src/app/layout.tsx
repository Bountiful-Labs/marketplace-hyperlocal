import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteHeader } from './_components/site-header';
import './globals.scss';


export const metadata: Metadata = {
  title: {
    default: 'Marketplace Hyperlocal',
    template: '%s | Marketplace Hyperlocal',
  },
  description: 'Produtos, serviços e comércios perto de você.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <SiteHeader />
      <body>{children}</body>
    </html>
  );
}
