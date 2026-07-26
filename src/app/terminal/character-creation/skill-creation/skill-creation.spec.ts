import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { SkillCreation } from './skill-creation';
import { SKILL_IMAGES } from '../../../core/component/image/skill.images';
import { CharacterCreationService } from '../character-creation.service';
import { SkillCreationService } from './skill-creation-service';
import { SkillKey } from './model/skill.desc';

describe('SkillCreation', () => {
  let component: SkillCreation;
  let fixture: ComponentFixture<SkillCreation>;

  const mockCharacter: any = {
    special: { intelligence: 5 },
    origin: undefined,
    skills: undefined,
  };

  const mockCharacterCreationService = {
    character: mockCharacter,
    saveDraft: vi.fn(() => of(true)),
    getNextStep: vi.fn(() => 'perks'),
    getPreviousStep: vi.fn(() => 'special'),
    goToNextStep: vi.fn(),
    goToPreviousStep: vi.fn(),
  };

  const mockRouter = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    mockCharacter.special = { intelligence: 5 };
    mockCharacter.origin = undefined;
    mockCharacter.skills = undefined;
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [SkillCreation],
      providers: [
        { provide: CharacterCreationService, useValue: mockCharacterCreationService },
        { provide: Router, useValue: mockRouter },
        SkillCreationService, // Utilisation du vrai service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- TESTS EXISTANTS (AFFICHAGE ET IMAGES) ---

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it("ne devrait pas afficher d'image ni de description si aucune compétence n'est active", () => {
    component.activeSkill = null;
    fixture.detectChanges();

    const imageElement = fixture.nativeElement.querySelector('app-image');
    expect(imageElement).toBeNull();
  });

  it("devrait afficher l'image et charger les données correspondant à la compétence active", () => {
    component.activeSkill = 'athletics';

    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();

    expect(component.activeImage).toEqual(SKILL_IMAGES['athletics']);
    const imageElement = fixture.nativeElement.querySelector('app-image');
    expect(imageElement).toBeTruthy();
  });

  it("devrait mettre à jour l'image lors du changement de compétence", () => {
    const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

    component.activeSkill = 'athletics';
    cdr.detectChanges();
    expect(component.activeImage?.name).toBe('Athletics');

    component.activeSkill = 'smallGuns';
    cdr.detectChanges();
    expect(component.activeImage?.name).toBe('SmallGuns');
  });

  // --- TESTS DES 8 RÈGLES MÉTIER DES COMPÉTENCES ---

  describe('Règles des compétences (Skills & FSM)', () => {
    it('Règle 1 : devrait initialiser les points de compétence à 9 + Intelligence du personnage', () => {
      // INT = 5 par défaut dans mockCharacter -> 9 + 5 = 14
      expect(component.remainingPoints).toBe(14);

      // Si INT = 3 -> 9 + 3 = 12
      mockCharacter.special = { intelligence: 3 };
      const newFixture = TestBed.createComponent(SkillCreation);
      const newComponent = newFixture.componentInstance;
      newFixture.detectChanges();

      expect(newComponent.remainingPoints).toBe(12);
    });

    it('Règle 2 : un personnage standard a droit à 3 atouts et chacun donne 2 points de bonus', () => {
      expect(component.taggedSkillsPoints).toBe(3);

      // On tag "smallGuns"
      component.toggleTag('smallGuns', { target: { checked: true } } as any);

      expect(component.skillsCharacter.smallGuns.taggedSkill).toBe(true);
      expect(component.skillsCharacter.smallGuns.rank).toBe(2); // Bonus de 2 points
      expect(component.taggedSkillsPoints).toBe(2);
    });

    it("Règles 3 & 4 : max 3 points à la création et remboursement du surplus si tag d'une compétence à 3 points", () => {
      // 1. Ajout manuel de 3 points en "athletics"
      component.add('athletics');
      component.add('athletics');
      component.add('athletics');
      expect(component.skillsCharacter.athletics.rank).toBe(3);
      expect(component.remainingPoints).toBe(11); // 14 - 3

      // On ne peut plus ajouter un 4ème point
      expect(component.fsm.canAdd('athletics')).toBe(false);

      // 2. On transforme "athletics" en Atout (+2 points théoriques)
      component.toggleTag('athletics', { target: { checked: true } } as any);

      // Le rang reste plafonné à 3
      expect(component.skillsCharacter.athletics.rank).toBe(3);
      // Règle 4 : Les 2 points en trop sont réinjectés dans les points à répartir (11 + 2 = 13)
      expect(component.remainingPoints).toBe(13);
    });

    it('Règle 5 : décocher un atout diminue son rang de 2 sans impacter le reste des points à répartir', () => {
      // Tag "smallGuns" (rang = 2, atouts restants = 2)
      component.toggleTag('smallGuns', { target: { checked: true } } as any);
      expect(component.skillsCharacter.smallGuns.rank).toBe(2);
      const pointsBeforeUntag = component.remainingPoints;

      // Décoche l'atout
      component.toggleTag('smallGuns', { target: { checked: false } } as any);

      expect(component.skillsCharacter.smallGuns.taggedSkill).toBe(false);
      expect(component.skillsCharacter.smallGuns.rank).toBe(0); // Diminue de 2
      expect(component.remainingPoints).toBe(pointsBeforeUntag); // Reste de points inchangé
      expect(component.taggedSkillsPoints).toBe(3); // Récupère son point d'atout
    });

    it('Règle 6 : Origine Initié de la Confrérie -> 1 atout obligatoire à choisir parmi Arme à énergie, Science, Réparation (4 atouts au total)', () => {
      mockCharacter.origin = {
        atoutAChoisirParmi: ['energyWeapons', 'science', 'repair'] as SkillKey[],
      };
      const brotherhoodFixture = TestBed.createComponent(SkillCreation);
      const bhComponent = brotherhoodFixture.componentInstance;
      brotherhoodFixture.detectChanges();

      // 4 points d'atouts au total
      expect(bhComponent.taggedSkillsPoints).toBe(4);
      expect(bhComponent.fsm.mustTagAnObligatorySkill()).toBe(true);

      // Tenter de taguer une compétence hors liste obligatoire ne doit pas fonctionner
      bhComponent.toggleTag('smallGuns', { target: { checked: true } } as any);
      expect(bhComponent.skillsCharacter.smallGuns.taggedSkill).toBe(false);

      // Taguer une des compétences obligatoires débloque la FSM
      bhComponent.toggleTag('science', { target: { checked: true } } as any);
      expect(bhComponent.skillsCharacter.science.taggedSkill).toBe(true);
      expect(bhComponent.fsm.mustTagAnObligatorySkill()).toBe(false);
    });

    it("Règle 7 : Origine Habitant de l'Abri ou Synthé -> 4ème atout à choisir librement", () => {
      mockCharacter.origin = {
        atoutGratuit: true, // Représente le 4ème atout libre accordé par l'origine
      };
      const dwellerFixture = TestBed.createComponent(SkillCreation);
      const dwellerComponent = dwellerFixture.componentInstance;
      dwellerFixture.detectChanges();

      expect(dwellerComponent.taggedSkillsPoints).toBe(4);
      expect(dwellerComponent.fsm.mustTagAnObligatorySkill()).toBe(false);
    });

    it('Règle 8 : Origine Goule -> Survie offert en atout gratuit', () => {
      mockCharacter.origin = {
        atoutOffert: 'survival' as SkillKey,
      };
      const ghoulFixture = TestBed.createComponent(SkillCreation);
      const ghoulComponent = ghoulFixture.componentInstance;
      ghoulFixture.detectChanges();

      expect(ghoulComponent.skillsCharacter.survival.taggedSkill).toBe(true);
      expect(ghoulComponent.skillsCharacter.survival.rank).toBe(2);
      expect(ghoulComponent.skillsCharacter.survival.isOffered).toBe(true);
      // L'atout est offert en bonus, il reste donc les 3 atouts habituels à attribuer
      expect(ghoulComponent.taggedSkillsPoints).toBe(3);
    });
  });
});
