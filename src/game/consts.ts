import { CardName, ScoreFunction } from './types';

export const cardScores: Record<CardName, number | ScoreFunction> = {
  [CardName.N2]: 2,
  [CardName.N3]: 3,
  [CardName.N4]: 4,
  [CardName.N5]: 5,
  [CardName.N6]: 6,
  [CardName.N7]: 7,
  [CardName.N8]: 8,
  [CardName.N9]: 9,
  [CardName.N10]: 10,
  [CardName.JACK]: 10,
  [CardName.QUEEN]: 10,
  [CardName.KING]: 10,
  [CardName.ACE]: (sum: number) => (sum + 11) > 21 ? 1 : 11
};
