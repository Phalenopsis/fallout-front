import { SpecialKey } from '../../../character/models/special.type';
import { SrcImage } from '../../models/src-image.model';

export const agility: SrcImage = {
  name: 'Agility',
  fileName: 'resized_agility.png',
  src: 'special/resized_agility.png',
  width: 414,
  height: 350,
};
export const charisma: SrcImage = {
  name: 'Charisma',
  fileName: 'resized_charisma.png',
  src: 'special/resized_charisma.png',
  width: 220,
  height: 350,
};
export const endurance: SrcImage = {
  name: 'Endurance',
  fileName: 'resized_endurance.png',
  src: 'special/resized_endurance.png',
  width: 362,
  height: 350,
};
export const intelligence: SrcImage = {
  name: 'Intelligence',
  fileName: 'resized_intelligence.png',
  src: 'special/resized_intelligence.png',
  width: 251,
  height: 350,
};
export const luck: SrcImage = {
  name: 'Luck',
  fileName: 'resized_luck.png',
  src: 'special/resized_luck.png',
  width: 284,
  height: 350,
};
export const perception: SrcImage = {
  name: 'Perception',
  fileName: 'resized_perception.png',
  src: 'special/resized_perception.png',
  width: 352,
  height: 350,
};
export const strength: SrcImage = {
  name: 'Strength',
  fileName: 'resized_strength.png',
  src: 'special/resized_strength.png',
  width: 221,
  height: 350,
};

export const SPECIAL_IMAGES: Record<SpecialKey, SrcImage> = {
  strength,
  perception,
  endurance,
  charisma,
  intelligence,
  agility,
  luck,
};
