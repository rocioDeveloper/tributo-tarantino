import type { Award, AwardType } from '../types';

export const AWARD_NAMES: Record<AwardType, string> = {
  oscar: 'Óscar',
  globe: 'Globo de Oro',
  bafta: 'BAFTA',
  cannes: 'Cannes',
  cc: "Critics' Choice",
};

export const AWARDS: Award[] = [
  { type: 'cannes', year: 1994, label: 'Palma de Oro · Pulp Fiction' },
  { type: 'oscar', year: 1995, label: 'Mejor guion original · Pulp Fiction' },
  { type: 'globe', year: 1995, label: 'Mejor guion · Pulp Fiction' },
  { type: 'bafta', year: 1995, label: 'Mejor guion original · Pulp Fiction' },
  { type: 'oscar', year: 2013, label: 'Mejor guion original · Django Unchained' },
  { type: 'globe', year: 2013, label: 'Mejor guion · Django Unchained' },
  { type: 'bafta', year: 2013, label: 'Mejor guion original · Django Unchained' },
  { type: 'cc', year: 2013, label: 'Mejor guion original · Django Unchained' },
  { type: 'globe', year: 2020, label: 'Mejor guion · Once Upon a Time in Hollywood' },
  { type: 'globe', year: 2020, label: 'Mejor comedia · Once Upon a Time in Hollywood' },
  { type: 'cc', year: 2020, label: 'Mejor guion original · Once Upon a Time in Hollywood' },
];
