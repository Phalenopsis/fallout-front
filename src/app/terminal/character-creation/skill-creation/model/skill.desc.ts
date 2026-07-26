import { SpecialStat } from '../../origin-creation/origine.desc';
import {
  athletics,
  barter,
  bigGuns,
  energyWeapons,
  explosives,
  lockpick,
  medicine,
  meleeWeapons,
  pilot,
  repair,
  science,
  smallGuns,
  sneak,
  speech,
  survival,
  throwing,
  unarmed,
} from './skills.desc';

export const SKILL_KEYS = [
  'athletics',
  'barter',
  'bigGuns',
  'energyWeapons',
  'explosives',
  'lockpick',
  'medicine',
  'meleeWeapons',
  'pilot',
  'repair',
  'science',
  'smallGuns',
  'sneak',
  'speech',
  'survival',
  'throwing',
  'unarmed',
] as const;

export type SkillKey = (typeof SKILL_KEYS)[number];

export type SkillDefinition = {
  name: SkillKey; // On utilise SkillKey directement ici !
  nom: string;
  SPECIAL: SpecialStat;
  secondarySPECIAL: SpecialStat[];
  shortDescription: string[];
  description: string[];
};

// Dictionnaire des définitions
export const SKILL_DEFINITIONS: Record<SkillKey, SkillDefinition> = {
  athletics,
  barter,
  bigGuns,
  energyWeapons,
  explosives,
  lockpick,
  medicine,
  meleeWeapons,
  pilot,
  repair,
  science,
  smallGuns,
  sneak,
  speech,
  survival,
  throwing,
  unarmed,
};
export type SkillLevel = {
  name: SkillKey;
  taggedSkill: boolean;
  rank: number;
  isOffered: boolean;
};

export type CharacterSkills = Record<SkillKey, SkillLevel>;

export const SKILLS = [
  energyWeapons,
  meleeWeapons,
  smallGuns,
  bigGuns,
  athletics,
  lockpick,
  speech,
  sneak,
  explosives,
  unarmed,
  medicine,
  pilot,
  throwing,
  repair,
  science,
  survival,
  barter,
];
