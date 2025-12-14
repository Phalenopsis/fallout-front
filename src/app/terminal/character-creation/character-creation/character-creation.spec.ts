import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreation } from './character-creation';

describe('CharacterCreation', () => {
  let component: CharacterCreation;
  let fixture: ComponentFixture<CharacterCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
