import { onBeforeUnmount, onMounted, Ref } from 'vue';
import {
  Application,
  ColorMatrixFilter,
  Graphics,
  Resource,
  SCALE_MODES,
  Sprite,
  Texture
} from 'pixi.js';
import { AnimatedGIF } from '@pixi/gif';
import { CardPlacementCalculator, createCardPlacementCalculator, PlacementRole } from './cardPlacementCalculator';
import {
  Card,
  CardActionHandler,
  CardActionHandlerArgs,
  CardActionType
} from '../game/types';
import { createAnimationQueue, TimeFunctionKey } from './animationQueue';
import { injectStore } from '@/store';

const CARDS_TABLE_TEXTURE_URL = '/img/bgtexture.jpg';
const CARDS_TEXTURE_URL = '/img/cards.svg';
const CARD_ANIMATE_TIMEOUT = 500;

export function usePixi (
  sceneDiv: Ref<HTMLDivElement | null>,
  onLoadComplete: () => void
) {
  const { blobs, deckSprite } = injectStore();
  let application: Application | undefined;
  let calculator: CardPlacementCalculator | undefined;
  let cardsTexture: Texture<Resource> | undefined;
  const animationQueue = createAnimationQueue();

  onMounted(async () => {
    const { value: div } = sceneDiv;
    if (!div)
      return;
    application = new Application({
      width: div.offsetWidth,
      height: div.offsetHeight,
      resolution: window.devicePixelRatio || 1,
      antialias: true
    });
    div.appendChild(application.view);

    calculator = createCardPlacementCalculator(application.screen.width, application.screen.height);

    const bgTexture = await Texture.fromURL(blobs.value[CARDS_TABLE_TEXTURE_URL]);
    const bgSprite = new Sprite(bgTexture);
    bgSprite.x = 0;
    bgSprite.y = 0;
    bgSprite.width = calculator.sceneWidth;
    bgSprite.height = calculator.sceneHeight;
    application.stage.addChild(bgSprite);

    const colorMatrix = new ColorMatrixFilter();
    bgSprite.filters = [colorMatrix];
    colorMatrix.brightness(0.4, false);

    cardsTexture = await Texture.fromURL(blobs.value[CARDS_TEXTURE_URL]);
    cardsTexture.baseTexture.scaleMode = SCALE_MODES.LINEAR;

    onLoadComplete();
    animationQueue.setApplication(application);
  });

  onBeforeUnmount(() => {
    animationQueue.dispose();
    const { value: div } = sceneDiv;
    if (!application || !div)
      return;
    div.removeChild(application.view);
    application.destroy();
  });

  const processAction: CardActionHandler = ({ type, card, cardsCount }: CardActionHandlerArgs): void => {
    switch (type) {
      case CardActionType.MOVE_FROM_DECK_TO_DEALER: {
        if (!card || !application || !calculator || !cardsTexture)
          return;

        const {
          startMoveCard,
          progressMoveCard,
          endMoveCard
        } = createMoveCardFunctions(application, calculator, cardsTexture, card, cardsCount, true);

        return animationQueue.enqueue(
          CARD_ANIMATE_TIMEOUT,
          TimeFunctionKey.EASE,
          startMoveCard,
          progressMoveCard,
          endMoveCard
        );
      }

      case CardActionType.MOVE_FROM_DECK_TO_USER: {
        if (!card || !application || !calculator || !cardsTexture)
          return;

        const {
          startMoveCard,
          progressMoveCard,
          endMoveCard
        } = createMoveCardFunctions(application, calculator, cardsTexture, card, cardsCount, false);

        return animationQueue.enqueue(
          CARD_ANIMATE_TIMEOUT,
          TimeFunctionKey.EASEINOUT,
          startMoveCard,
          progressMoveCard,
          endMoveCard
        );
      }

      case CardActionType.RESET: {
        if (!application || !calculator || !deckSprite.value)
          return;

        const {
          startReset,
          progressReset,
          endReset
        } = createResetCardFunctions(application, calculator, deckSprite.value);

        return animationQueue.enqueue(
          CARD_ANIMATE_TIMEOUT,
          TimeFunctionKey.EASEINOUT,
          startReset,
          progressReset,
          endReset
        );
      }
    }
  };

  return {
    processAction
  };
}

