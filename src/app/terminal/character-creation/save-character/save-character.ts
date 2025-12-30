import { Component, inject } from '@angular/core';
import { CharacterCreationService } from '../character-creation.service';
import { CharacterApiService } from '../../../service/api/character-api.service';
import { SpecialKey } from '../../../character/models/special.type';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-save-character',
  imports: [],
  templateUrl: './save-character.html',
  styleUrl: './save-character.css',
  standalone: true,
})
export class SaveCharacter {
  characterCreationService = inject(CharacterCreationService);
  character = this.characterCreationService.character;
  characterApiService = inject(CharacterApiService);
  router: Router = inject(Router);

  // Liste des stats pour générer automatiquement le HTML
  stats: { key: SpecialKey; label: string }[] = [
    { key: 'strength', label: 'FORCE' },
    { key: 'perception', label: 'PERCEPTION' },
    { key: 'endurance', label: 'ENDURANCE' },
    { key: 'charisma', label: 'CHARISME' },
    { key: 'intelligence', label: 'INTELLIGENCE' },
    { key: 'agility', label: 'AGILITÉ' },
    { key: 'luck', label: 'CHANCE' },
  ];

  saveCharacter() {
    this.character.setCreationStatusCompleted();
    this.characterCreationService.saveCharacter();
  }

  cancel() {
    // Logique pour annuler la sauvegarde
    console.log('Sauvegarde annulée');
    // Rediriger ou afficher un message d'annulation
  }

  previousStep() {
    const route: string = `/terminal/creation/${this.characterCreationService.getPreviousStep()}`;
    this.characterCreationService.goToPreviousStep();
    this.router.navigate([route]);
  }
}
