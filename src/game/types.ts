export enum CardSuit {
  /** черва */
  HEART,
  /** пика */
  SPADE,
  /** трефа */
  CLUB,
  /** бубна */
  DIAMOND,
  /** минимальная масть */
  MIN = CardSuit.HEART,
  /** максимальная масть */
  MAX = CardSuit.DIAMOND
}

export enum CardName {
  /** двойка */
  N2,
  /** тройка */
  N3,
  /** четвёрка */
  N4,
  /** пятёрка */
  N5,
  /** шестёрка */
  N6,
  /** семёрка */
  N7,
  /** восьмёрка */
  N8,
  /** девятка */
  N9,
  /** десятка */
  N10,
  /** валет */
  JACK,
  /** дама */
  QUEEN,
  /** король */
  KING,
  /** туз */
  ACE,
  /** минимальное имя */
  MIN = CardName.N2,
  /** максимальное имя */
  MAX = CardName.ACE
}

export type ScoreFunction = (sum: number) => number;

export interface Card {
  /** масть */
  suit: CardSuit;
  /** имя */
  name: CardName;
  /** количество очков или функция расчёта очков */
  score: number | ScoreFunction;
}

export enum CardActionType {
  /** перемещение карты из колоды к крупье */
  MOVE_FROM_DECK_TO_DEALER,
  /** перемещение карты из колоды к пользователю */
  MOVE_FROM_DECK_TO_USER,
  /** сброс колоды к состоянию, когда у крупье и пользователя нет карт */
  RESET
}

export interface CardActionHandlerArgs {
  type: CardActionType;
  card?: Card;
  cardsCount: number;
}

export type CardActionHandler = (args: CardActionHandlerArgs) => void;
