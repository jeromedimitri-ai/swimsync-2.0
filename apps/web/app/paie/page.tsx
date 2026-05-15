import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PaiePage() {
  const moisActuel = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
  
  const paieData = [
    { coach: 'Nicolas', heures: 86.5, tauxHoraire: 25, total: 2162.5 },
    { coach: 'Jérôme', heures: 82, tauxHoraire: 25, total: 2050 },
    { coach: 'Andrea', heures: 54, tauxHoraire: 22, total: 1188 },
    { coach: 'Anabel', heures: 45, tauxHoraire: 23, total: 1035 },
    { coach: 'Amandine', heures: 36, tauxHoraire: 22, total: 792 },
    { coach: 'Lucy', heures: 28, tauxHoraire: 21, total: 588 },
    { coach: 'Marine', heures: 18, tauxHoraire: 20, total: 360 },
    { coach: 'Eric', heures: 14, tauxHoraire: 21, total: 294 },
    { coach: 'Cyril', heures: 9, tauxHoraire: 20, total: 180 },
  ]

  const totalGeneral = paieData.reduce((acc, p) => acc + p.total, 0)
  const totalHeures = paieData.reduce((acc, p) => acc + p.heures, 0)

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion de la Paie</h1>
        <Button>Exporter les données</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Période</CardTitle>
            <CardDescription>Mois en cours</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{moisActuel}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total heures</CardTitle>
            <CardDescription>Tous coachs confondus</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalHeures}h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Montant total</CardTitle>
            <CardDescription>Budget paie du mois</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalGeneral.toLocaleString('fr-FR')} €</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détail par coach</CardTitle>
          <CardDescription>Récapitulatif des heures et montants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Coach</th>
                  <th className="text-right p-2">Heures</th>
                  <th className="text-right p-2">Taux horaire</th>
                  <th className="text-right p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {paieData.map((item) => (
                  <tr key={item.coach} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{item.coach}</td>
                    <td className="text-right p-2">{item.heures}h</td>
                    <td className="text-right p-2">{item.tauxHoraire} €</td>
                    <td className="text-right p-2 font-semibold">{item.total.toLocaleString('fr-FR')} €</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td className="p-2">TOTAL</td>
                  <td className="text-right p-2">{totalHeures}h</td>
                  <td className="text-right p-2">-</td>
                  <td className="text-right p-2">{totalGeneral.toLocaleString('fr-FR')} €</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
