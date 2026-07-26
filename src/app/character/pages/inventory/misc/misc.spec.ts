import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Misc } from './misc';

describe('Misc', () => {
  let component: Misc;
  let fixture: ComponentFixture<Misc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Misc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Misc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
