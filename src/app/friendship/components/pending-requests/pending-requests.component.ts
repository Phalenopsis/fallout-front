import { Component, computed, OnInit } from '@angular/core';
import { FriendshipResponseDto } from '../../models/friendship-response.dto';
import { FriendshipService } from '../../models/service/friendship.service';

@Component({
  selector: 'app-pending-requests',
  standalone: true,
  imports: [],
  templateUrl: './pending-requests.component.html',
  styleUrl: './pending-requests.component.css',
})
export class PendingRequestsComponent implements OnInit {
  // Signal calculé : Demandes REÇUES (où je suis le destinataire, isRequester = false)
  readonly receivedRequests = computed(() =>
    this.friendshipService.pendingRequests().filter((req) => !req.isRequester),
  );

  // Signal calculé : Demandes ENVOYÉES (où je suis l'émetteur, isRequester = true)
  readonly sentRequests = computed(() =>
    this.friendshipService.pendingRequests().filter((req) => req.isRequester),
  );

  constructor(public friendshipService: FriendshipService) {}

  ngOnInit(): void {
    this.friendshipService.loadPendingRequests();
  }

  onAccept(request: FriendshipResponseDto): void {
    this.friendshipService.acceptRequest(request.friendshipId);
  }

  onDecline(request: FriendshipResponseDto): void {
    this.friendshipService.declineRequest(request.friendshipId);
  }
}
