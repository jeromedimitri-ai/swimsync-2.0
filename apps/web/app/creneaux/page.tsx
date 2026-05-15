'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, Bell, Filter, Search, X, Calendar, Clock, Users, AlertTriangle } from 'lucide-react'

// ============================================================================
// 1. TYPES & INTERFACES (Inspirés du script avancé)
// ============================================================================

type Jour = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche'

type Bassin = 'Stade Nautique' | 'Stuart Mill' | 'Folard' | 'Jean Clément' | 'Pierre Reyne'

type Section = 'Compétition' | 'ENF' | 'Adultes' | 'Loisirs'

interface TimeSlot {
  id: string
  groupId: string
  groupName: string
  coach: string
  bassin: Bassin
  startTime: string // Format HH:MM
  endTime: string
  color: string
  section: Section
  niveau?: string
  nageurs?: number
  isAnnule?: boolean
  hasConflict?: boolean
}

interface Group {
  id: string
  name: string
  level: string
  section: Section
  nageurs?: number
  coachIds?: string[]
}

interface VacancesPeriod {
  nom: string
  debut: string
  fin: string
}

// ============================================================================
// 2. CONSTANTES & CONFIGURATION
// ============================================================================

const JOURS: Jour[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const BASSINS: Bassin[] = [
  'Stade Nautique',
  'Stuart Mill',
  'Folard',
  'Jean Clément',
  'Pierre Reyne'
]

const SECTIONS_CONFIG = [
  { id: 'Compétition', label: 'Compétition', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { id: 'ENF', label: 'École Natation', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { id: 'Adultes', label: 'Adultes Masters', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { id: 'Loisirs', label: 'Loisirs Ados', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
] as const

// Jours fériés France 2025-2026
const JOURS_FERIES = [
  '2025-11-01', // Toussaint
  '2025-11-11', // Armistice
  '2025-12-25', // Noël
  '2026-01-01', // Jour de l'an
  '2026-04-06', // Lundi de Pâques
  '2026-05-01', // Fête du travail
  '2026-05-08', // Victoire 1945
  '2026-05-14', // Ascension
  '2026-05-25', // Lundi Pentecôte
]

// Vacances Zone B
const VACANCES_SCOLAIRES: VacancesPeriod[] = [
  { nom: 'Toussaint 2025', debut: '2025-10-18', fin: '2025-11-03' },
  { nom: 'Noël 2025', debut: '2025-12-20', fin: '2026-01-05' },
  { nom: 'Hiver 2026', debut: '2026-02-14', fin: '2026-03-02' },
  { nom: 'Printemps 2026', debut: '2026-04-11', fin: '2026-04-27' },
  { nom: 'Été 2026', debut: '2026-07-04', fin: '2026-09-01' },
]

// Heures de la journée (6h à 22h)
const START_HOUR = 6
const END_HOUR = 22
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => i + START_HOUR)

// ============================================================================
// 3. DONNÉES INITIALES
// ============================================================================

const GROUPS: Group[] = [
  { id: '1', name: 'EN1', level: 'École de Natation 1', section: 'ENF', nageurs: 15 },
  { id: '2', name: 'EN2', level: 'École de Natation 2', section: 'ENF', nageurs: 18 },
  { id: '3', name: 'EN3', level: 'École de Natation 3', section: 'ENF', nageurs: 16 },
  { id: '4', name: 'EN4', level: 'École de Natation 4', section: 'ENF', nageurs: 20 },
  { id: '5', name: 'Juniors', level: 'Juniors', section: 'Compétition', nageurs: 22 },
  { id: '6', name: 'Seniors', level: 'Seniors', section: 'Compétition', nageurs: 28 },
  { id: '7', name: 'Masters', level: 'Adultes', section: 'Adultes', nageurs: 25 },
  { id: '8', name: 'Ados Loisirs', level: 'Ados', section: 'Loisirs', nageurs: 18 },
]

const TIME_SLOTS: TimeSlot[] = [
  // Lundi
  { id: '1', groupId: '1', groupName: 'EN1', coach: 'Nicolas', bassin: 'Stade Nautique', startTime: '17:45', endTime: '19:15', color: 'bg-blue-200', section: 'ENF' },
  { id: '2', groupId: '2', groupName: 'EN2', coach: 'Jérôme', bassin: 'Stade Nautique', startTime: '19:15', endTime: '20:45', color: 'bg-green-200', section: 'ENF' },
  { id: '3', groupId: '5', groupName: 'Juniors', coach: 'Andrea', bassin: 'Stuart Mill', startTime: '17:00', endTime: '18:30', color: 'bg-blue-300', section: 'Compétition' },
  
  // Mardi
  { id: '4', groupId: '1', groupName: 'EN1', coach: 'Nicolas', bassin: 'Stade Nautique', startTime: '17:45', endTime: '19:15', color: 'bg-blue-200', section: 'ENF' },
  { id: '5', groupId: '6', groupName: 'Seniors', coach: 'Jérôme', bassin: 'Stuart Mill', startTime: '19:00', endTime: '21:00', color: 'bg-blue-400', section: 'Compétition' },
  
  // Mercredi
  { id: '6', groupId: '3', groupName: 'EN3', coach: 'Marine', bassin: 'Folard', startTime: '14:00', endTime: '15:00', color: 'bg-green-300', section: 'ENF' },
  { id: '7', groupId: '4', groupName: 'EN4', coach: 'Eric', bassin: 'Folard', startTime: '15:00', endTime: '16:00', color: 'bg-green-400', section: 'ENF' },
  { id: '8', groupId: '5', groupName: 'Juniors', coach: 'Andrea', bassin: 'Stade Nautique', startTime: '16:00', endTime: '17:30', color: 'bg-blue-300', section: 'Compétition' },
  
  // Jeudi
  { id: '9', groupId: '7', groupName: 'Masters', coach: 'Anabel', bassin: 'Stade Nautique', startTime: '12:00', endTime: '13:30', color: 'bg-cyan-200', section: 'Adultes' },
  { id: '10', groupId: '2', groupName: 'EN2', coach: 'Lucy', bassin: 'Jean Clément', startTime: '17:00', endTime: '18:00', color: 'bg-green-200', section: 'ENF' },
  
  // Vendredi
  { id: '11', groupId: '6', groupName: 'Seniors', coach: 'Jérôme', bassin: 'Stade Nautique', startTime: '18:00', endTime: '20:00', color: 'bg-blue-400', section: 'Compétition' },
  { id: '12', groupId: '8', groupName: 'Ados Loisirs', coach: 'Amandine', bassin: 'Stuart Mill', startTime: '18:00', endTime: '19:00', color: 'bg-purple-200', section: 'Loisirs' },
  
  // Samedi
  { id: '13', groupId: '5', groupName: 'Juniors', coach: 'Andrea', bassin: 'Stade Nautique', startTime: '08:00', endTime: '10:00', color: 'bg-blue-300', section: 'Compétition' },
  { id: '14', groupId: '6', groupName: 'Seniors', coach: 'Jérôme', bassin: 'Jean Clément', startTime: '11:00', endTime: '13:00', color: 'bg-blue-400', section: 'Compétition' },
]

// ============================================================================
// 4. FONCTIONS UTILITAIRES
// ============================================================================

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const minutesToTime = (mins: number): string => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const getSlotPosition = (startTime: string, endTime: string) => {
  const dayStart = START_HOUR * 60
  const dayEnd = END_HOUR * 60
  const dayDuration = dayEnd - dayStart

  const start = timeToMinutes(startTime) - dayStart
  const end = timeToMinutes(endTime) - dayStart
  const duration = end - start

  const leftPercent = (start / dayDuration) * 100
  const widthPercent = (duration / dayDuration) * 100

  return { left: `${leftPercent}%`, width: `${widthPercent}%` }
}

const toISODate = (date: Date): string => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const getJourFromDate = (date: Date): Jour => {
  return JOURS[date.getDay() === 0 ? 6 : date.getDay() - 1]
}

const isJourFerie = (date: Date): boolean => {
  return JOURS_FERIES.includes(toISODate(date))
}

const getVacances = (date: Date): VacancesPeriod | null => {
  const iso = toISODate(date)
  return VACANCES_SCOLAIRES.find(v => iso >= v.debut && iso <= v.fin) ?? null
}

const isJourOff = (date: Date): boolean => {
  return isJourFerie(date) || getVacances(date) !== null
}

const formatDateLong = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
}

const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Détection de conflits
const findConflicts = (slots: TimeSlot[]): TimeSlot[] => {
  const conflicts = new Set<string>()
  
  for (let i = 0; i < slots.length; i++) {
    for (let j = i + 1; j < slots.length; j++) {
      const a = slots[i]
      const b = slots[j]
      
      // Même bassin et chevauchement horaire
      if (a.bassin === b.bassin) {
        const aStart = timeToMinutes(a.startTime)
        const aEnd = timeToMinutes(a.endTime)
        const bStart = timeToMinutes(b.startTime)
        const bEnd = timeToMinutes(b.endTime)
        
        if (!(aEnd <= bStart || bEnd <= aStart)) {
          conflicts.add(a.id)
          conflicts.add(b.id)
        }
      }
    }
  }
  
  return slots.map(slot => ({
    ...slot,
    hasConflict: conflicts.has(slot.id)
  }))
}

// ============================================================================
// 5. COMPOSANT PRINCIPAL
// ============================================================================

export default function CreneauxPage() {
  const [selectedDay, setSelectedDay] = useState<Jour>('Lundi')
  const [selectedBassin, setSelectedBassin] = useState<Bassin>('Stade Nautique')
  const [filterSection, setFilterSection] = useState<Section | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Date actuelle simulée pour le jour sélectionné
  const currentDate = useMemo(() => {
    const today = new Date()
    const dayIndex = JOURS.indexOf(selectedDay)
    const currentDayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1
    const diff = dayIndex - currentDayIndex
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + diff)
    return targetDate
  }, [selectedDay])
  
  const isOffDay = isJourOff(currentDate)
  const vacancesPeriod = getVacances(currentDate)
  const isFerie = isJourFerie(currentDate)
  
  // Mise à jour de l'heure actuelle toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 30000)
    return () => clearInterval(interval)
  }, [])
  
  // Calcul de la position de la ligne de temps actuelle
  const nowPx = useMemo(() => {
    const h = currentTime.getHours()
    const m = currentTime.getMinutes()
    const dayStart = START_HOUR * 60
    const dayEnd = END_HOUR * 60
    const dayDuration = dayEnd - dayStart
    const currentMins = h * 60 + m
    return ((currentMins - dayStart) / dayDuration) * 100
  }, [currentTime])
  
  const showNowLine = useMemo(() => {
    const isToday = getJourFromDate(currentTime) === selectedDay
    return isToday && nowPx >= 0 && nowPx <= 100
  }, [currentTime, selectedDay, nowPx])
  
  // Filtrage des créneaux
  const filteredSlots = useMemo(() => {
    let slots = TIME_SLOTS.filter(slot => {
      // Filtre par bassin (implicite via les données)
      // Filtre par section
      if (filterSection !== 'all' && slot.section !== filterSection) return false
      
      // Filtre par recherche
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          slot.groupName.toLowerCase().includes(q) ||
          slot.coach.toLowerCase().includes(q) ||
          slot.bassin.toLowerCase().includes(q)
        )
      }
      
      return true
    })
    
    // Détecter les conflits
    return findConflicts(slots)
  }, [filterSection, searchQuery])
  
  // Slots pour le jour sélectionné
  const slotsForDay = useMemo(() => {
    return filteredSlots.filter(slot => {
      // Simuler l'attribution jour basé sur l'ID (pour démo)
      const dayMap: Record<string, Jour[]> = {
        '1': ['Lundi', 'Mardi'],
        '2': ['Lundi', 'Mardi'],
        '3': ['Lundi'],
        '4': ['Mardi'],
        '5': ['Mardi'],
        '6': ['Mercredi'],
        '7': ['Mercredi'],
        '8': ['Mercredi'],
        '9': ['Jeudi'],
        '10': ['Jeudi'],
        '11': ['Vendredi'],
        '12': ['Vendredi'],
        '13': ['Samedi'],
        '14': ['Samedi'],
      }
      return dayMap[slot.id]?.includes(selectedDay) ?? false
    }).sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
  }, [filteredSlots, selectedDay])
  
  // Statistiques
  const stats = useMemo(() => {
    return {
      totalSlots: slotsForDay.length,
      totalGroups: new Set(slotsForDay.map(s => s.groupName)).size,
      totalCoachs: new Set(slotsForDay.map(s => s.coach)).size,
      conflicts: slotsForDay.filter(s => s.hasConflict).length,
    }
  }, [slotsForDay])
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Créneaux</h1>
          <p className="text-muted-foreground mt-1">
            Planning horizontal - Saison 2025-2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button size="sm">
            + Ajouter un créneau
          </Button>
        </div>
      </div>
      
      {/* Alertes jours off */}
      {isOffDay && (
        <div className={`rounded-xl px-5 py-3 flex items-center gap-3 border ${
          isFerie 
            ? 'bg-red-500/15 border-red-500/40 text-red-200'
            : 'bg-amber-500/15 border-amber-500/40 text-amber-200'
        }`}>
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">
            {isFerie 
              ? `Jour férié - ${capitalize(formatDateLong(currentDate))}`
              : `Vacances scolaires: ${vacancesPeriod?.nom} (Zone B)`
            }
          </span>
          <span className="ml-auto text-sm opacity-70">
            Les séances récurrentes sont automatiquement masquées
          </span>
        </div>
      )}
      
      {/* Filtres avancés */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Section */}
              <div>
                <label className="text-sm font-medium mb-2 block">Section</label>
                <select
                  value={filterSection}
                  onChange={(e) => setFilterSection(e.target.value as Section | 'all')}
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                >
                  <option value="all">Toutes les sections</option>
                  {SECTIONS_CONFIG.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Recherche */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Chercher un groupe, coach, bassin..."
                    className="w-full pl-10 pr-10 py-2 border rounded-lg bg-background"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalSlots}</div>
            <div className="text-sm text-muted-foreground">Créneaux</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalGroups}</div>
            <div className="text-sm text-muted-foreground">Groupes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.totalCoachs}</div>
            <div className="text-sm text-muted-foreground">Coachs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className={`text-2xl font-bold ${
              stats.conflicts > 0 ? 'text-red-500' : 'text-green-500'
            }`}>
              {stats.conflicts}
            </div>
            <div className="text-sm text-muted-foreground">Conflits</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sélecteur de jour */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {JOURS.map(day => (
          <Button
            key={day}
            variant={selectedDay === day ? 'default' : 'outline'}
            onClick={() => setSelectedDay(day)}
            className="capitalize flex-shrink-0"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {day}
          </Button>
        ))}
      </div>
      
      {/* Planning horizontal */}
      <Card>
        <CardHeader>
          <CardTitle>Planning {selectedDay}</CardTitle>
          <CardDescription>
            Vue horizontale avec heures en abscisse - {capitalize(formatDateLong(currentDate))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* En-tête des heures */}
              <div className="flex border-b mb-4">
                <div className="w-48 flex-shrink-0 font-semibold p-3 border-r bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Groupes / Heures
                  </div>
                </div>
                <div className="flex-1 flex relative">
                  {HOURS.map(hour => (
                    <div
                      key={hour}
                      className="flex-1 text-center p-3 border-r text-sm font-semibold"
                    >
                      {hour}:00
                    </div>
                  ))}
                  
                  {/* Ligne de temps actuelle */}
                  {showNowLine && (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
                      style={{ left: `${nowPx}%` }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-1">
                        <div className="bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {minutesToTime(currentTime.getHours() * 60 + currentTime.getMinutes())}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Lignes des groupes */}
              {GROUPS.map(group => {
                const groupSlots = slotsForDay.filter(slot => slot.groupId === group.id)
                
                if (groupSlots.length === 0 && filterSection !== 'all') return null
                
                return (
                  <div key={group.id} className="flex border-b hover:bg-muted/30 transition-colors">
                    {/* Nom du groupe */}
                    <div className="w-48 flex-shrink-0 p-3 border-r bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-semibold">{group.name}</div>
                          <div className="text-xs text-muted-foreground">{group.level}</div>
                          {group.nageurs && (
                            <div className="text-xs text-muted-foreground">
                              {group.nageurs} nageurs
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Zone de planning */}
                    <div className="flex-1 relative" style={{ minHeight: '100px' }}>
                      {/* Grille d'arrière-plan */}
                      <div className="absolute inset-0 flex">
                        {HOURS.map(hour => (
                          <div
                            key={hour}
                            className="flex-1 border-r border-border/50"
                          />
                        ))}
                      </div>
                      
                      {/* Créneaux pour ce groupe */}
                      {groupSlots.map(slot => {
                        const position = getSlotPosition(slot.startTime, slot.endTime)
                        const sectionConfig = SECTIONS_CONFIG.find(s => s.id === slot.section)
                        
                        return (
                          <div
                            key={slot.id}
                            className={`absolute top-2 bottom-2 rounded-lg p-3 border shadow-sm cursor-pointer hover:shadow-lg transition-all overflow-hidden ${
                              slot.hasConflict 
                                ? 'bg-red-500/20 border-red-500 ring-2 ring-red-500'
                                : slot.isAnnule
                                ? 'bg-gray-500/20 border-gray-400 opacity-60'
                                : `${slot.color} border-gray-300`
                            }`}
                            style={{
                              left: position.left,
                              width: position.width,
                            }}
                            title={slot.hasConflict ? 'CONFLIT DÉTECTÉ!' : ''}
                          >
                            {slot.hasConflict && (
                              <div className="absolute top-1 right-1">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                              </div>
                            )}
                            <div className="text-xs font-bold mb-1">
                              {slot.startTime} - {slot.endTime}
                            </div>
                            <div className="text-xs font-semibold">{slot.groupName}</div>
                            <div className="text-xs opacity-80">{slot.coach}</div>
                            <div className="text-xs opacity-70">{slot.bassin}</div>
                            {sectionConfig && (
                              <div className="text-xs mt-1 opacity-60">
                                {sectionConfig.label}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Légende */}
          <div className="mt-6 pt-4 border-t">
            <div className="text-sm font-medium mb-2">Légende:</div>
            <div className="flex flex-wrap gap-4">
              {SECTIONS_CONFIG.map(section => (
                <div key={section.id} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border ${section.color}`} />
                  <span className="text-sm">{section.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border bg-red-500/20 border-red-500 ring-2 ring-red-500" />
                <span className="text-sm">Conflit horaire</span>
              </div>
              {showNowLine && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-red-500" />
                  <span className="text-sm">Heure actuelle</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
