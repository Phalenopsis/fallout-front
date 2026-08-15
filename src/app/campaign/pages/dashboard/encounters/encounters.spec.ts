import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Encounters } from './encounters';

describe('Encounters', () => {
  let component: Encounters;
  let fixture: ComponentFixture<Encounters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Encounters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Encounters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
