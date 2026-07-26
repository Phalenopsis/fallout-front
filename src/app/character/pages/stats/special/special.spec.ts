import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Special } from './special';

describe('Special', () => {
  let component: Special;
  let fixture: ComponentFixture<Special>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Special]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Special);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
