import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterPreview } from '../../../../../core/component/character-preview/character-preview';
import { CharacterApiService } from '../../../../../service/api/character-api.service';
import { CampaignCharacterDto } from '../../../../models/campaign-character.dto';
import { Character } from '../../../../../character/models/character.class';
import { CampaignStoreService } from '../../../../services/campaign-store.service';

@Component({
  selector: 'app-campaign-players-list',
  standalone: true,
  imports: [CommonModule, CharacterPreview],
  templateUrl: './campaign-players-list.html',
  styleUrls: ['../../../../../core/component/pipboy-layout/pipboy-page.css'],
})
export class CampaignPlayersList {
  private characterService = inject(CharacterApiService);
  private campaignStore = inject(CampaignStoreService);

  readonly characters = this.campaignStore.activeCharacters;

  expandedPlayerId = signal<number | null>(null);
  expandedCharacter = signal<Character | null>(null);
  isLoadingCharacter = signal<boolean>(false);

  togglePreview(player: CampaignCharacterDto): void {
    const currentId = this.expandedPlayerId();

    if (currentId === player.campaignCharacterId) {
      this.expandedPlayerId.set(null);
      this.expandedCharacter.set(null);
      return;
    }

    this.expandedPlayerId.set(player.campaignCharacterId);
    this.isLoadingCharacter.set(true);
    this.expandedCharacter.set(null);
    if (player.characterId) {
      this.characterService.getCharacter(player.characterId).subscribe({
        next: (char) => {
          this.expandedCharacter.set(Character.mapFromDto(char));
          this.isLoadingCharacter.set(false);
        },
        error: () => {
          this.isLoadingCharacter.set(false);
        },
      });
    }
  }
}
