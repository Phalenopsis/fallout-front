import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Npcs } from './npcs';

describe('Npcs', () => {
  let component: Npcs;
  let fixture: ComponentFixture<Npcs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Npcs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Npcs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
