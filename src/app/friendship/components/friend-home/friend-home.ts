import { Component } from '@angular/core';
import { AddFriendComponent } from '../add-friend/add-friend.component';
import { PendingRequestsComponent } from '../pending-requests/pending-requests.component';
import { FriendsListComponent } from '../friends-list/friends-list.component';
import { PendingCampaignInvitations } from '../pending-campaign-invitation/pending-campaign-invitation';

@Component({
  selector: 'app-friend-home',
  imports: [
    AddFriendComponent,
    PendingRequestsComponent,
    FriendsListComponent,
    PendingCampaignInvitations,
  ],
  templateUrl: './friend-home.html',
  styleUrl: './friend-home.css',
})
export class FriendHome {}
