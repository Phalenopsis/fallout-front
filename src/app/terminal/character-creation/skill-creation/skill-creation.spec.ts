import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCreation } from './skill-creation';

describe('SkillCreation', () => {
  let component: SkillCreation;
  let fixture: ComponentFixture<SkillCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
