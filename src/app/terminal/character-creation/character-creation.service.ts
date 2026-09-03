import { inject, Injectable, signal } from '@angular/core';
import { Character } from '../../character/models/character.class';
import { CharacterApiService } from '../../service/api/character-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { map, Observable } from 'rxjs';
import { CharacterFromBackDTO } from '../../character/models/character-from-back.dto';

interface Step {
  path: string;
  isComplete: (character: CharacterFromBackDTO) => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterCreationService {
  private INITIAL_SPECIAL_POINTS_TO_DISTRIBUTE = 5;
  // Liste des étapes avec leur condition de complétion
  steps: Step[] = [
    {
      path: '/name',
      isComplete: (c) => !!c.name,
    },
    {
      path: '/origin',
      isComplete: (c) => !!c.originName,
    },
    {
      path: '/special',
      isComplete: (c) => !!c.special && c.special.agility > 0, // exemple
    },
    {
      path: '/skill',
      isComplete: (c) => !!c.skills, // exemple
    },
    {
      path: '/save',
      isComplete: (_) => true, // toujours atteignable
    },
  ];

  actualStepIndex = 0;
  character = new Character();
  private characterApiService = inject(CharacterApiService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private _remainingSpecialPoint = signal(this.INITIAL_SPECIAL_POINTS_TO_DISTRIBUTE);
  public readonly remainingSpecialPoint = this._remainingSpecialPoint.asReadonly();

  reset(): void {
    this.character = new Character();
    this.actualStepIndex = 0;
    this._remainingSpecialPoint.set(this.INITIAL_SPECIAL_POINTS_TO_DISTRIBUTE);
  }

  getNextStep(): string {
    if (this.actualStepIndex + 1 < this.steps.length) {
      return this.steps[this.actualStepIndex + 1].path;
    }
    throw new Error('No next step available');
  }

  getPreviousStep(): string {
    if (this.actualStepIndex - 1 >= 0) {
      return this.steps[this.actualStepIndex - 1].path;
    }
    throw new Error('No previous step available');
  }

  goToNextStep() {
    if (this.actualStepIndex + 1 < this.steps.length) {
      this.actualStepIndex += 1;
      return;
    }
    throw new Error('No next step available');
  }

  goToPreviousStep() {
    if (this.actualStepIndex - 1 >= 0) {
      this.actualStepIndex -= 1;
      return;
    }
    throw new Error('No previous step available');
  }

  getCurrentStep(): string {
    return this.steps[this.actualStepIndex].path;
  }

  // Charger un personnage depuis l'API et définir l'étape actuelle automatiquement
  loadCharacter(characterId: number): Observable<Character> {
    return this.characterApiService.getCharacter(characterId).pipe(
      map((dto) => {
        this.character = Character.mapFromDto(dto);
        this._remainingSpecialPoint.set(this.computeRemainingSpecialPoints());
        this.actualStepIndex = this.computeStepIndex(dto);
        return this.character;
      }),
    );
  }

  private computeRemainingSpecialPoints() {
    if (this.character.origin?.nom === 'Super Mutant') {
      return this.character.special ? 35 + 5 + 4 - this.character.special?.getTotalPoints() : 5;
    }
    return this.character.special ? 35 + 5 - this.character.special?.getTotalPoints() : 5;
  }

  saveDraft(): Observable<Character> {
    const save$ = this.character.id
      ? this.characterApiService.updateCharacter(this.character)
      : this.characterApiService.saveCharacter(this.character);

    return save$.pipe(
      map((dto) => {
        this.character = Character.mapFromDto(dto);

        // 🔥 synchro locale du user
        this.authService.upsertCharacter(dto);

        return this.character;
      }),
    );
  }

  private computeStepIndex(dto: CharacterFromBackDTO): number {
    const index = this.steps.findIndex((step) => !step.isComplete(dto));
    return index === -1 ? this.steps.length - 1 : index; // dernière étape si tout est complet
  }

  saveCharacter(): void {
    this.saveDraft().subscribe({
      next: (savedCharacter) => {
        this.authService.refreshCurrentUser();
        this.reset();
        this.router.navigate([`/character/${savedCharacter.id}`]);
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde du personnage :', error);
      },
    });
  }

  resetRemainingSpecialPoints() {
    this._remainingSpecialPoint.set(this.INITIAL_SPECIAL_POINTS_TO_DISTRIBUTE);
  }

  addRemainingSpecialPoints() {
    this._remainingSpecialPoint.update((v) => v + 1);
  }

  removeRemainingSpecialPoints() {
    this._remainingSpecialPoint.update((v) => v - 1);
  }
}
