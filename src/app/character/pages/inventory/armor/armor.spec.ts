import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Armor } from './armor';

describe('Armor', () => {
  let component: Armor;
  let fixture: ComponentFixture<Armor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Armor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Armor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
