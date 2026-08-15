import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCampaignInvitations } from './pending-campaign-invitations';

describe('PendingCampaignInvitations', () => {
  let component: PendingCampaignInvitations;
  let fixture: ComponentFixture<PendingCampaignInvitations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingCampaignInvitations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingCampaignInvitations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
