import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CoachsPage() {
  const coachs = [
    { nom: 'Nicolas', diplome: 'BPJEPS', statut: 'Temps plein', heures: 20 },
    { nom: 'Jérôme', diplome: 'BPJEPS', statut: 'Temps plein', heures: 20 },
    { nom: 'Andrea', diplome: 'BPJEPS', statut: 'Temps partiel', heures: 12 },
    { nom: 'Anabel', diplome: 'BEESAN', statut: 'Temps partiel', heures: 10 },
    { nom: 'Amandine', diplome: 'BPJEPS', statut: 'Temps partiel', heures: 8 },
    { nom: 'Lucy', diplome: 'BEESAN', statut: 'Temps partiel', heures: 6 },
    { nom: 'Marine', diplome: 'BPJEPS', statut: 'Vacataire', heures: 4 },
    { nom: 'Eric', diplome: 'BEESAN', statut: 'Vacataire', heures: 3 },
    { nom: 'Cyril', diplome: 'BPJEPS', statut: 'Vacataire', heures: 2 },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des Coachs</h1>
        <Button>Ajouter un coach</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coachs.map((coach) => (
          <Card key={coach.nom}>
            <CardHeader>
              <CardTitle>{coach.nom}</CardTitle>
              <CardDescription>{coach.diplome}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Statut:</span>
                  <span className="text-sm font-medium">{coach.statut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Heures/semaine:</span>
                  <span className="text-sm font-medium">{coach.heures}h</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">Éditer</Button>
                  <Button variant="outline" size="sm" className="flex-1">Planning</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
