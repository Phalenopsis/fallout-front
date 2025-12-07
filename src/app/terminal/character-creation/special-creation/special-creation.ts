import { Component } from '@angular/core';
import { Special } from '../../../character/models/special.class';

type SpecialKey = Exclude<keyof Special, 'id'>; // si tu veux exclure id

@Component({
  selector: 'app-special-creation',
  standalone: true,
  imports: [],
  templateUrl: './special-creation.html',
  styleUrl: './special-creation.css',
})
export class SpecialCreation {

  special = new Special();
  remainingPoint = 5;
  activeStat: SpecialKey | null = null;

  // Liste des stats pour générer automatiquement le HTML
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
    { key: 'strength', label: ['La force représente la force du personnage, sa capacité à soulever des charges lourdes...'] },
    { key: 'perception', label: ['La perception représente la capacité du personnage...', 'blabla bla bla'] },
    { key: 'endurance', label: ['ENDURANCE'] },
    { key: 'charisma', label: ['CHARISME'] },
    { key: 'intelligence', label: ['INTELLIGENCE'] },
    { key: 'agility', label: ['AGILITÉ'] },
    { key: 'luck', label: ['CHANCE'] },
  ];

  add(key: SpecialKey) {
    if (this.remainingPoint <= 0) return;
    this.special[key] += 1;
    this.remainingPoint -= 1;
  }

  remove(key: SpecialKey) {
    if (this.special[key] <= 1) return;
    this.special[key] -= 1;
    this.remainingPoint += 1;
  }

  setActive(statKey: SpecialKey) {
    this.activeStat = statKey;
  }

  get activeDescription(): string[] {
    if (!this.activeStat) return [];
    return this.descriptions.find(d => d.key === this.activeStat)?.label ?? [];
  }

  nextStep() {

  }
}
