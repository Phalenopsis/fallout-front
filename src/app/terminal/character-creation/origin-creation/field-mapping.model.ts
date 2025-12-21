import { TraitDescription } from '../trait-creation/trait.desc';
import { BonusCompetence, Limitation, MaxStat, ModStat, OrigineDescription } from './origine.desc';

export type FieldMapping<T> = {
  key: keyof T;
  label: string;
  transform?: (value: unknown) => string[];
};

export const ORIGINE_FIELD_MAPPINGS: FieldMapping<OrigineDescription>[] = [
  {
    key: 'traitAChoisir',
    label: 'Traits à choisir',
    transform: (v) => v as string[],
  },
  {
    key: 'trait',
    label: 'Traits automatiques',
    transform: (traits: unknown) =>
      (traits as TraitDescription[]).map((t) => `${t.nom} : ${t.description.join(', ')}`),
  },
  {
    key: 'immunite',
    label: 'Immunités',
    transform: (v) => v as string[],
  },
  {
    key: 'handicap',
    label: 'Handicap',
    transform: (v) => [String(v)],
  },
  {
    key: 'bonusCompetence',
    label: 'Bonus de compétences',
    transform: (value: unknown) => {
      const bonus = value as BonusCompetence;

      return Object.entries(bonus).map(([competence, amount]) => `+${amount} ${competence}`);
    },
  },
  {
    key: 'modificateurStats',
    label: 'Modificateurs de SPECIAL',
    transform: (value: unknown) => {
      const modifiers = value as ModStat[];

      return modifiers.flatMap((mod) =>
        Object.entries(mod).map(([stat, amount]) => {
          return `+${amount} ${stat}`;
        }),
      );
    },
  },
  {
    key: 'maximumStats',
    label: 'Maximum de SPECIAL',
    transform: (value: unknown) => {
      const modifiers = value as MaxStat[];

      return modifiers.flatMap((mod) =>
        Object.entries(mod).map(([stat, amount]) => {
          return `${stat} : ${amount}`;
        }),
      );
    },
  },
  {
    key: 'limitateurCompetence',
    label: 'Limitation de Compétences',
    transform: (v) => [`Compétences limitées à ${v}`],
  },
  {
    key: 'limitation',
    label: 'Limitations diverses',
    transform: (value: unknown) => {
      const bonus = value as Limitation;

      return Object.entries(bonus).map(([type, amount]) => ` ${type} ${amount} kgs`);
    },
  },
  {
    key: 'accessoireBras',
    label: 'Accessoire de bras',
    transform: (v) => v as string[],
  },
  {
    key: 'malus',
    label: 'Malus',
    transform: (v) => [String(v)],
  },
  {
    key: 'amelioration',
    label: 'Amélioration',
    transform: (v) => [String(v)],
  },
  {
    key: 'resistanceRadiation',
    label: 'Résistance à la radiation',
    transform: (v) => [`Résistance aux radiations : ${String(v)}`],
  },
  {
    key: 'reputation',
    label: 'Réputation initiale',
    transform: (value: unknown) => {
      const bonus = value as Limitation;

      return Object.entries(bonus).map(([type, amount]) => ` ${type} ${amount}`);
    },
  },
];
