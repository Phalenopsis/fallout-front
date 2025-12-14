import { Injectable } from '@angular/core';
import { Character } from '../../character/models/character.class';

@Injectable({
  providedIn: 'root',
})
export class CharacterCreationService {
  steps = ['/name', '/special', '/save'];
  actualStepIndex = 0;
  character = new Character();

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
}
