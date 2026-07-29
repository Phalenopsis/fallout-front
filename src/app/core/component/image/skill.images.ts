import { SkillKey } from '../../constants/skill-data.constant';
import { SrcImage } from '../../models/src-image.model';

export const athletics: SrcImage = {
  name: 'Athletics',
  fileName: 'resized_athletics.png',
  src: 'skills/resized_athletics.png',
  width: 486,
  height: 350,
};
export const barter: SrcImage = {
  name: 'Barter',
  fileName: 'resized_barter.png',
  src: 'skills/resized_barter.png',
  width: 375,
  height: 350,
};
export const bigGuns: SrcImage = {
  name: 'BigGuns',
  fileName: 'resized_bigGuns.png',
  src: 'skills/resized_bigGuns.png',
  width: 541,
  height: 350,
};
export const energyWeapons: SrcImage = {
  name: 'EnergyWeapons',
  fileName: 'resized_energyWeapons.png',
  src: 'skills/resized_energyWeapons.png',
  width: 438,
  height: 350,
};
export const explosives: SrcImage = {
  name: 'Explosives',
  fileName: 'resized_explosives.png',
  src: 'skills/resized_explosives.png',
  width: 301,
  height: 350,
};
export const lockpick: SrcImage = {
  name: 'Lockpick',
  fileName: 'resized_lockpick.png',
  src: 'skills/resized_lockpick.png',
  width: 296,
  height: 350,
};
export const medicine: SrcImage = {
  name: 'Medicine',
  fileName: 'resized_medicine.png',
  src: 'skills/resized_medicine.png',
  width: 339,
  height: 350,
};
export const meleeWeapons: SrcImage = {
  name: 'MeleeWeapons',
  fileName: 'resized_meleeWeapons.png',
  src: 'skills/resized_meleeWeapons.png',
  width: 253,
  height: 350,
};
export const pilot: SrcImage = {
  name: 'Pilot',
  fileName: 'resized_pilot.png',
  src: 'skills/resized_pilot.png',
  width: 236,
  height: 350,
};
export const repair: SrcImage = {
  name: 'Repair',
  fileName: 'resized_repair.png',
  src: 'skills/resized_repair.png',
  width: 247,
  height: 350,
};
export const science: SrcImage = {
  name: 'Science',
  fileName: 'resized_science.png',
  src: 'skills/resized_science.png',
  width: 378,
  height: 350,
};
export const smallGuns: SrcImage = {
  name: 'SmallGuns',
  fileName: 'resized_smallGuns.png',
  src: 'skills/resized_smallGuns.png',
  width: 325,
  height: 350,
};
export const sneak: SrcImage = {
  name: 'Sneak',
  fileName: 'resized_sneak.png',
  src: 'skills/resized_sneak.png',
  width: 289,
  height: 350,
};
export const speech: SrcImage = {
  name: 'Speech',
  fileName: 'resized_speech.png',
  src: 'skills/resized_speech.png',
  width: 302,
  height: 350,
};
export const survival: SrcImage = {
  name: 'Survival',
  fileName: 'resized_survival.png',
  src: 'skills/resized_survival.png',
  width: 370,
  height: 350,
};
export const throwing: SrcImage = {
  name: 'Throwing',
  fileName: 'resized_throwing.png',
  src: 'skills/resized_throwing.png',
  width: 357,
  height: 350,
};
export const unarmed: SrcImage = {
  name: 'Unarmed',
  fileName: 'resized_unarmed.png',
  src: 'skills/resized_unarmed.png',
  width: 267,
  height: 350,
};

// ✅ Après (satisfies garantit le type Record tout en conservant les clés exactes)
export const SKILL_IMAGES = {
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
} satisfies Record<SkillKey, SrcImage>;