function createMoveCardFunctions (
  application: Application,
  calculator: CardPlacementCalculator,
  cardsTexture: Texture<Resource>,
  card: Card,
  cardsCount: number,
  isDealer: boolean
) {
  const { x: xFrom, y: yFrom } = calculator.getCardPosition(PlacementRole.DECK);
  const {
    x: xTo,
    y: yTo,
    width,
    height,
    radius
  } = calculator.getCardPosition(isDealer ? PlacementRole.DEALER : PlacementRole.USER, cardsCount);
  const { stage } = application;
  let cardSprite: Sprite | undefined;

  const startMoveCard = () => {
    const framePosition = calculator.getCardFrameRect(card);

    const cardTexture = new Texture(cardsTexture.baseTexture, framePosition);
    cardSprite = new Sprite(cardTexture);
    cardSprite.x = xFrom;
    cardSprite.y = yFrom;
    cardSprite.width = width;
    cardSprite.height = height;

    const graphics = new Graphics();
    graphics.beginFill(0x000000, 1);
    graphics.drawRoundedRect(xFrom, yFrom, width, height, radius);
    graphics.endFill();
    cardSprite.mask = graphics;

    stage.addChild(cardSprite);
  };

  const progressMoveCard = (progress: number) => {
    if (!cardSprite)
      return;

    const x = progressedValue(progress, xFrom, xTo);
    const y = progressedValue(progress, yFrom, yTo);
    cardSprite.x = x;
    cardSprite.y = y;

    const graphics = new Graphics();
    graphics.beginFill(0x000000, 1);
    graphics.drawRoundedRect(x, y, width, height, radius);
    graphics.endFill();
    cardSprite.mask = graphics;
  };

  const endMoveCard = () => {
    const graphics = new Graphics();
    graphics.lineStyle(1, 0x000000, 1);
    graphics.drawRoundedRect(xTo, yTo, width, height, radius);
    stage.addChild(graphics);
  };

  return {
    startMoveCard,
    progressMoveCard,
    endMoveCard
  };
}

function createResetCardFunctions (
  application: Application,
  calculator: CardPlacementCalculator,
  image: AnimatedGIF
) {
  const { x: xTo, y: yTo, width, height, radius } = calculator.getCardPosition(PlacementRole.DECK);
  const xFrom = xTo - 8;
  const yFrom = yTo - 8;
  const { stage } = application;
  let cardBounds: Graphics | undefined;

  const startReset = () => {
    image.x = xFrom;
    image.y = yFrom;
    image.width = width * 2;
    image.height = height * 2;
    image.anchor.set(0.5);

    const graphics = new Graphics();
    graphics.beginFill(0x000000, 1);
    graphics.drawRoundedRect(xFrom, yFrom, width, height, radius);
    graphics.endFill();
    image.mask = graphics;
    stage.addChild(image);

    cardBounds = new Graphics();
    cardBounds.lineStyle(1, 0xFFFFFF, 1);
    cardBounds.drawRoundedRect(xFrom, yFrom, width, height, radius);
    stage.addChild(cardBounds);
  };

  const progressReset = (progress: number) => {
    const x = progressedValue(progress, xFrom, xTo);
    const y = progressedValue(progress, yFrom, yTo);
    image.x = x;
    image.y = y;
    const graphics = new Graphics();
    graphics.beginFill(0x000000, 1);
    graphics.drawRoundedRect(x, y, width, height, radius);
    graphics.endFill();
    image.mask = graphics;

    if (cardBounds)
      stage.removeChild(cardBounds);
    cardBounds = new Graphics();
    cardBounds.lineStyle(1, 0xFFFFFF, 1);
    cardBounds.drawRoundedRect(x, y, width, height, radius);
    stage.addChild(cardBounds);
  };

  const endReset = () => {
    image.x = xTo;
    image.y = yTo;

    stage.removeChild(image);
    if (cardBounds)
      stage.removeChild(cardBounds);
    for (let i = 1; i < 8; i++) {
      const graphics = new Graphics();
      graphics.lineStyle(1, i % 2 === 1 ? 0x000000 : 0xffffff, 1);
      graphics.drawRoundedRect(xTo - i, yTo - i, width, height, radius);
      stage.addChild(graphics);
    }
    stage.addChild(image);
    if (cardBounds)
      stage.addChild(cardBounds);
  };

  return {
    startReset,
    progressReset,
    endReset
  };
}

function progressedValue (progress: number, from: number, to: number) {
  return from + (to - from) * progress;
}
