import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Beasts } from './beasts';

describe('Beasts', () => {
  let component: Beasts;
  let fixture: ComponentFixture<Beasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Beasts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Beasts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
