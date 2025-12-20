import { inject, Injectable } from '@angular/core';
import { Character } from '../../character/models/character.class';
import { CharacterApiService } from '../../service/api/character-api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../service/auth-service';

@Injectable({
  providedIn: 'root',
})
export class CharacterCreationService {
  steps = ['/name', '/special', '/save'];
  actualStepIndex = 0;
  character = new Character();
  private characterApiService = inject(CharacterApiService);
  private router = inject(Router);
  private authService = inject(AuthService);

  getNextStep(): string {
    if (this.actualStepIndex + 1 < this.steps.length) {
      return this.steps[this.actualStepIndex + 1]
    };
    throw new Error("No next step available");
  }

  getPreviousStep(): string {
    if (this.actualStepIndex - 1 >= 0) {
      return this.steps[this.actualStepIndex - 1]
    };
    throw new Error("No previous step available");
  }

  goToNextStep() {
    if (this.actualStepIndex + 1 < this.steps.length) {
      this.actualStepIndex += 1;
      return;
    }
    throw new Error("No next step available");
  }

  goToPreviousStep() {
    if (this.actualStepIndex - 1 >= 0) {
      this.actualStepIndex -= 1;
      return;
    }
    throw new Error("No previous step available");
  }

  getCurrentStep(): string {
    return this.steps[this.actualStepIndex];
  }

  saveCharacter(): void {
    // Logique pour sauvegarder le personnage
    this.characterApiService.saveCharacter(this.character).pipe(

    )
      .subscribe({
        next: (savedCharacter) => {
          console.log("Personnage sauvegardé avec succès :", savedCharacter);
          this.authService.refreshCurrentUser();
          this.character = new Character();
          this.router.navigate([`/character/${savedCharacter.id}`]);
        },
        error: (error) => {
          console.error("Erreur lors de la sauvegarde du personnage :", error);
        }
      });
    console.log("Personnage sauvegardé :", this.character);
    // Rediriger ou afficher un message de succès
  }
}
