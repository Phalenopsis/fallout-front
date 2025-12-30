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

export type SkillName =
  | 'survival'
  | 'barter'
  | 'speech'
  | 'science'
  | 'repair'
  | 'athletics'
  | 'sneak'
  | 'medicine'
  | 'lockpick'
  | 'smallGuns'
  | 'bigGuns'
  | 'energyWeapons'
  | 'explosives'
  | 'meleeWeapons'
  | 'unarmed'
  | 'throwing'
  | 'pilot';

export type SkillDefinition = {
  name: SkillName;
  nom: string;
  SPECIAL: SpecialStat;
  secondarySPECIAL: SpecialStat[];
  shortDescription: string[];
  description: string[];
};

export type SkillLevel = {
  name: SkillName;
  taggedSkill: boolean;
  rank: number;
};

export type CharacterSkills = Record<SkillName, SkillLevel>;
