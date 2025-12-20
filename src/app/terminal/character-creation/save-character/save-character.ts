import { Component, inject } from '@angular/core';
import { CharacterCreationService } from '../character-creation.service';
import { JsonPipe } from '@angular/common';
import { CharacterApiService } from '../../../service/api/character-api.service';

@Component({
  selector: 'app-save-character',
  imports: [JsonPipe],
  templateUrl: './save-character.html',
  styleUrl: './save-character.css',
  standalone: true,
})
export class SaveCharacter {
  characterCreationService = inject(CharacterCreationService);
  character = this.characterCreationService.character;
  characterApiService = inject(CharacterApiService);

  saveCharacter() {
    this.characterCreationService.saveCharacter();
  }

  cancel() {
    // Logique pour annuler la sauvegarde
    console.log("Sauvegarde annulée");
    // Rediriger ou afficher un message d'annulation
  }
}
