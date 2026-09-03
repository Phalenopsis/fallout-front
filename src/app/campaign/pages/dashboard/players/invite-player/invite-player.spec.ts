import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePlayer } from './invite-player';

describe('InvitePlayer', () => {
  let component: InvitePlayer;
  let fixture: ComponentFixture<InvitePlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitePlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitePlayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
