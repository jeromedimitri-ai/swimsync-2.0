// ============================================================
// apps/web/lib/types.ts
// SwimSync 2.0 — Types métier complets
// CN Avignon — Saison 2025-2026
// ============================================================

// -----------------------------------------------------------
// ENUMS & UNION TYPES — Environnement
// -----------------------------------------------------------

export type Jour =
  | "lundi" | "mardi" | "mercredi" | "jeudi"
  | "vendredi" | "samedi" | "dimanche";

export type Bassin =
  | "stade_nautique_olympique"
  | "stade_nautique_25m"
  | "stuart_mill_olympique"
  | "stuart_mill_25m"
  | "piscine_cap_sud";

export type TypeSalle = "50m" | "25m" | "pataugeoire" | "salle_fitness" | "salle_reunion";

export type ModeReservation = "permanent" | "ponctuel" | "vacances" | "hors_vacances";

export type ViewMode = "jour" | "semaine" | "mois" | "liste";

export type Section =
  | "competition" | "enfants" | "adultes" | "loisirs"
  | "aquafitness" | "aquapalmes" | "bebe_nageur" | "scolaire" | "handisport";

export type Discipline =
  | "natation_course" | "eau_libre" | "natation_synchronisee"
  | "water_polo" | "plongeon" | "prepaphysique"
  | "aquafitness" | "aquapalmes" | "eveil_aquatique";

export type IntensiteCible =
  | "loisir" | "initiation" | "developpement" | "performance" | "haut_niveau";

export type PublicCible =
  | "bebe_3_36mois" | "eveil_3_6ans"
  | "en1" | "en2" | "en3" | "en4"
  | "juniors" | "seniors" | "masters"
  | "adultes_loisirs" | "handisport" | "mixte";

export type TypeSeance =
  | "technique" | "volume" | "intensif" | "lactique" | "sprint"
  | "recuperation" | "test" | "competition" | "fun" | "decouverte";

// -----------------------------------------------------------
// ENUMS — Diplômes & Rôles
// -----------------------------------------------------------

export type DiplomeType =
  | "BNSSA" | "BPJEPS_AAN" | "BEESAN" | "DESJEPS" | "DEJEPS"
  | "MNS" | "CAEPMNS" | "BREVET_FEDERAL_1" | "BREVET_FEDERAL_2"
  | "BREVET_FEDERAL_3" | "CQP_AAN" | "LICENCE_STAPS" | "MASTER_STAPS"
  | "PSE1" | "PSE2" | "SST";

export type DiplomeStatut = "valide" | "alerte" | "expire" | "en_cours";

export type Role =
  | "super_admin" | "direction" | "responsable_technique"
  | "coach" | "benevole" | "parent" | "nageur";

// -----------------------------------------------------------
// ENUMS — Annulations & Rappels
// -----------------------------------------------------------

export type RaisonAnnulation =
  | "ferie" | "vacances_scolaires" | "competition" | "stage"
  | "travaux" | "absence_coach" | "raison_sanitaire" | "intemperies"
  | "decision_direction" | "manque_nageurs" | "autre";

export type TypeAnnulation = "ponctuelle" | "recurrente" | "periode";
export type StatutRappel = "en_attente" | "envoye" | "echec" | "annule";
export type CanalRappel = "email" | "whatsapp" | "sms" | "notification_push";

// -----------------------------------------------------------
// ENUMS — Absences & Remplacements
// -----------------------------------------------------------

export type TypeAbsence =
  | "maladie" | "conge_paye" | "formation" | "mission_club"
  | "conge_sans_solde" | "accident_travail" | "garde_enfant" | "autre";

export type StatutRemplacement =
  | "a_pourvoir" | "propose" | "accepte" | "refuse" | "annule_creneau";

export type ModeContact = "whatsapp" | "telephone" | "email" | "sms";

export type StatutPaie = "brouillon" | "valide" | "envoye" | "paye";

// -----------------------------------------------------------
// ENTITÉS — Diplômes
// -----------------------------------------------------------

export interface Diplome {
  id: string;
  type: DiplomeType;
  label: string;
  dateValidation: string;
  dateExpiration?: string;
  organismeFormateur?: string;
  numeroCarte?: string;
  statut: DiplomeStatut;
  estPrincipal: boolean;
  fichierUrl?: string;
}

// -----------------------------------------------------------
// ENTITÉS — Coach
// -----------------------------------------------------------

export interface Coach {
  id: string;
  prenom: string;
  nom: string;
  nomComplet: string;
  couleur: string;
  initiales: string;
  email: string;
  telephone?: string;
  whatsapp?: string;
  diplomes: Diplome[];
  diplomePrincipalId?: string;
  sectionsAutorisees: Section[];
  disciplinesAutorisees: Discipline[];
  role: Role;
  statut: "actif" | "inactif" | "conge" | "rupture_contrat";
  tauxHoraireOverride?: number;
  heuresContrat?: number;
  dateEntree?: string;
  dateSortie?: string;
  photoUrl?: string;
  notes?: string;
}

// -----------------------------------------------------------
// ENTITÉS — Groupe
// -----------------------------------------------------------

