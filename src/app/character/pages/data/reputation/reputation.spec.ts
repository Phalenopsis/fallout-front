import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reputation } from './reputation';

describe('Reputation', () => {
  let component: Reputation;
  let fixture: ComponentFixture<Reputation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reputation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reputation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
