import { Injectable } from '@angular/core';
import { CharacterSkills, SKILLS } from './model/skill.desc';

@Injectable({
  providedIn: 'root',
})
export class SkillCreationService {
  createEmptySkills(): CharacterSkills {
    return Object.fromEntries(
      SKILLS.map((skill) => [
        skill.name,
        {
          name: skill.name,
          taggedSkill: false,
          rank: 0,
        },
      ]),
    ) as CharacterSkills;
  }
}
