import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignPlayersList } from './campaign-players-list';

describe('CampaignPlayersList', () => {
  let component: CampaignPlayersList;
  let fixture: ComponentFixture<CampaignPlayersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignPlayersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignPlayersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
