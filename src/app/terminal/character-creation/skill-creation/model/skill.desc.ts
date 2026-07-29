import { SkillKey } from '../../../../core/constants/skill-data.constant';

export type SkillLevel = {
  name: SkillKey;
  taggedSkill: boolean;
  rank: number;
  isOffered: boolean;
};

export type CharacterSkills = Record<SkillKey, SkillLevel>;
