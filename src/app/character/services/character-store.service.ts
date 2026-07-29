import { inject, Injectable, signal } from '@angular/core';
import { Character } from '../models/character.class';
import { tap } from 'rxjs';
import { CharacterApiService } from '../../service/api/character-api.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterStoreService {
  private characterApiService = inject(CharacterApiService);

  // Signal contenant le personnage actif
  readonly character = signal<Character | null>(null);
  readonly isLoading = signal<boolean>(false);

  loadCharacter(id: number) {
    // Si déjà chargé pour cet ID, on ne re-fetch pas
    if (this.character()?.id === id) return;

    this.isLoading.set(true);
    this.characterApiService
      .getCharacter(id)
      .pipe(
        tap((dto) => {
          const char = Character.mapFromDto(dto);
          this.character.set(char);
          this.isLoading.set(false);
        }),
      )
      .subscribe();
  }
}
