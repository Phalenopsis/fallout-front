import { Component, inject } from '@angular/core';
import { CharacterCreationService } from '../character-creation.service';
import { Router } from '@angular/router';
import { origineDescription, OrigineDescription, ShelterDweller } from './origine.desc';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OriginDetail } from './origin-detail/origin-detail';
import { ViewOriginDetailModel } from './origin-detail/view-origin-detail.model';
import { TraitDescriptions } from '../trait-creation/trait.desc';
import { createOriginViewModelsDeclarative } from './createOriginViewModelsDeclarative.function';

@Component({
  selector: 'app-origin-creation',
  imports: [FormsModule, OriginDetail],
  templateUrl: './origin-creation.html',
  styleUrl: './origin-creation.css',
  standalone: true,
})
export class OriginCreation {
  characterCreationService = inject(CharacterCreationService);
  router = inject(Router);
  origin: OrigineDescription = ShelterDweller;

  possibleOrigins: OrigineDescription[] = origineDescription;

  get originDetails(): ViewOriginDetailModel[] {
    return this.origin ? createOriginViewModelsDeclarative(this.origin) : [];
  }

  nextStep() {
    this.characterCreationService.character.origin = this.origin;
    const route: string = `/terminal/creation/${this.characterCreationService.getNextStep()}`;
    this.characterCreationService.goToNextStep();
    this.router.navigate([route]);
  }

  saveAndNextStep() {
    this.characterCreationService.character.origin = this.origin;
    this.characterCreationService.saveDraft().subscribe({
      next: () => {
        this.nextStep();
      },
      error: (err) => console.error(err),
    });
  }

  previousStep() {
    const route: string = `/terminal/creation/${this.characterCreationService.getPreviousStep()}`;
    this.characterCreationService.goToPreviousStep();
    this.router.navigate([route]);
  }
}
