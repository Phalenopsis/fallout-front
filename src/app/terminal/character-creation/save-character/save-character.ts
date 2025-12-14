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
    // Logique pour sauvegarder le personnage
    this.characterApiService.saveCharacter(this.character).subscribe({
      next: (savedCharacter) => {
        console.log("Personnage sauvegardé avec succès :", savedCharacter);
      },
      error: (error) => {
        console.error("Erreur lors de la sauvegarde du personnage :", error);
      }
    });
    console.log("Personnage sauvegardé :", this.characterCreationService.character);
    // Rediriger ou afficher un message de succès
  }

  cancel() {
    // Logique pour annuler la sauvegarde
    console.log("Sauvegarde annulée");
    // Rediriger ou afficher un message d'annulation
  }
}
