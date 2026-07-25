import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftCreation } from './draft-creation';
import { provideRouter } from '@angular/router';

describe('DraftCreation', () => {
  let component: DraftCreation;
  let fixture: ComponentFixture<DraftCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftCreation],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
