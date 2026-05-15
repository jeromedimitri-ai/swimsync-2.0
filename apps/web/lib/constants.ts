// ============================================================
// apps/web/lib/constants.ts
// SwimSync 2.0 — Constantes métier CN Avignon
// Saison 2025-2026
// ============================================================

import type { Bassin, Section, Discipline, DiplomeType, TauxHoraire } from "./types";

// -----------------------------------------------------------
// SAISON
// -----------------------------------------------------------

export const SAISON_COURANTE = "2025-2026";
export const SAISON_DEBUT = "2025-09-01";
export const SAISON_FIN = "2026-06-30";

// -----------------------------------------------------------
// BASSINS CN AVIGNON
// -----------------------------------------------------------

export const BASSINS: Record<Bassin, {
  id: Bassin;
  nom: string;
  shortName: string;
  adresse: string;
  longueur: 25 | 50;
  nombreLignesTotal: number;
  couleur: string;
  actif: boolean;
}> = {
  stade_nautique_olympique: {
    id: "stade_nautique_olympique",
    nom: "Stade Nautique — Bassin Olympique",
    shortName: "SN 50m",
    adresse: "Allée des Jeux, 84000 Avignon",
    longueur: 50,
    nombreLignesTotal: 8,
    couleur: "#0ea5e9",
    actif: true,
  },
  stade_nautique_25m: {
    id: "stade_nautique_25m",
    nom: "Stade Nautique — Bassin 25m",
    shortName: "SN 25m",
    adresse: "Allée des Jeux, 84000 Avignon",
    longueur: 25,
    nombreLignesTotal: 6,
    couleur: "#38bdf8",
    actif: true,
  },
  stuart_mill_olympique: {
    id: "stuart_mill_olympique",
    nom: "Piscine Stuart Mill — Bassin Olympique",
    shortName: "SM 50m",
    adresse: "Chemin du Bois de la Cour, 84000 Avignon",
    longueur: 50,
    nombreLignesTotal: 8,
    couleur: "#6366f1",
    actif: true,
  },
  stuart_mill_25m: {
    id: "stuart_mill_25m",
    nom: "Piscine Stuart Mill — Bassin 25m",
    shortName: "SM 25m",
    adresse: "Chemin du Bois de la Cour, 84000 Avignon",
    longueur: 25,
    nombreLignesTotal: 6,
    couleur: "#818cf8",
    actif: true,
  },
  piscine_cap_sud: {
    id: "piscine_cap_sud",
    nom: "Piscine Cap Sud",
    shortName: "Cap Sud",
    adresse: "Avenue de Fontcouverte, 84000 Avignon",
    longueur: 25,
    nombreLignesTotal: 6,
    couleur: "#10b981",
    actif: true,
  },
};

// -----------------------------------------------------------
// SECTIONS — Couleurs sémantiques
// -----------------------------------------------------------

export const SECTION_CONFIG: Record<Section, {
  label: string;
  couleur: string;
  couleurTexte: string;
  icone: string;
}> = {
  competition:  { label: "Compétition",   couleur: "#ef4444", couleurTexte: "#fff", icone: "🏅" },
  enfants:      { label: "Enfants",        couleur: "#f59e0b", couleurTexte: "#fff", icone: "👦" },
  adultes:      { label: "Adultes",        couleur: "#3b82f6", couleurTexte: "#fff", icone: "🧑" },
  loisirs:      { label: "Loisirs",        couleur: "#22c55e", couleurTexte: "#fff", icone: "🏖️" },
  aquafitness:  { label: "Aquafitness",    couleur: "#a855f7", couleurTexte: "#fff", icone: "🧘" },
  aquapalmes:   { label: "Aquapalmes",     couleur: "#06b6d4", couleurTexte: "#fff", icone: "🤿" },
  bebe_nageur:  { label: "Bébé Nageur",    couleur: "#f97316", couleurTexte: "#fff", icone: "👶" },
  scolaire:     { label: "Scolaire",       couleur: "#84cc16", couleurTexte: "#fff", icone: "🏫" },
  handisport:   { label: "Handisport",     couleur: "#14b8a6", couleurTexte: "#fff", icone: "♿" },
};

// -----------------------------------------------------------
// VACANCES SCOLAIRES ZONE B 2025-2026
// -----------------------------------------------------------

export const VACANCES_ZONE_B: Array<{
  nom: string;
  debut: string;
  fin: string;
}> = [
  { nom: "Toussaint 2025",        debut: "2025-10-18", fin: "2025-11-03" },
  { nom: "Noël 2025",             debut: "2025-12-20", fin: "2026-01-05" },
  { nom: "Hiver 2026",            debut: "2026-02-07", fin: "2026-02-23" },
  { nom: "Printemps 2026",        debut: "2026-04-04", fin: "2026-04-20" },
  { nom: "Grandes vacances 2026", debut: "2026-07-04", fin: "2026-09-01" },
];

// -----------------------------------------------------------
// JOURS FÉRIÉS FRANCE 2025-2026
// -----------------------------------------------------------

