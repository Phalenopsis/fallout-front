import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, signal } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { SpecialCreation } from './special-creation';
import { SPECIAL_IMAGES } from '../../../core/component/image/special.images';
import { CharacterCreationService } from '../character-creation.service';
import { SpecialModService } from './special-mod-service';

describe('SpecialCreation', () => {
  let component: SpecialCreation;
  let fixture: ComponentFixture<SpecialCreation>;

  // Signal et état mockés pour simuler uniquement CharacterCreationService
  const remainingPointsSignal = signal(5);
  const mockCharacter: any = {
    special: undefined,
    origin: undefined,
  };

  const mockCharacterCreationService = {
    character: mockCharacter,
    remainingSpecialPoint: remainingPointsSignal,
    removeRemainingSpecialPoints: vi.fn(() => {
      remainingPointsSignal.update((pts) => pts - 1);
    }),
    addRemainingSpecialPoints: vi.fn(() => {
      remainingPointsSignal.update((pts) => pts + 1);
    }),
    saveDraft: vi.fn(() => of(true)),
    getNextStep: vi.fn(() => 'skills'),
    getPreviousStep: vi.fn(() => 'origin'),
    goToNextStep: vi.fn(),
    goToPreviousStep: vi.fn(),
    resetRemainingSpecialPoints: vi.fn(),
  };

  const mockRouter = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    // Réinitialisation de l'état avant chaque test
    remainingPointsSignal.set(5);
    mockCharacter.special = undefined;
    mockCharacter.origin = undefined;
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [SpecialCreation],
      providers: [
        { provide: CharacterCreationService, useValue: mockCharacterCreationService },
        { provide: Router, useValue: mockRouter },
        SpecialModService, // On utilise le vrai service directement
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- TESTS D'AFFICHAGE D'IMAGE ---

  it('devrait être créé', () => {
    expect(component).toBeTruthy();
  });

  it("ne devrait pas afficher d'image ni de description si aucune stat n'est active", () => {
    component.activeStat = null;
    fixture.detectChanges();

    const imageElement = fixture.nativeElement.querySelector('app-image');
    expect(imageElement).toBeNull();
  });

  it("devrait afficher l'image et charger les données correspondant à la stat active", () => {
    component.activeStat = 'agility';

    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();

    expect(component.activeImage).toEqual(SPECIAL_IMAGES['agility']);
    const imageElement = fixture.nativeElement.querySelector('app-image');
    expect(imageElement).toBeTruthy();
  });

  it("devrait mettre à jour l'image lors du changement de stat", () => {
    const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

    component.activeStat = 'agility';
    cdr.detectChanges();
    expect(component.activeImage?.name).toBe('Agility');

    component.activeStat = 'strength';
    cdr.detectChanges();
    expect(component.activeImage?.name).toBe('Strength');
  });

  // --- TESTS DES RÈGLES MÉTIER ---

  describe('Règles des statistiques SPECIAL', () => {
    it('1) devrait initialiser les stats à 5 par défaut, ou appliquer les bonus Super Mutant (FORCE et ENDURANCE à 7)', () => {
      // Cas par défaut (Humain / Standard)
      expect(component.special.strength).toBe(5);
      expect(component.special.endurance).toBe(5);
      expect(component.special.intelligence).toBe(5);

      // Cas Super Mutant
      mockCharacter.origin = {
        modificateurStats: [{ Force: 2 }, { Endurance: 2 }],
        maximumStats: [{ Force: 12 }, { Endurance: 12 }, { Charisme: 6 }, { Intelligence: 6 }],
      };
      const smFixture = TestBed.createComponent(SpecialCreation);
      const smComponent = smFixture.componentInstance;
      smFixture.detectChanges();

      expect(smComponent.special.strength).toBe(7);
      expect(smComponent.special.endurance).toBe(7);
      expect(smComponent.special.intelligence).toBe(5);
    });

    it('2) le plancher (specialFloor) doit être fixé à 4 et empêcher le retrait en-dessous', () => {
      const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

      expect(component.specialFloor).toBe(4);

      // On descend de 5 à 4
      component.remove('strength');
      cdr.detectChanges();
      expect(component.special.strength).toBe(4);

      // Pour la valeur 4, la condition du bouton dans le template est désactivée
      expect(component.special['strength'] <= component.specialFloor).toBe(true);
    });

    it('3) le max doit être de 10 par défaut, et adapté pour Super Mutant (12 en FORCE/END, 6 en CHA/INT)', () => {
      // Humain par défaut
      expect(component.maxStats.strength).toBe(10);
      expect(component.maxStats.intelligence).toBe(10);

      // Super Mutant
      mockCharacter.origin = {
        modificateurStats: [{ Force: 2 }, { Endurance: 2 }],
        maximumStats: [{ Force: 12 }, { Endurance: 12 }, { Charisme: 6 }, { Intelligence: 6 }],
      };
      const smFixture = TestBed.createComponent(SpecialCreation);
      const smComponent = smFixture.componentInstance;
      smFixture.detectChanges();

      expect(smComponent.maxStats.strength).toBe(12);
      expect(smComponent.maxStats.endurance).toBe(12);
      expect(smComponent.maxStats.charisma).toBe(6);
      expect(smComponent.maxStats.intelligence).toBe(6);
    });

    it('4) devrait décrémenter/incrémenter la réserve de points à répartir', () => {
      const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

      expect(component.characterCreationService.remainingSpecialPoint()).toBe(5);

      // Ajout de 1 point en FORCE : passe de 5 à 6, réserve passe à 4
      component.add('strength');
      cdr.detectChanges();
      expect(component.special.strength).toBe(6);
      expect(mockCharacterCreationService.removeRemainingSpecialPoints).toHaveBeenCalled();
      expect(component.characterCreationService.remainingSpecialPoint()).toBe(4);

      // Retrait de 2 points en FORCE : passe de 6 à 4, réserve passe à 6
      component.remove('strength');
      component.remove('strength');
      cdr.detectChanges();
      expect(component.special.strength).toBe(4);
      expect(component.characterCreationService.remainingSpecialPoint()).toBe(6);
    });
  });
});
