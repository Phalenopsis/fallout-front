import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Players } from './players';

describe('Players', () => {
  let component: Players;
  let fixture: ComponentFixture<Players>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Players]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Players);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
