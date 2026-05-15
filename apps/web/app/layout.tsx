import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SwimSync 2.0 | Gestion Planning CN Avignon',
  description:
    'Application de gestion de planning multi-piscines pour le Centre de Natation Avignon. Gérez les créneaux, coaches, groupes, absences, remplacements et paie.',
  keywords: [
    'natation',
    'planning',
    'gestion',
    'piscine',
    'CN Avignon',
    'coaches',
    'créneaux',
    'absences',
  ],
  authors: [{ name: 'CN Avignon' }],
  openGraph: {
    title: 'SwimSync 2.0 - CN Avignon',
    description: 'Gestion de planning multi-piscines pour CN Avignon',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <div<div className="relative flex min-h-screen">
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
