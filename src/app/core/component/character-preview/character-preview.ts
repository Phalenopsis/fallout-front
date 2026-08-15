import { Component, computed, input } from '@angular/core';
import { Character } from '../../../character/models/character.class';
import { SkillLevel } from '../../../terminal/character-creation/skill-creation/model/skill.desc';
import { SKILL_DATA_MAP, SkillKey } from '../../constants/skill-data.constant';

export interface DisplaySkill extends SkillLevel {
  label: string;
}

@Component({
  selector: 'app-character-preview',
  standalone: true,
  templateUrl: './character-preview.html',
  styleUrl: './character-preview.css',
})
export class CharacterPreview {
  // Input Signal Angular 21
  character = input.required<Character>();

  // Extraction et tri des compétences utiles (> 0)
  displaySkills = computed<DisplaySkill[]>(() => {
    const char = this.character();
    if (!char?.skills) return [];

    const result: DisplaySkill[] = [];

    // Parcours de toutes les compétences du personnage
    (Object.keys(char.skills) as SkillKey[]).forEach((key) => {
      const skillLevel = char.skills![key];
      // On conserve uniquement si c'est un atout (tagged) OU si le rang est supérieur à 0
      if (skillLevel && (skillLevel.taggedSkill || skillLevel.rank > 0)) {
        const info = SKILL_DATA_MAP[key];
        result.push({
          ...skillLevel,
          label: info ? info.label : key,
        });
      }
    });

    // Tri : Tagged skills en premier, puis par rang décroissant, puis par ordre alphabétique
    return result.sort((a, b) => {
      if (a.taggedSkill !== b.taggedSkill) {
        return a.taggedSkill ? -1 : 1;
      }
      if (b.rank !== a.rank) {
        return b.rank - a.rank;
      }
      return a.label.localeCompare(b.label);
    });
  });
}
