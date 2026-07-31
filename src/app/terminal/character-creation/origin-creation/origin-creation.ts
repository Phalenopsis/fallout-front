import { Component, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterCreationService } from '../character-creation.service';
import { WizardStepService } from '../wizard-step.service';
import { WizardStep } from '../wizard-step.interface';
import { origineDescription, OrigineDescription, ShelterDweller } from './origine.desc';
import { OriginDetail } from './origin-detail/origin-detail';
import { ViewOriginDetailModel } from './origin-detail/view-origin-detail.model';
import { createOriginViewModelsDeclarative } from './createOriginViewModelsDeclarative.function';

@Component({
  selector: 'app-origin-creation',
  standalone: true,
  imports: [FormsModule, OriginDetail],
  templateUrl: './origin-creation.html',
  styleUrl: './origin-creation.css',
})
export class OriginCreation implements WizardStep {
  private characterCreationService = inject(CharacterCreationService);
  private wizardService = inject(WizardStepService);

  origin: OrigineDescription = this.characterCreationService.character.origin || ShelterDweller;
  possibleOrigins: OrigineDescription[] = origineDescription;

  constructor() {
    // Une origine doit être sélectionnée pour valider l'étape
    effect(() => {
      const isValid = !!this.origin;
      this.wizardService.canNext.set(isValid);
      this.wizardService.canSave.set(isValid);
    });
  }

  get originDetails(): ViewOriginDetailModel[] {
    return this.origin ? createOriginViewModelsDeclarative(this.origin) : [];
  }

  // --- Contrat WizardStep ---

  onSaveStep(): void {
    this.characterCreationService.character.origin = this.origin;
  }
}
