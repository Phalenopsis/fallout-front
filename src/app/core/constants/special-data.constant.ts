import { SpecialKey } from '../../character/models/special.type';
import { SrcImage } from '../models/src-image.model';
import { SPECIAL_IMAGES } from '../component/image/special.images';

export interface SpecialInfo {
  key: SpecialKey;
  label: string;
  description: string;
  image: SrcImage;
}

export const SPECIAL_DATA: SpecialInfo[] = [
  {
    key: 'strength',
    label: 'FORCE',
    description:
      "Mesure la force brute, c'est-à-dire la capacité à frapper plus fort au corps à corps et à manipuler des éléments lourds.",
    image: SPECIAL_IMAGES.strength,
  },
  {
    key: 'perception',
    label: 'PERCEPTION',
    description:
      'Indique la capacité du personnage à percevoir son environnement et à comprendre les intentions de ses interlocuteurs.',
    image: SPECIAL_IMAGES.perception,
  },
  {
    key: 'endurance',
    label: 'ENDURANCE',
    description:
      'Mesure la résistance physique du personnage face à son environnement et lors des affrontements martiaux.',
    image: SPECIAL_IMAGES.endurance,
  },
  {
    key: 'charisma',
    label: 'CHARISME',
    description:
      "Indique la capacité du personnage à manipuler ou convaincre son auditoire par l'éloquence et la façon d'être.",
    image: SPECIAL_IMAGES.charisma,
  },
  {
    key: 'intelligence',
    label: 'INTELLIGENCE',
    description: 'Désigne la capacité du personnage à comprendre et à apprendre.',
    image: SPECIAL_IMAGES.intelligence,
  },
  {
    key: 'agility',
    label: 'AGILITÉ',
    description: 'Indique la manière dont le personnage sait coordonner ses mouvements.',
    image: SPECIAL_IMAGES.agility,
  },
  {
    key: 'luck',
    label: 'CHANCE',
    description: "Mesure simple du karma d'un personnage.",
    image: SPECIAL_IMAGES.luck,
  },
];
