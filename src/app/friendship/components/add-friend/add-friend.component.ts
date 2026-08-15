import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendshipService } from '../../models/service/friendship.service';

@Component({
  selector: 'app-add-friend',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.css',
})
export class AddFriendComponent {
  username = signal<string>('');
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  constructor(private friendshipService: FriendshipService) {}

  onSubmit(): void {
    const targetUser = this.username().trim();
    if (!targetUser) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.friendshipService.sendFriendRequest(targetUser).subscribe({
      next: () => {
        this.successMessage.set(`Demande d'ami pour ${targetUser} envoyée !`);
        this.username.set(''); // Réinitialise l'input
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
      },
    });
  }
}
