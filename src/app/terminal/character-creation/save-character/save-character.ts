import { Component, inject, effect } from '@angular/core';
import { CharacterCreationService } from '../character-creation.service';
import { WizardStepService } from '../wizard-step.service';
import { WizardStep } from '../wizard-step.interface';
import { SpecialKey } from '../../../character/models/special.type';
import { SKILL_DATA, SkillInfo } from '../../../core/constants/skill-data.constant';

@Component({
  selector: 'app-save-character',
  standalone: true,
  imports: [],
  templateUrl: './save-character.html',
  styleUrl: './save-character.css',
})
export class SaveCharacter implements WizardStep {
  private characterCreationService = inject(CharacterCreationService);
  private wizardService = inject(WizardStepService);

  character = this.characterCreationService.character;

  readonly stats: { key: SpecialKey; label: string }[] = [
    { key: 'strength', label: 'FORCE' },
    { key: 'perception', label: 'PERCEPTION' },
    { key: 'endurance', label: 'ENDURANCE' },
    { key: 'charisma', label: 'CHARISME' },
    { key: 'intelligence', label: 'INTELLIGENCE' },
    { key: 'agility', label: 'AGILITÉ' },
    { key: 'luck', label: 'CHANCE' },
  ];

  readonly skills: SkillInfo[] = SKILL_DATA;

  constructor() {
    // Étape de fin : l'action principale (Valider/Sauvegarder) est toujours disponible
    effect(() => {
      this.wizardService.canNext.set(true);
      this.wizardService.canSave.set(true);
    });
  }

  // --- Contrat WizardStep ---

  onSaveStep(): void {
    this.character.setCreationStatusCompleted();
    this.characterCreationService.saveCharacter();
  }
}
