import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CharacterCreationService } from '../character-creation.service';
import { WizardStepService } from '../wizard-step.service';
import { WizardStep } from '../wizard-step.interface';

@Component({
  selector: 'app-character-creation',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './character-creation.html',
  styleUrls: ['./character-creation.css'],
})
export class CharacterCreation {
  public wizardStepService = inject(WizardStepService);
  private characterCreationService = inject(CharacterCreationService);
  private router = inject(Router);

  // Référence vers l'instance de l'étape active
  private activeStepComponent?: WizardStep;

  // Appelé automatiquement par Angular lors d'un changement de route
  onRouteActivate(component: any) {
    this.activeStepComponent = component;
  }

  nextStep() {
    // 1. L'enfant sauvegarde son état local dans le service principal
    this.activeStepComponent?.onSaveStep();

    // 2. Navigation centralisée
    const route = `/terminal/creation/${this.characterCreationService.getNextStep()}`;
    this.characterCreationService.goToNextStep();
    this.router.navigate([route]);
  }

  saveAndNextStep() {
    // 1. L'enfant sauvegarde son état local dans le service principal
    this.activeStepComponent?.onSaveStep();

    // 2. Sauvegarde API centralisée
    this.characterCreationService.saveDraft().subscribe({
      next: () => this.nextStep(),
      error: (err) => console.error('Erreur sauvegarde draft:', err),
    });
  }

  previousStep() {
    // 1. L'enfant nettoie si besoin
    this.activeStepComponent?.onPreviousStep?.();

    // 2. Navigation arrière centralisée
    const route = `/terminal/creation/${this.characterCreationService.getPreviousStep()}`;
    this.characterCreationService.goToPreviousStep();
    this.router.navigate([route]);
  }
}
