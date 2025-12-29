export const ORIGIN_MAPPING = {
  'Initié de la confrérie': 'InitiateOfTheBrotherhood',
  Goule: 'Ghoul',
  'Super Mutant': 'SuperMutant',
  'Mister Handy': 'MisterHandy',
  Survivant: 'Survivor',
  "Habitant de l'abri": 'ShelterDweller',
  'Synthé de 3ème génération': 'ThirdGenerationSynth',
  Protectron: 'Protectron',
  "Enfant d'Atome": 'ChildOfAtom',
} as const;

export type ORIGIN_KEY = keyof typeof ORIGIN_MAPPING;
export const ORIGIN_VALUES = Object.values(ORIGIN_MAPPING);
export type ORIGIN_VALUE = (typeof ORIGIN_MAPPING)[ORIGIN_KEY];

export const ORIGIN_MAPPING_REVERSE: Record<ORIGIN_VALUE, ORIGIN_KEY> = Object.entries(
  ORIGIN_MAPPING,
).reduce(
  (acc, [key, value]) => {
    acc[value as ORIGIN_VALUE] = key as ORIGIN_KEY;
    return acc;
  },
  {} as Record<ORIGIN_VALUE, ORIGIN_KEY>,
);
