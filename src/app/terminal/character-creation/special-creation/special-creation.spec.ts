import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { SpecialCreation } from './special-creation';
import { SPECIAL_IMAGES } from '../../../core/component/image/special.images';

describe('SpecialCreation', () => {
  let component: SpecialCreation;
  let fixture: ComponentFixture<SpecialCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
    // 1. On modifie l'état
    component.activeStat = 'agility';

    // 2. On force la détection de changement locale pour résoudre le NG0100
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();

    // 3. Assertions
    expect(component.activeImage).toEqual(SPECIAL_IMAGES['agility']);
    const imageElement = fixture.nativeElement.querySelector('app-image');
    expect(imageElement).toBeTruthy();
  });

  it("devrait mettre à jour l'image lors du changement de stat", () => {
    const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

    // Premier changement : Agility
    component.activeStat = 'agility';
    cdr.detectChanges();
    expect(component.activeImage?.name).toBe('Agility');

    // Deuxième changement : Strength
    component.activeStat = 'strength';
    cdr.detectChanges();
    expect(component.activeImage?.name).toBe('Strength');
  });
});
