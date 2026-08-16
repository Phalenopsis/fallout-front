import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CampaignStoreService } from '../../../../services/campaign-store.service';
import { CharacterApiService } from '../../../../../service/api/character-api.service';
import { Character } from '../../../../../character/models/character.class';
import { FriendshipService } from '../../../../../friendship/models/service/friendship.service';
import { CharacterPreview } from '../../../../../core/component/character-preview/character-preview';

@Component({
  selector: 'app-invite-player',
  standalone: true,
  imports: [FormsModule, CharacterPreview],
  templateUrl: './invite-player.html',
  styleUrls: ['./invite-player.css', '../../../../../core/component/pipboy-layout/pipboy-page.css'],
})
export class InvitePlayer implements OnInit {
  public friendshipService = inject(FriendshipService);
  public campaignStore = inject(CampaignStoreService);
  private characterApiService = inject(CharacterApiService);

  selectedFriendUserId = signal<number | null>(null);
  selectedCharacterId = signal<number | null>(null);

  // Liste des personnages de l'ami sélectionné
  friendCharacters = signal<Character[]>([]);
  // Personnage actuellement sélectionné pour prévisualisation par le MJ
  previewCharacter = signal<Character | null>(null);

  isLoadingCharacters = signal<boolean>(false);

  ngOnInit(): void {
    this.friendshipService.loadFriends();
  }

  onFriendChange(friendUserIdStr: string): void {
    const friendUserId = Number(friendUserIdStr);

    if (!friendUserId) {
      this.selectedFriendUserId.set(null);
      this.resetCharacterSelection();
      return;
    }

    this.selectedFriendUserId.set(friendUserId);
    this.resetCharacterSelection();
    this.isLoadingCharacters.set(true);

    this.characterApiService.getAvailableCharactersByFriend(friendUserId).subscribe({
      next: (dtos) => {
        const characters = dtos.map((dto) => Character.mapFromDto(dto));
        this.friendCharacters.set(characters);
        this.isLoadingCharacters.set(false);
      },
      error: () => {
        this.friendCharacters.set([]);
        this.isLoadingCharacters.set(false);
      },
    });
  }

  onCharacterSelect(characterIdStr: string): void {
    const charId = Number(characterIdStr);

    if (!charId) {
      this.selectedCharacterId.set(null);
      this.previewCharacter.set(null);
      return;
    }

    this.selectedCharacterId.set(charId);
    const found = this.friendCharacters().find((c) => c.id === charId) || null;
    this.previewCharacter.set(found);
  }

  onSubmit(): void {
    const charId = this.selectedCharacterId();
    if (!charId) return;

    this.campaignStore.inviteCharacter(charId);

    // Reset complet du formulaire après envoi
    this.selectedFriendUserId.set(null);
    this.resetCharacterSelection();
  }

  private resetCharacterSelection(): void {
    this.selectedCharacterId.set(null);
    this.previewCharacter.set(null);
    this.friendCharacters.set([]);
  }
}
