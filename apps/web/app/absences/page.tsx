'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AbsencesPage() {
  const absences = [
    {
      id: 1,
      coach: 'Nicolas',
      date: '2024-12-15',
      creneau: 'EN1 - 17h45-19h15',
      bassin: 'Stade Nautique 25m',
      remplaçant: 'Andrea',
      statut: 'Remplacé'
    },
    {
      id: 2,
      coach: 'Lucy',
      date: '2024-12-20',
      creneau: 'EN3 - 19h15-20h45',
      bassin: 'Stuart Mill 25m (int)',
      remplaçant: null,
      statut: 'À remplacer'
    },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Absences & Remplacements</h1>
        <Button>Déclarer une absence</Button>
      </div>

      <div className="space-y-4">
        {absences.map((absence) => (
          <Card key={absence.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{absence.coach} - {new Date(absence.date).toLocaleDateString('fr-FR')}</CardTitle>
                  <CardDescription>{absence.creneau} - {absence.bassin}</CardDescription>
                </div>
                <div>
                  {absence.statut === 'Remplacé' ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      Remplacé
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                      À remplacer
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {absence.remplaçant ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Remplaçant:</span>
                  <span className="text-sm font-medium">{absence.remplaçant}</span>
                </div>
              ) : (
                <Button size="sm">Proposer un remplaçant</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
