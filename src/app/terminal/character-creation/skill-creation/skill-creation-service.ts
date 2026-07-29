import { Injectable } from '@angular/core';
import { SKILL_DATA, SkillKey } from '../../../core/constants/skill-data.constant';
import { CharacterSkills } from './model/skill.desc';

@Injectable({
  providedIn: 'root',
})
export class SkillCreationService {
  createEmptySkills(offeredTaggedSkill: SkillKey | null): CharacterSkills {
    return Object.fromEntries(
      SKILL_DATA.map((skill) => [
        skill.key,
        {
          name: skill.key,
          taggedSkill: offeredTaggedSkill === skill.key,
          rank: offeredTaggedSkill === skill.key ? 2 : 0,
          isOffered: offeredTaggedSkill === skill.key,
        },
      ]),
    ) as CharacterSkills;
  }
}
