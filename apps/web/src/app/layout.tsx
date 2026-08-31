import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace Hyperlocal',
  description: 'A hyperlocal marketplace connecting local businesses with community members',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
