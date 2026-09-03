import { inject, Injectable, signal } from '@angular/core';
import { Character } from '../models/character.class';
import { forkJoin, tap } from 'rxjs';
import { CharacterApiService } from '../../service/api/character-api.service';
import { CampaignResponseDto } from '../../campaign/models/campaign-response.dto';

@Injectable({
  providedIn: 'root',
})
export class CharacterStoreService {
  private characterApiService = inject(CharacterApiService);

  // Signal contenant le personnage actif
  readonly character = signal<Character | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly characterCampaign = signal<CampaignResponseDto | null>(null);

  loadCharacter(id: number) {
    if (this.character()?.id === id) return;

    this.isLoading.set(true);

    forkJoin({
      dto: this.characterApiService.getCharacter(id),
      campaign: this.characterApiService.getCampaignForCharacter(id),
    })
      .pipe(
        tap(({ dto, campaign }) => {
          this.character.set(Character.mapFromDto(dto));
          this.characterCampaign.set(campaign);
          this.isLoading.set(false);
        }),
      )
      .subscribe();
  }

  clear() {
    this.character.set(null);
  }
}
