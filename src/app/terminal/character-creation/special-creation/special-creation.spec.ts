import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCreation } from './special-creation';

describe('SpecialCreation', () => {
  let component: SpecialCreation;
  let fixture: ComponentFixture<SpecialCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
