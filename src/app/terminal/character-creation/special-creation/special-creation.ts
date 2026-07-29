import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Special } from '../../../character/models/special.class';
import { SpecialKey } from '../../../character/models/special.type';
import { SPECIAL_DATA, SpecialInfo } from '../../../core/constants/special-data.constant';
import { Image } from '../../../core/component/image/image.component';
import { CharacterCreationService } from '../character-creation.service';
import { SpecialModService } from '../special-creation/special-mod-service';

@Component({
  selector: 'app-special-creation',
  standalone: true,
  imports: [Image],
  templateUrl: './special-creation.html',
  styleUrl: './special-creation.css',
})
export class SpecialCreation {
  characterCreationService = inject(CharacterCreationService);
  router = inject(Router);
  specialModService = inject(SpecialModService);

  readonly specialData = SPECIAL_DATA;

  baseStats: Record<SpecialKey, number> = this.characterCreationService.character.special
    ? this.characterCreationService.character.special
    : this.specialModService.applyOriginModifiers(
        this.characterCreationService.character.origin?.modificateurStats,
      );

  maxStats: Record<SpecialKey, number> = this.specialModService.getMaxStats(
    this.characterCreationService.character.origin?.maximumStats,
  );

  specialFloor: number = 4;
  special = new Special({ ...this.baseStats });
  activeStatKey: SpecialKey | null = null;

  get activeInfo(): SpecialInfo | undefined {
    return this.specialData.find((s) => s.key === this.activeStatKey);
  }

  add(key: SpecialKey) {
    if (this.characterCreationService.remainingSpecialPoint() <= 0) return;
    if (this.special[key] >= this.maxStats[key]) return;
    this.special[key] += 1;
    this.characterCreationService.removeRemainingSpecialPoints();
  }

  remove(key: SpecialKey) {
    if (this.special[key] <= 1) return;
    this.special[key] -= 1;
    this.characterCreationService.addRemainingSpecialPoints();
  }

  setActive(statKey: SpecialKey) {
    this.activeStatKey = statKey;
  }

  nextStep() {
    this.characterCreationService.character.special = this.special;
    const route: string = `/terminal/creation/${this.characterCreationService.getNextStep()}`;
    this.characterCreationService.goToNextStep();
    this.router.navigate([route]);
  }

  saveAndNextStep() {
    this.characterCreationService.character.special = this.special;
    this.characterCreationService.saveDraft().subscribe({
      next: () => {
        this.nextStep();
      },
      error: (err) => console.error(err),
    });
  }

  previousStep() {
    this.characterCreationService.character.special = undefined;
    this.characterCreationService.resetRemainingSpecialPoints();
    const route: string = `/terminal/creation/${this.characterCreationService.getPreviousStep()}`;
    this.characterCreationService.goToPreviousStep();
    this.router.navigate([route]);
  }
}
