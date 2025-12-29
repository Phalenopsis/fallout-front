import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginCreation } from './origin-creation';

describe('OriginCreation', () => {
  let component: OriginCreation;
  let fixture: ComponentFixture<OriginCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OriginCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
