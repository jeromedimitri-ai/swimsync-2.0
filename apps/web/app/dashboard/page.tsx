import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Créneaux d'aujourd'hui</CardTitle>
            <CardDescription>Planning du jour</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">créneaux actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coachs disponibles</CardTitle>
            <CardDescription>Statut des éducateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">9</p>
            <p className="text-sm text-muted-foreground">sur 9 coachs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Absences</CardTitle>
            <CardDescription>Absences à gérer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">absences cette semaine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bassins actifs</CardTitle>
            <CardDescription>Utilisation des bassins</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">4/5</p>
            <p className="text-sm text-muted-foreground">bassins en utilisation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Heures de paie</CardTitle>
            <CardDescription>Ce mois-ci</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">486h</p>
            <p className="text-sm text-muted-foreground">heures totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Groupes actifs</CardTitle>
            <CardDescription>Niveaux d'entraînement</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">groupes différents</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
