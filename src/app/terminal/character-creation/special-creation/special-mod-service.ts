import { Injectable } from '@angular/core';
import { Special } from '../../../character/models/special.class';

export type SpecialKey = Exclude<keyof Special, 'id'>; // si tu veux exclure id

@Injectable({
  providedIn: 'root',
})
export class SpecialModService {
  // Mapping clé française -> clé anglaise SPECIAL
  statKeyMap: Record<string, SpecialKey> = {
    Force: 'strength',
    Perception: 'perception',
    Endurance: 'endurance',
    Charisme: 'charisma',
    Intelligence: 'intelligence',
    Agilité: 'agility',
    Chance: 'luck',
  };

  // Exemple d'objet d'initialisation des stats
  initialStats: Record<SpecialKey, number> = {
    strength: 5,
    perception: 5,
    endurance: 5,
    charisma: 5,
    intelligence: 5,
    agility: 5,
    luck: 5,
  };

  applyOriginModifiers(
    modificateurStats?: Array<Record<string, number>>,
  ): Record<SpecialKey, number> {
    if (!modificateurStats) return this.initialStats;

    // Copie pour ne pas muter l'objet original
    const updatedStats = { ...this.initialStats };

    modificateurStats.forEach((modifier) => {
      // Chaque modifier est un objet avec une seule propriété
      for (const [statFr, value] of Object.entries(modifier)) {
        const statEn = this.statKeyMap[statFr];
        if (statEn && typeof value === 'number') {
          updatedStats[statEn] = (updatedStats[statEn] ?? 5) + value;
          // Optionnel : clamp la valeur max à 10 par défaut, ou gérer maximumStats ailleurs
          if (updatedStats[statEn] > 10) updatedStats[statEn] = 10;
        }
      }
    });

    return updatedStats;
  }

  getMaxStats(maximumStats?: Array<Record<string, number>>): Record<SpecialKey, number> {
    // Valeurs max par défaut (ex : 10 partout)
    const defaultMax = 10;
    const maxStats: Record<SpecialKey, number> = {
      strength: defaultMax,
      perception: defaultMax,
      endurance: defaultMax,
      charisma: defaultMax,
      intelligence: defaultMax,
      agility: defaultMax,
      luck: defaultMax,
    };

    if (!maximumStats) return maxStats;

    maximumStats.forEach((maxEntry) => {
      for (const [statFr, maxValue] of Object.entries(maxEntry)) {
        const statEn = this.statKeyMap[statFr];
        if (statEn && typeof maxValue === 'number') {
          maxStats[statEn] = maxValue;
        }
      }
    });

    return maxStats;
  }
}
