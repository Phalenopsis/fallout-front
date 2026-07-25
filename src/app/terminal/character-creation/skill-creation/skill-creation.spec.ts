import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { SkillCreation } from './skill-creation';
import { SKILL_IMAGES } from '../../../core/component/image/skill.images';

describe('SkillCreation', () => {
  let component: SkillCreation;
  let fixture: ComponentFixture<SkillCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
    // 1. On active une compétence (ex: athletics)
    component.activeSkill = 'athletics';

    // 2. On force la détection de changements pour mettre à jour les bindings Angular
    fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();

    // 3. Assertions
    expect(component.activeImage).toEqual(SKILL_IMAGES['athletics']);
    const imageElement = fixture.nativeElement.querySelector('app-image');
    expect(imageElement).toBeTruthy();
  });

  it("devrait mettre à jour l'image lors du changement de compétence", () => {
    const cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

    // Première sélection : Athletics
    component.activeSkill = 'athletics';
    cdr.detectChanges();
    expect(component.activeImage?.name).toBe('Athletics');

    // Deuxième sélection : Small Arms
    component.activeSkill = 'smallGuns';
    cdr.detectChanges();
    expect(component.activeImage?.name).toBe('SmallGuns');
  });
});
