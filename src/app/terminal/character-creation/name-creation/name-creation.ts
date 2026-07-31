import { Component, inject, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterCreationService } from '../character-creation.service';
import { WizardStepService } from '../wizard-step.service';
import { WizardStep } from '../wizard-step.interface';

@Component({
  selector: 'app-name-creation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './name-creation.html',
  styleUrl: './name-creation.css',
})
export class NameCreation implements WizardStep {
  private characterCreationService = inject(CharacterCreationService);
  private wizardService = inject(WizardStepService);

  // Signal local pour réagir instantanément aux modifications du nom
  characterName = signal<string>(this.characterCreationService.character.name || '');

  constructor() {
    // Vérifie en continu que le nom n'est pas vide pour déverrouiller les boutons
    effect(() => {
      const isValid = this.characterName().trim().length > 0;
      this.wizardService.canNext.set(isValid);
      this.wizardService.canSave.set(isValid);
    });
  }

  onNameChange(newValue: string) {
    this.characterName.set(newValue);
  }

  // --- Contrat WizardStep ---

  onSaveStep(): void {
    this.characterCreationService.character.name = this.characterName().trim();
  }
}
