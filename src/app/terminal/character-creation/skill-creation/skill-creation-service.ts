import { Injectable } from '@angular/core';
import { CharacterSkills, SkillKey, SKILLS } from './model/skill.desc';

@Injectable({
  providedIn: 'root',
})
export class SkillCreationService {
  createEmptySkills(offeredTaggedSkill: SkillKey | null): CharacterSkills {
    return Object.fromEntries(
      SKILLS.map((skill) => [
        skill.name,
        {
          name: skill.name,
          taggedSkill: offeredTaggedSkill === skill.name ? true : false,
          rank: offeredTaggedSkill === skill.name ? 2 : 0,
          isOffered: offeredTaggedSkill === skill.name ? true : false,
        },
      ]),
    ) as CharacterSkills;
  }
}
