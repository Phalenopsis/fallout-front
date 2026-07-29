import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perks } from './perks';

describe('Perks', () => {
  let component: Perks;
  let fixture: ComponentFixture<Perks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Perks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