export interface Groupe {
  id: string;
  nom: string;
  shortName: string;
  section: Section;
  discipline: Discipline;
  publicCible: PublicCible;
  intensiteCible: IntensiteCible;
  couleur: string;
  icone?: string;
  nombreNageursMin?: number;
  nombreNageursMax?: number;
  nombreNageursActuel?: number;
  codeExterne?: string;
  saison: string;
  coachPrincipalId?: string;
  coachsIds: string[];
  notes?: string;
  actif: boolean;
}

// -----------------------------------------------------------
// ENTITÉS — Profil Pédagogique
// -----------------------------------------------------------

export interface ProfilPedagogique {
  typeSeance: TypeSeance;
  objectifPrincipal?: string;
  objectifsSecondaires?: string[];
  capaciteMax?: number;
  intensitePercue?: 1 | 2 | 3 | 4 | 5;
  materielRequis?: string[];
  notes?: string;
}

// -----------------------------------------------------------
// ENTITÉS — Créneau
// -----------------------------------------------------------

export interface Creneau {
  id: string;
  jour: Jour;
  heureDebut: string;
  heureFin: string;
  dureeMinutes: number;
  bassin: Bassin;
  typeSalle: TypeSalle;
  nombreLignes: number;
  lignesAttribuees?: number[];
  modeReservation: ModeReservation;
  groupeId: string;
  coachsIds: string[];
  coachPrincipalId?: string;
  section: Section;
  profil: ProfilPedagogique;
  estEligiblePaie: boolean;
  estRecurrent: boolean;
  dateDebutValidite?: string;
  dateFinValidite?: string;
  annulations: Annulation[];
  rappels: Rappel[];
  couleurOverride?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------
// ENTITÉS — Annulation
// -----------------------------------------------------------

export interface Annulation {
  id: string;
  creneauId: string;
  type: TypeAnnulation;
  raison: RaisonAnnulation;
  raisonDetail?: string;
  dateDebut: string;
  dateFin?: string;
  notifierNageurs: boolean;
  notifierParents: boolean;
  messagePersonnalise?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------
// ENTITÉS — Rappel
// -----------------------------------------------------------

export interface Rappel {
  id: string;
  creneauId: string;
  canal: CanalRappel;
  statut: StatutRappel;
  dateEnvoi: string;
  destinataires: string[];
  message: string;
  erreur?: string;
  createdAt: string;
}

// -----------------------------------------------------------
// ENTITÉS — Absence Coach
// -----------------------------------------------------------

export interface CoachAbsence {
  id: string;
  coachId: string;
  type: TypeAbsence;
  dateDebut: string;
  dateFin: string;
  motif?: string;
  justificatifUrl?: string;
  creneauxImpactes: string[];
  remplacementsIds: string[];
  valideePar?: string;
  valideeAt?: string;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------
// ENTITÉS — Remplacement
// -----------------------------------------------------------

export interface CoachRemplacement {
  id: string;
  absenceId: string;
  creneauId: string;
  coachAbsentId: string;
  coachRemplacantId?: string;
  statut: StatutRemplacement;
  dateRemplacement: string;
  modeContact?: ModeContact;
  messagePropose?: string;
  contacteAt?: string;
  reponseAt?: string;
  validePar?: string;
  valideAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------
// ENTITÉS — Taux Horaire
// -----------------------------------------------------------

export interface TauxHoraire {
  id: string;
  diplomeType: DiplomeType;
  section?: Section;
  taux: number;
  tauxMajore?: number;
  actif: boolean;
  dateEffet: string;
  dateFinEffet?: string;
  notes?: string;
}

// -----------------------------------------------------------
// ENTITÉS — Paie
// -----------------------------------------------------------

export interface LignePaie {
  creneauId: string;
  creneauLabel: string;
  date: string;
  coachId: string;
  dureeHeures: number;
  tauxApplique: number;
  montantBrut: number;
  estMajore: boolean;
  motifExclusion?: string;
}

export interface BulletinPaie {
  id: string;
  coachId: string;
  periode: string;
  statut: StatutPaie;
  lignes: LignePaie[];
  totalHeures: number;
  totalBrut: number;
  totalDeductions: number;
  totalNet: number;
  valideePar?: string;
  valideeAt?: string;
  createdAt: string;
  updatedAt: string;
}

// -----------------------------------------------------------
// ENTITÉS — Backup / Export
// -----------------------------------------------------------

export interface BackupFile {
  version: "2.0";
  exportedAt: string;
  exportedBy: string;
  saison: string;
  data: {
    coachs: Coach[];
    groupes: Groupe[];
    creneaux: Creneau[];
    absences: CoachAbsence[];
    remplacements: CoachRemplacement[];
    tauxHoraires: TauxHoraire[];
    bulletinsPaie: BulletinPaie[];
  };
  meta: {
    totalCreneaux: number;
    totalCoachs: number;
    totalGroupes: number;
    checksum?: string;
  };
}

// -----------------------------------------------------------
// UTILITAIRES — Props communes
// -----------------------------------------------------------

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface FilterState {
  bassin?: Bassin[];
  section?: Section[];
  coachId?: string[];
  groupeId?: string[];
  jour?: Jour[];
  viewMode: ViewMode;
  dateReference: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
  pagination?: PaginationParams;
}
