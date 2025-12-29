import { Injectable } from '@angular/core';
import { SpecialKey, SpecialStats } from '../../../character/models/special.type';

@Injectable({ providedIn: 'root' })
export class SpecialModService {
  statKeyMap: Record<string, SpecialKey> = {
    Force: 'strength',
    Perception: 'perception',
    Endurance: 'endurance',
    Charisme: 'charisma',
    Intelligence: 'intelligence',
    Agilité: 'agility',
    Chance: 'luck',
  };

  initialStats: SpecialStats = {
    strength: 5,
    perception: 5,
    endurance: 5,
    charisma: 5,
    intelligence: 5,
    agility: 5,
    luck: 5,
  };

  applyOriginModifiers(modificateurStats?: Array<Record<string, number>>): SpecialStats {
    if (!modificateurStats) return { ...this.initialStats };

    const updatedStats: SpecialStats = { ...this.initialStats };

    modificateurStats.forEach((modifier) => {
      for (const [statFr, value] of Object.entries(modifier)) {
        const statEn = this.statKeyMap[statFr];
        if (statEn && typeof value === 'number') {
          updatedStats[statEn] += value;
        }
      }
    });

    return updatedStats;
  }

  getMaxStats(maximumStats?: Array<Record<string, number>>): SpecialStats {
    const maxStats: SpecialStats = {
      strength: 10,
      perception: 10,
      endurance: 10,
      charisma: 10,
      intelligence: 10,
      agility: 10,
      luck: 10,
    };

    if (!maximumStats) return maxStats;

    maximumStats.forEach((entry) => {
      for (const [statFr, maxValue] of Object.entries(entry)) {
        const statEn = this.statKeyMap[statFr];
        if (statEn && typeof maxValue === 'number') {
          maxStats[statEn] = maxValue;
        }
      }
    });

    return maxStats;
  }
}
