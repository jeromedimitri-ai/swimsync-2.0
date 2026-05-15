'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type ViewMode = 'day' | 'week' | 'month'

export default function PlanningPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('week')

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Planning</h1>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'day' ? 'default' : 'outline'}
            onClick={() => setViewMode('day')}
          >
            Jour
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            onClick={() => setViewMode('week')}
          >
            Semaine
          </Button>
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            onClick={() => setViewMode('month')}
          >
            Mois
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Planning {viewMode === 'day' ? 'du jour' : viewMode === 'week' ? 'de la semaine' : 'du mois'}</CardTitle>
          <CardDescription>
            Vue {viewMode === 'day' ? 'journalière' : viewMode === 'week' ? 'hebdomadaire' : 'mensuelle'} des créneaux par bassin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Bassins */}
            {['Stade Nautique 25m', 'Stade Nautique 50m', 'Stuart Mill 25m (int)', 'Stuart Mill 25m (ext)', 'Champfleury'].map((bassin) => (
              <div key={bassin} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{bassin}</h3>
                <div className="grid grid-cols-7 gap-2">
                  {/* Exemple de créneaux */}
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                    <div className="text-xs font-semibold">17h45-19h15</div>
                    <div className="text-xs">EN1</div>
                    <div className="text-xs text-muted-foreground">Nicolas</div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                    <div className="text-xs font-semibold">19h15-20h45</div>
                    <div className="text-xs">EN2</div>
                    <div className="text-xs text-muted-foreground">Jérôme</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
