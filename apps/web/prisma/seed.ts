// SwimSync 2.0 - Seed Database
// Données initiales pour CN Avignon

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🏊 Début du seeding SwimSync 2.0...')

  // Nettoyage des données existantes
  await prisma.paie.deleteMany()
  await prisma.remplacement.deleteMany()
  await prisma.absence.deleteMany()
  await prisma.creneau.deleteMany()
  await prisma.groupe.deleteMany()
  await prisma.bassin.deleteMany()
  await prisma.coach.deleteMany()
  await prisma.jourFerie.deleteMany()

  // ========================================
  // BASSINS
  // ========================================
  console.log('📍 Création des bassins...')
  const stadeNautique = await prisma.bassin.create({
    data: {
      nom: 'Stade Nautique Avignon',
      adresse: 'Avenue Pierre de Coubertin, 84000 Avignon',
      capacite: 8,
      longueur: 50,
      actif: true
    }
  })

  const stuartMill = await prisma.bassin.create({
    data: {
      nom: 'Piscine Stuart Mill',
      adresse: 'Rue Stuart Mill, 84000 Avignon',
      capacite: 6,
      longueur: 25,
      actif: true
    }
  })

  const courtine = await prisma.bassin.create({
    data: {
      nom: 'Piscine La Courtine',
      adresse: 'Rue de la Courtine, 84000 Avignon',
      capacite: 4,
      longueur: 25,
      actif: true
    }
  })

  const reine = await prisma.bassin.create({
    data: {
      nom: 'Piscine La Reine',
      adresse: 'Rue de la Reine, 84000 Avignon',
      capacite: 4,
      longueur: 25,
      actif: true
    }
  })

  const montfavet = await prisma.bassin.create({
    data: {
      nom: 'Piscine Montfavet',
      adresse: 'Montfavet, 84140 Avignon',
      capacite: 4,
      longueur: 25,
      actif: true
    }
  })

  // ========================================
  // COACHES
  // ========================================
  console.log('👥 Création des coaches...')
  const coaches = await Promise.all([
    prisma.coach.create({
      data: {
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@cnavignon.fr',
        telephone: '0612345678',
        diplomes: ['BEESAN', 'BPJEPS AAN'],
        actif: true
      }
    }),
    prisma.coach.create({
      data: {
        nom: 'Dubois',
        prenom: 'Thomas',
        email: 'thomas.dubois@cnavignon.fr',
        telephone: '0623456789',
        diplomes: ['BPJEPS AAN'],
        actif: true
      }
    }),
    prisma.coach.create({
      data: {
        nom: 'Bernard',
        prenom: 'Julie',
        email: 'julie.bernard@cnavignon.fr',
        telephone: '0634567890',
        diplomes: ['BEESAN', 'DEJEPS'],
        actif: true
      }
    }),
    prisma.coach.create({
      data: {
        nom: 'Petit',
        prenom: 'Marc',
        email: 'marc.petit@cnavignon.fr',
        telephone: '0645678901',
        diplomes: ['BPJEPS AAN'],
        actif: true
      }
    }),
    prisma.coach.create({
      data: {
        nom: 'Moreau',
        prenom: 'Laura',
        email: 'laura.moreau@cnavignon.fr',
        telephone: '0656789012',
        diplomes: ['BEESAN'],
        actif: true
      }
    }),
    prisma.coach.create({
      data: {
        nom: 'Laurent',
        prenom: 'Antoine',
        email: 'antoine.laurent@cnavignon.fr',
        telephone: '0667890123',
        diplomes: ['BPJEPS AAN', 'DEJEPS'],
        actif: true
      }
    }),
    prisma.coach.create({
      data: {
        nom: 'Simon',
        prenom: 'Camille',
        email: 'camille.simon@cnavignon.fr',
        telephone: '0678901234',
        diplomes: ['BEESAN'],
        actif: true
      }
    }),
    prisma.coach.create({
      data: {
        nom: 'Michel',
        prenom: 'Alexandre',
        email: 'alexandre.michel@cnavignon.fr',
        telephone: '0689012345',
        diplomes: ['BPJEPS AAN'],
        actif: true
      }
    }),
    prisma.coach.create({
      data: {
        nom: 'Lefevre',
        prenom: 'Emma',
        email: 'emma.lefevre@cnavignon.fr',
        telephone: '0690123456',
        diplomes: ['BEESAN', 'BPJEPS AAN'],
        actif: true
      }
    })
  ])

  // ========================================
  // GROUPES
  // ========================================
  console.log('🏊 Création des groupes...')
  const groupes = await Promise.all([
    prisma.groupe.create({
      data: {
        nom: 'EN1',
        niveau: 'École de Natation 1',
        ageMin: 6,
        ageMax: 8,
        description: 'Découverte et apprentissage des bases',
        actif: true
      }
    }),
    prisma.groupe.create({
      data: {
        nom: 'EN2',
        niveau: 'École de Natation 2',
        ageMin: 8,
        ageMax: 10,
        description: 'Perfectionnement technique des 4 nages',
        actif: true
      }
    }),
    prisma.groupe.create({
      data: {
        nom: 'EN3',
        niveau: 'École de Natation 3',
        ageMin: 10,
        ageMax: 12,
        description: 'Préparation compétition',
        actif: true
      }
    }),
    prisma.groupe.create({
      data: {
        nom: 'EN4',
        niveau: 'École de Natation 4',
        ageMin: 11,
        ageMax: 13,
        description: 'Entrée en compétition',
        actif: true
      }
    }),
    prisma.groupe.create({
      data: {
        nom: 'Avenirs',
        niveau: 'Catégorie Avenirs',
        ageMin: 12,
        ageMax: 14,
        description: 'Compétition régionale',
        actif: true
      }
    }),
    prisma.groupe.create({
      data: {
        nom: 'Jeunes',
        niveau: 'Catégorie Jeunes',
        ageMin: 13,
        ageMax: 15,
        description: 'Compétition départementale et régionale',
        actif: true
      }
    }),
    prisma.groupe.create({
      data: {
        nom: 'Juniors',
        niveau: 'Catégorie Juniors',
        ageMin: 15,
        ageMax: 18,
        description: 'Compétition régionale et nationale',
        actif: true
      }
    }),
    prisma.groupe.create({
      data: {
        nom: 'Seniors',
        niveau: 'Catégorie Seniors',
        ageMin: 18,
        ageMax: 99,
        description: 'Compétition nationale et internationale',
        actif: true
      }
    }),
    prisma.groupe.create({
      data: {
        nom: 'Masters',
        niveau: 'Maîtres',
        ageMin: 25,
        ageMax: 99,
        description: 'Natation loisir et compétition masters',
        actif: true
      }
    }),
    prisma.groupe.create({
      data: {
        nom: 'Loisirs',
        niveau: 'Natation Loisirs',
        ageMin: 16,
        ageMax: 99,
        description: 'Pratique loisir sans objectif compétitif',
        actif: true
      }
    })
  ])

  // ========================================
  // CRÉNEAUX (exemples sur la semaine)
  // ========================================
  console.log('📅 Création des créneaux...')
  await Promise.all([
    // Lundi
    prisma.creneau.create({
      data: {
        jour: 'LUNDI',
        heureDebut: '17:45',
        heureFin: '19:00',
        recurrent: true,
        actif: true,
        coachId: coaches[0].id,
        groupeId: groupes[0].id,
        bassinId: stadeNautique.id
      }
    }),
    prisma.creneau.create({
      data: {
        jour: 'LUNDI',
        heureDebut: '19:00',
        heureFin: '20:15',
        recurrent: true,
        actif: true,
        coachId: coaches[1].id,
        groupeId: groupes[2].id,
        bassinId: stadeNautique.id
      }
    }),
    // Mardi
    prisma.creneau.create({
      data: {
        jour: 'MARDI',
        heureDebut: '17:45',
        heureFin: '19:00',
        recurrent: true,
        actif: true,
        coachId: coaches[2].id,
        groupeId: groupes[1].id,
        bassinId: stuartMill.id
      }
    }),
    // Mercredi
    prisma.creneau.create({
      data: {
        jour: 'MERCREDI',
        heureDebut: '14:00',
        heureFin: '15:15',
        recurrent: true,
        actif: true,
        coachId: coaches[3].id,
        groupeId: groupes[3].id,
        bassinId: stadeNautique.id
      }
    }),
    prisma.creneau.create({
      data: {
        jour: 'MERCREDI',
        heureDebut: '15:15',
        heureFin: '16:30',
        recurrent: true,
        actif: true,
        coachId: coaches[4].id,
        groupeId: groupes[4].id,
        bassinId: stadeNautique.id
      }
    }),
    // Jeudi
    prisma.creneau.create({
      data: {
        jour: 'JEUDI',
        heureDebut: '17:45',
        heureFin: '19:00',
        recurrent: true,
        actif: true,
        coachId: coaches[5].id,
        groupeId: groupes[5].id,
        bassinId: courtine.id
      }
    }),
    // Vendredi
    prisma.creneau.create({
      data: {
        jour: 'VENDREDI',
        heureDebut: '17:45',
        heureFin: '19:00',
        recurrent: true,
        actif: true,
        coachId: coaches[6].id,
        groupeId: groupes[6].id,
        bassinId: reine.id
      }
    }),
    // Samedi
    prisma.creneau.create({
      data: {
        jour: 'SAMEDI',
        heureDebut: '09:00',
        heureFin: '10:30',
        recurrent: true,
        actif: true,
        coachId: coaches[7].id,
        groupeId: groupes[7].id,
        bassinId: stadeNautique.id
      }
    }),
    prisma.creneau.create({
      data: {
        jour: 'SAMEDI',
        heureDebut: '10:30',
        heureFin: '12:00',
        recurrent: true,
        actif: true,
        coachId: coaches[8].id,
        groupeId: groupes[8].id,
        bassinId: montfavet.id
      }
    })
  ])

  // ========================================
  // JOURS FÉRIÉS 2026 - Zone B
  // ========================================
  console.log('📆 Création des jours fériés...')
  await Promise.all([
    prisma.jourFerie.create({
      data: {
        nom: 'Vacances de Noël 2025-2026',
        dateDebut: new Date('2025-12-20'),
        dateFin: new Date('2026-01-05'),
        zone: 'B',
        type: 'VACANCES'
      }
    }),
    prisma.jourFerie.create({
      data: {
        nom: 'Vacances d\'Hiver',
        dateDebut: new Date('2026-02-07'),
        dateFin: new Date('2026-02-23'),
        zone: 'B',
        type: 'VACANCES'
      }
    }),
    prisma.jourFerie.create({
      data: {
        nom: 'Vacances de Printemps',
        dateDebut: new Date('2026-04-04'),
        dateFin: new Date('2026-04-20'),
        zone: 'B',
        type: 'VACANCES'
      }
    }),
    prisma.jourFerie.create({
      data: {
        nom: 'Pont de l\'Ascension',
        dateDebut: new Date('2026-05-14'),
        dateFin: new Date('2026-05-18'),
        zone: 'B',
        type: 'VACANCES'
      }
    }),
    prisma.jourFerie.create({
      data: {
        nom: 'Vacances d\'Été',
        dateDebut: new Date('2026-07-04'),
        dateFin: new Date('2026-09-01'),
        zone: 'B',
        type: 'VACANCES'
      }
    })
  ])

  console.log('✅ Seeding terminé avec succès!')
  console.log(`- ${coaches.length} coaches créés`)
  console.log(`- ${groupes.length} groupes créés`)
  console.log(`- 5 bassins créés`)
  console.log(`- 9 créneaux créés`)
  console.log(`- 5 périodes de vacances créées`)
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
