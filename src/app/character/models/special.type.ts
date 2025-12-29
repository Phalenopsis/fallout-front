export const SPECIAL_KEYS = [
  'strength',
  'perception',
  'endurance',
  'charisma',
  'intelligence',
  'agility',
  'luck',
] as const;

export type SpecialKey = (typeof SPECIAL_KEYS)[number];

export type SpecialStats = Record<SpecialKey, number>;
