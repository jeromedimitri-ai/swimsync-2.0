import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="mb-4 text-6xl font-bold">
              🏊 SwimSync 2.0
            </h1>
            <p className="text-xl text-muted-foreground">
              Gestion de planning multi-piscines pour CN Avignon
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">📅 Planning</h3>
              <p className="text-sm text-muted-foreground">
                Visualisation jour/semaine/mois des créneaux sur 5 bassins
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">👥 Coaches</h3>
              <p className="text-sm text-muted-foreground">
                Gestion de 9 coaches avec diplômes et disponibilités
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">🏊 Groupes</h3>
              <p className="text-sm text-muted-foreground">
                10 groupes EN1-EN4, Junior, Senior avec niveaux
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">❌ Absences</h3>
              <p className="text-sm text-muted-foreground">
                Gestion des congés, maladies, formations Zone B
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">🔄 Remplacements</h3>
              <p className="text-sm text-muted-foreground">
                Affectation automatique et manuelle des remplaçants
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
              <h3 className="mb-2 text-lg font-semibold">💰 Paie</h3>
              <p className="text-sm text-muted-foreground">
                Calcul heures réalisées et export pour comptabilité
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Accéder au Dashboard
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-border px-6 py-3 font-semibold hover:bg-accent transition-colors"
            >
              Se connecter
            </Link>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>Centre de Natation Avignon</p>
            <p className="mt-1">
              Next.js 14 • TypeScript • Tailwind CSS • Prisma • shadcn/ui
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
