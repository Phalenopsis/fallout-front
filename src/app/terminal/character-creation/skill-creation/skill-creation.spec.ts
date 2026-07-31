import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { SkillCreation } from './skill-creation';
import { SKILL_IMAGES } from '../../../core/component/image/skill.images';
import { CharacterCreationService } from '../character-creation.service';
import { SkillCreationService } from './skill-creation-service';
import { SkillKey } from '../../../core/constants/skill-data.constant';

describe('SkillCreation', () => {
  let component: SkillCreation;
  let fixture: ComponentFixture<SkillCreation>;

  let mockCharacter: any;

  const mockCharacterCreationService = {
    get character() {
      return mockCharacter;
    },
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
    mockCharacter = {
      special: { intelligence: 5 },
      origin: undefined,
      skills: undefined,
    };
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [SkillCreation],
      providers: [
        { provide: CharacterCreationService, useValue: mockCharacterCreationService },
        { provide: Router, useValue: mockRouter },
        SkillCreationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it("ne devrait pas afficher d'image ni de description si aucune compétence n'est active", () => {
    component.activeSkillKey = null;
    fixture.detectChanges();

    const imageElement = fixture.nativeElement.querySelector('app-image');
    expect(imageElement).toBeNull();
  });

  it("devrait afficher l'image et charger les données correspondant à la compétence active", () => {
    component.activeSkillKey = 'athletics';

    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();

    expect(component.activeInfo?.image).toEqual(SKILL_IMAGES['athletics']);
    const imageElement = fixture.nativeElement.querySelector('app-image');
    expect(imageElement).toBeTruthy();
  });

  it("devrait mettre à jour l'image lors du changement de compétence", () => {
    const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

    component.activeSkillKey = 'athletics';
    cdr.detectChanges();
    expect(component.activeInfo?.image?.name).toBe('Athletics');

    component.activeSkillKey = 'smallGuns';
    cdr.detectChanges();
    expect(component.activeInfo?.image?.name).toBe('SmallGuns');
  });

  describe('Règles des compétences (Skills & FSM)', () => {
    it('Règle 1 : devrait initialiser les points de compétence à 9 + Intelligence du personnage', () => {
      expect(component.remainingPoints()).toBe(14);

      mockCharacter.special = { intelligence: 3 };
      const newFixture = TestBed.createComponent(SkillCreation);
      const newComponent = newFixture.componentInstance;
      newFixture.detectChanges();

      expect(newComponent.remainingPoints()).toBe(12);
    });

    it('Règle 2 : un personnage standard a droit à 3 atouts et chacun donne 2 points de bonus', () => {
      expect(component.taggedSkillsPoints()).toBe(3);

      component.toggleTag('smallGuns', { target: { checked: true } } as any);

      expect(component.skillsCharacter.smallGuns.taggedSkill).toBe(true);
      expect(component.skillsCharacter.smallGuns.rank).toBe(2);
      expect(component.taggedSkillsPoints()).toBe(2);
    });

    it("Règles 3 & 4 : max 3 points à la création et remboursement du surplus si tag d'une compétence à 3 points", () => {
      component.add('athletics');
      component.add('athletics');
      component.add('athletics');
      expect(component.skillsCharacter.athletics.rank).toBe(3);
      expect(component.remainingPoints()).toBe(11);

      expect(component.fsm.canAdd('athletics')).toBe(false);

      component.toggleTag('athletics', { target: { checked: true } } as any);

      expect(component.skillsCharacter.athletics.rank).toBe(3);
      expect(component.remainingPoints()).toBe(13);
    });

    it('Règle 5 : décocher un atout diminue son rang de 2 sans impacter le reste des points à répartir', () => {
      component.toggleTag('smallGuns', { target: { checked: true } } as any);
      expect(component.skillsCharacter.smallGuns.rank).toBe(2);
      const pointsBeforeUntag = component.remainingPoints;

      component.toggleTag('smallGuns', { target: { checked: false } } as any);

      expect(component.skillsCharacter.smallGuns.taggedSkill).toBe(false);
      expect(component.skillsCharacter.smallGuns.rank).toBe(0);
      expect(component.remainingPoints).toBe(pointsBeforeUntag);
      expect(component.taggedSkillsPoints()).toBe(3);
    });

    it('Règle 6 : Origine Initié de la Confrérie -> 1 atout obligatoire à choisir parmi Arme à énergie, Science, Réparation', () => {
      mockCharacter.origin = {
        atoutAChoisirParmi: ['energyWeapons', 'science', 'repair'] as SkillKey[],
      };
      const brotherhoodFixture = TestBed.createComponent(SkillCreation);
      const bhComponent = brotherhoodFixture.componentInstance;
      brotherhoodFixture.detectChanges();

      expect(bhComponent.taggedSkillsPoints()).toBe(4);
      expect(bhComponent.fsm.mustTagAnObligatorySkill()).toBe(true);

      bhComponent.toggleTag('smallGuns', { target: { checked: true } } as any);
      expect(bhComponent.skillsCharacter.smallGuns.taggedSkill).toBe(false);

      bhComponent.toggleTag('science', { target: { checked: true } } as any);
      expect(bhComponent.skillsCharacter.science.taggedSkill).toBe(true);
      expect(bhComponent.fsm.mustTagAnObligatorySkill()).toBe(false);
    });

    it("Règle 7 : Origine Habitant de l'Abri ou Synthé -> 4ème atout à choisir freely", () => {
      mockCharacter.origin = {
        atoutGratuit: true,
      };
      const dwellerFixture = TestBed.createComponent(SkillCreation);
      const dwellerComponent = dwellerFixture.componentInstance;
      dwellerFixture.detectChanges();

      expect(dwellerComponent.taggedSkillsPoints()).toBe(4);
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
      expect(ghoulComponent.taggedSkillsPoints()).toBe(3);
    });
  });
});
