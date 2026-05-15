'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Types
interface TimeSlot {
  id: string
  groupId: string
  groupName: string
  coach: string
  bassin: string
  startTime: string
  endTime: string
  color: string
}

interface Group {
  id: string
  name: string
  level: string
}

// Données de démonstration
const GROUPS: Group[] = [
  { id: '1', name: 'EN1', level: 'École de Natation 1' },
  { id: '2', name: 'EN2', level: 'École de Natation 2' },
  { id: '3', name: 'EN3', level: 'École de Natation 3' },
  { id: '4', name: 'EN4', level: 'École de Natation 4' },
  { id: '5', name: 'Juniors', level: 'Juniors' },
  { id: '6', name: 'Seniors', level: 'Seniors' },
]

const TIME_SLOTS: TimeSlot[] = [
  { id: '1', groupId: '1', groupName: 'EN1', coach: 'Nicolas', bassin: 'Stade Nautique 25m', startTime: '17:45', endTime: '19:15', color: 'bg-blue-200' },
  { id: '2', groupId: '2', groupName: 'EN2', coach: 'Jérôme', bassin: 'Stade Nautique 25m', startTime: '19:15', endTime: '20:45', color: 'bg-green-200' },
  { id: '3', groupId: '1', groupName: 'EN1', coach: 'Nicolas', bassin: 'Stade Nautique 50m', startTime: '17:45', endTime: '19:15', color: 'bg-blue-200' },
  { id: '4', groupId: '2', groupName: 'EN2', coach: 'Jérôme', bassin: 'Stade Nautique 50m', startTime: '19:15', endTime: '20:45', color: 'bg-green-200' },
]

// Heures de la journée (de 6h à 22h)
const HOURS = Array.from({ length: 17 }, (_, i) => i + 6)

// Fonction pour convertir l'heure en minutes depuis minuit
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Fonction pour calculer la position et largeur d'un créneau
const getSlotPosition = (startTime: string, endTime: string) => {
  const dayStart = 6 * 60 // 6h en minutes
  const dayEnd = 22 * 60 // 22h en minutes
  const dayDuration = dayEnd - dayStart

  const start = timeToMinutes(startTime) - dayStart
  const end = timeToMinutes(endTime) - dayStart
  const duration = end - start

  const leftPercent = (start / dayDuration) * 100
  const widthPercent = (duration / dayDuration) * 100

  return { left: `${leftPercent}%`, width: `${widthPercent}%` }
}

export default function CreneauxPage() {
  const [selectedDay, setSelectedDay] = useState<string>('lundi')
  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Créneaux</h1>
          <p className="text-muted-foreground mt-1">Planning horizontal par groupe</p>
        </div>
        <Button>+ Ajouter un créneau</Button>
      </div>

      {/* Sélecteur de jour */}
      <div className="flex gap-2 mb-6">
        {days.map(day => (
          <Button
            key={day}
            variant={selectedDay === day ? 'default' : 'outline'}
            onClick={() => setSelectedDay(day)}
            className="capitalize"
          >
            {day}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Planning {selectedDay}</CardTitle>
          <CardDescription>Vue horizontale avec heures en abscisse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {/* Grille principale */}
            <div className="min-w-[1200px]">
              {/* En-tête des heures */}
              <div className="flex border-b">
                <div className="w-48 flex-shrink-0 font-semibold p-3 border-r bg-gray-50">
                  Groupes / Heures
                </div>
                <div className="flex-1 flex">
                  {HOURS.map(hour => (
                    <div
                      key={hour}
                      className="flex-1 text-center p-3 border-r text-sm font-semibold"
                    >
                      {hour}:00
                    </div>
                  ))}
                </div>
              </div>

              {/* Lignes des groupes */}
              {GROUPS.map(group => (
                <div key={group.id} className="flex border-b hover:bg-gray-50">
                  {/* Nom du groupe */}
                  <div className="w-48 flex-shrink-0 p-3 border-r bg-gray-50">
                    <div className="font-semibold">{group.name}</div>
                    <div className="text-xs text-muted-foreground">{group.level}</div>
                  </div>

                  {/* Zone de planning */}
                  <div className="flex-1 relative" style={{ minHeight: '80px' }}>
                    {/* Grille d'arrière-plan */}
                    <div className="absolute inset-0 flex">
                      {HOURS.map(hour => (
                        <div
                          key={hour}
                          className="flex-1 border-r border-gray-200"
                        />
                      ))}
                    </div>

                    {/* Créneaux pour ce groupe */}
                    {TIME_SLOTS.filter(slot => slot.groupId === group.id).map(slot => {
                      const position = getSlotPosition(slot.startTime, slot.endTime)
                      return (
                        <div
                          key={slot.id}
                          className={`absolute top-2 bottom-2 ${slot.color} rounded-md p-2 border border-gray-300 shadow-sm cursor-pointer hover:shadow-md transition-shadow overflow-hidden`}
                          style={{
                            left: position.left,
                            width: position.width,
                          }}
                        >
                          <div className="text-xs font-semibold">
                            {slot.startTime} - {slot.endTime}
                          </div>
                          <div className="text-xs">{slot.coach}</div>
                          <div className="text-xs text-gray-600">{slot.bassin}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
