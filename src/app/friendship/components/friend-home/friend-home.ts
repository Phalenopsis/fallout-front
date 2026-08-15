import { Component } from '@angular/core';
import { AddFriendComponent } from '../add-friend/add-friend.component';
import { PendingRequestsComponent } from '../pending-requests/pending-requests.component';
import { FriendsListComponent } from '../friends-list/friends-list.component';

@Component({
  selector: 'app-friend-home',
  imports: [AddFriendComponent, PendingRequestsComponent, FriendsListComponent],
  templateUrl: './friend-home.html',
  styleUrl: './friend-home.css',
})
export class FriendHome {}
