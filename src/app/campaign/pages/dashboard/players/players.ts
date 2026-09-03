import { Component } from '@angular/core';
import { InvitePlayer } from './invite-player/invite-player';
import { PendingCampaignInvitations } from './pending-campaign-invitations/pending-campaign-invitations';
import { CampaignPlayersList } from './campaign-players-list/campaign-players-list';

@Component({
  selector: 'app-players',
  imports: [InvitePlayer, PendingCampaignInvitations, CampaignPlayersList],
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players {}
