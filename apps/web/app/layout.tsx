import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
