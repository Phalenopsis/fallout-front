import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quests } from './quests';

describe('Quests', () => {
  let component: Quests;
  let fixture: ComponentFixture<Quests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