export const JOURS_FERIES: Array<{
  date: string;
  nom: string;
}> = [
  { date: "2025-11-01", nom: "Toussaint" },
  { date: "2025-11-11", nom: "Armistice" },
  { date: "2025-12-25", nom: "Noël" },
  { date: "2026-01-01", nom: "Jour de l’An" },
  { date: "2026-04-06", nom: "Lundi de Pâques" },
  { date: "2026-05-01", nom: "Fête du Travail" },
  { date: "2026-05-08", nom: "Victoire 1945" },
  { date: "2026-05-14", nom: "Ascension" },
  { date: "2026-05-25", nom: "Lundi de Pentecôte" },
  { date: "2026-07-14", nom: "Fête Nationale" },
  { date: "2026-08-15", nom: "Assomption" },
];

// -----------------------------------------------------------
// TAUX HORAIRES BRUTS 2025-2026
// -----------------------------------------------------------

export const TAUX_HORAIRES_DEFAULT: Omit<TauxHoraire, "id">[] = [
  { diplomeType: "BNSSA",      taux: 11.88, tauxMajore: 14.26, actif: true, dateEffet: "2025-09-01", notes: "BNSSA seul" },
  { diplomeType: "BPJEPS_AAN", taux: 14.50, tauxMajore: 17.40, actif: true, dateEffet: "2025-09-01", notes: "BPJEPS AAN" },
  { diplomeType: "BEESAN",     taux: 16.80, tauxMajore: 20.16, actif: true, dateEffet: "2025-09-01", notes: "BEESAN" },
  { diplomeType: "DESJEPS",    taux: 21.00, tauxMajore: 25.20, actif: true, dateEffet: "2025-09-01", notes: "DESJEPS" },
  { diplomeType: "DEJEPS",     taux: 18.50, tauxMajore: 22.20, actif: true, dateEffet: "2025-09-01", notes: "DEJEPS" },
  { diplomeType: "MNS",        taux: 13.20, tauxMajore: 15.84, actif: true, dateEffet: "2025-09-01", notes: "MNS" },
];

// -----------------------------------------------------------
// PLAGES HORAIRES PLANNING (8h — 23h, pas 30min)
// -----------------------------------------------------------

export const HEURE_DEBUT_PLANNING = "08:00";
export const HEURE_FIN_PLANNING   = "23:00";
export const PAS_MINUTES           = 30;

export function genererCreneauxHoraires(): string[] {
  const slots: string[] = [];
  let h = 8, m = 0;
  while (h < 23 || (h === 23 && m === 0)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += PAS_MINUTES;
    if (m >= 60) { m = 0; h++; }
  }
  return slots;
}

export const CRENEAUX_HORAIRES = genererCreneauxHoraires();

// -----------------------------------------------------------
// JOURS SEMAINE (ordre FR)
// -----------------------------------------------------------

export const JOURS_SEMAINE = [
  { id: "lundi",     label: "Lundi",     short: "Lun" },
  { id: "mardi",     label: "Mardi",     short: "Mar" },
  { id: "mercredi",  label: "Mercredi",  short: "Mer" },
  { id: "jeudi",     label: "Jeudi",     short: "Jeu" },
  { id: "vendredi",  label: "Vendredi",  short: "Ven" },
  { id: "samedi",    label: "Samedi",    short: "Sam" },
  { id: "dimanche",  label: "Dimanche",  short: "Dim" },
] as const;

// -----------------------------------------------------------
// DIPLOMES — Labels lisibles
// -----------------------------------------------------------

export const DIPLOME_LABELS: Record<DiplomeType, string> = {
  BNSSA:           "BNSSA",
  BPJEPS_AAN:      "BPJEPS AAN",
  BEESAN:          "BEESAN",
  DESJEPS:         "DESJEPS",
  DEJEPS:          "DEJEPS",
  MNS:             "MNS",
  CAEPMNS:         "CAE PMNS",
  BREVET_FEDERAL_1:"Brevet Fédéral 1",
  BREVET_FEDERAL_2:"Brevet Fédéral 2",
  BREVET_FEDERAL_3:"Brevet Fédéral 3",
  CQP_AAN:         "CQP AAN",
  LICENCE_STAPS:   "Licence STAPS",
  MASTER_STAPS:    "Master STAPS",
  PSE1:            "PSE1",
  PSE2:            "PSE2",
  SST:             "SST",
};

// -----------------------------------------------------------
// UTILITAIRES
// -----------------------------------------------------------

export function isJourFerie(date: string): boolean {
  return JOURS_FERIES.some((f) => f.date === date);
}

export function isVacancesScolaires(date: string): boolean {
  return VACANCES_ZONE_B.some(
    (v) => date >= v.debut && date <= v.fin
  );
}

export function getLibelleFerie(date: string): string | undefined {
  return JOURS_FERIES.find((f) => f.date === date)?.nom;
}

export function getLibelleVacances(date: string): string | undefined {
  return VACANCES_ZONE_B.find((v) => date >= v.debut && date <= v.fin)?.nom;
}
