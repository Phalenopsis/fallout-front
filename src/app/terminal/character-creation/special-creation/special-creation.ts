import { Component, inject } from '@angular/core';
import { Special } from '../../../character/models/special.class';
import { CharacterCreationService } from '../character-creation.service';
import { Router } from '@angular/router';
import { SpecialModService } from '../special-creation/special-mod-service';
import { SpecialKey } from '../../../character/models/special.type';
import { SPECIAL_IMAGES } from '../../../core/component/image/special.images';
import { SrcImage } from '../../../core/models/src-image.model';
import { Image } from '../../../core/component/image/image.component';

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
  activeStat: SpecialKey | null = null;

  // Liste des stats pour générer automatiquement le HTML
  imagePath: string = 'images/special';
  stats: { key: SpecialKey; label: string }[] = [
    { key: 'strength', label: 'FORCE' },
    { key: 'perception', label: 'PERCEPTION' },
    { key: 'endurance', label: 'ENDURANCE' },
    { key: 'charisma', label: 'CHARISME' },
    { key: 'intelligence', label: 'INTELLIGENCE' },
    { key: 'agility', label: 'AGILITÉ' },
    { key: 'luck', label: 'CHANCE' },
  ];

  descriptions: { key: SpecialKey; label: string[] }[] = [
    {
      key: 'strength',
      label: [
        `Mesure la force brute, c'est-à-dire la capacité à frapper plus fort au corps à corps et à manipuler des éléments lourds.`,
      ],
    },
    {
      key: 'perception',
      label: [
        `Indique la capacité du personnage à percevoir son environnement et à comprendre les intentions de ses interlocuteurs.`,
      ],
    },
    {
      key: 'endurance',
      label: [
        `Mesure la résistances physiques du personnage face à son environnement et lors des affrontements martiales.`,
      ],
    },
    {
      key: 'charisma',
      label: [
        `Indique la capacité du personnage à manipuler ou convaincre son auditoire par l'éloquence et la façon d'être.`,
      ],
    },
    {
      key: 'intelligence',
      label: [`Désigne la capacité du personnage à comprendre et à apprendre.`],
    },
    {
      key: 'agility',
      label: [`Indique la manière dont le personnage sait coordonner ses mouvements.`],
    },
    { key: 'luck', label: [`Mesure simple du karma d'un personnage.`] },
  ];

  get activeImage(): SrcImage | null {
    return this.activeStat ? SPECIAL_IMAGES[this.activeStat] : null;
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
    this.activeStat = statKey;
  }

  get activeDescription(): string[] {
    if (!this.activeStat) return [];
    return this.descriptions.find((d) => d.key === this.activeStat)?.label ?? [];
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
