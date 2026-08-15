import { Component, OnInit } from '@angular/core';
import { FriendshipService } from '../../models/service/friendship.service';

@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.css',
})
export class FriendsListComponent implements OnInit {
  constructor(public friendshipService: FriendshipService) {}

  ngOnInit(): void {
    this.friendshipService.loadFriends();
  }
}
