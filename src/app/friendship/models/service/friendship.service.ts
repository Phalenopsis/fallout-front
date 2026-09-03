import { Injectable, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { FriendshipResponseDto } from '../friendship-response.dto';
import { FriendshipApiService } from '../../../service/api/friendship-api.service';

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  // Signaux pour gérer la liste des amis et des requêtes en attente
  readonly friends = signal<FriendshipResponseDto[]>([]);
  readonly pendingRequests = signal<FriendshipResponseDto[]>([]);

  constructor(private friendshipApiService: FriendshipApiService) {}

  loadFriends(): void {
    this.friendshipApiService.getFriends().subscribe({
      next: (friends) => this.friends.set(friends),
    });
  }

  loadPendingRequests(): void {
    this.friendshipApiService.getPendingRequests().subscribe({
      next: (requests) => this.pendingRequests.set(requests),
    });
  }

  sendFriendRequest(username: string) {
    return this.friendshipApiService.sendFriendRequest({ username }).pipe(
      tap((newFriendship) => {
        // En cas de succès, on peut directement ajouter la demande dans pending
        this.pendingRequests.update((current) => [...current, newFriendship]);
      }),
      catchError((err) => {
        // Récupère le message renvoyé par le GlobalExceptionHandler backend
        const errorMessage =
          err?.error?.error || "Une erreur est survenue lors de l'envoi de la demande.";
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  acceptRequest(friendshipId: number): void {
    this.friendshipApiService.acceptRequest(friendshipId).subscribe({
      next: (updated) => {
        this.pendingRequests.update((list) => list.filter((r) => r.friendshipId !== friendshipId));
        this.friends.update((list) => [...list, updated]);
      },
    });
  }

  declineRequest(friendshipId: number): void {
    this.friendshipApiService.declineRequest(friendshipId).subscribe({
      next: () => {
        this.pendingRequests.update((list) => list.filter((r) => r.friendshipId !== friendshipId));
      },
    });
  }
}
