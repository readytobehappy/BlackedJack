import { Card, CardName, CardSuit } from '../game/types';
import { Rectangle } from 'pixi.js';

const CARD_WIDTH = 100;
const CARD_HEIGHT = 150;
const SCENE_PADDING = {
  left: 50,
  top: 50,
  right: 50,
  bottom: 50
};

const CARD_INDEX_PADDING = 30;
const CARD_RADIUS = 16;

const CARD_FRAME_MEASUREMENTS = {
  paddingLeft: 30,
  paddingTop: 30,
  gapWidth: 30,
  gapHeight: 30,
  width: 360,
  height: 540
};

const CARD_FRAME_ROWS: CardSuit[] = [CardSuit.HEART, CardSuit.DIAMOND, CardSuit.CLUB, CardSuit.SPADE];
const CARD_FRAME_COLUMNS: CardName[] = [CardName.ACE, CardName.N2, CardName.N3, CardName.N4, CardName.N5, CardName.N6,
  CardName.N7, CardName.N8, CardName.N9, CardName.N10, CardName.JACK, CardName.QUEEN, CardName.KING];

export enum PlacementRole {
  DECK,
  DEALER,
  USER
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}

export type CardPlacementCalculator = ReturnType<typeof createCardPlacementCalculator>;

export function createCardPlacementCalculator (sceneWidth: number, sceneHeight: number) {
  const getCardPosition = (role: PlacementRole, index = 0): Rect => {
    switch (role) {
      case PlacementRole.DECK:
        return {
          x: sceneWidth - SCENE_PADDING.right - CARD_WIDTH,
          y: SCENE_PADDING.top,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          radius: CARD_RADIUS
        };
      case PlacementRole.DEALER:
        return {
          x: SCENE_PADDING.left + index * CARD_INDEX_PADDING,
          y: SCENE_PADDING.top,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          radius: CARD_RADIUS
        };
      case PlacementRole.USER:
        return {
          x: SCENE_PADDING.left + index * CARD_INDEX_PADDING,
          y: sceneHeight - SCENE_PADDING.bottom - CARD_HEIGHT,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          radius: CARD_RADIUS
        };
      default:
        throw new Error(`Unknown role (${role})`);
    }
  };

  const getCardFrameRect = (card: Card) => {
    const column = CARD_FRAME_COLUMNS.indexOf(card.name);
    const row = CARD_FRAME_ROWS.indexOf(card.suit);

    if ((column < 0) || (row < 0))
      throw new Error(`Unknown card name (${card.name}) and suit (${card.suit})`);

    const {
      paddingLeft,
      paddingTop,
      gapWidth,
      gapHeight,
      width,
      height
    } = CARD_FRAME_MEASUREMENTS;

    return new Rectangle(
      paddingLeft + (width + gapWidth) * column,
      paddingTop + (height + gapHeight) * row,
      width,
      height
    );
  };

  return {
    getCardPosition,
    getCardFrameRect,
    sceneWidth,
    sceneHeight
  };
}
