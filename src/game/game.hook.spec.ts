import { useGame } from './game.hook';
import { CardActionHandlerArgs, CardActionType } from './types';

describe('game.hook.ts', () => {
  const lastNotifyTypes: CardActionType[] = [];
  const notifyAction = (args: CardActionHandlerArgs) => {
    lastNotifyTypes.push(args.type);
  };

  const {
    dealerScore,
    userScore,
    isGameOver,
    isUserWon,
    isSameScore,
    hit,
    stand,
    reset
  } = useGame(notifyAction);

  it('checks initial state', () => {
    expect(dealerScore.value)
      .toEqual(0);
    expect(userScore.value)
      .toEqual(0);
    expect(isGameOver.value)
      .toEqual(false);
    expect(isUserWon.value)
      .toEqual(false);
    expect(isSameScore.value)
      .toEqual(false);
  });

  it('checks reset deck', () => {
    reset();
    expect(dealerScore.value)
      .toBeGreaterThan(0);
    expect(userScore.value)
      .toBeGreaterThan(0);
    expect(isGameOver.value)
      .toEqual(false);
    expect(isUserWon.value)
      .toEqual(false);
    expect(isSameScore.value)
      .toEqual(false);
    expect(lastNotifyTypes.indexOf(CardActionType.RESET))
      .toBeGreaterThanOrEqual(0);
    expect(lastNotifyTypes.indexOf(CardActionType.MOVE_FROM_DECK_TO_DEALER))
      .toBeGreaterThanOrEqual(0);
    expect(lastNotifyTypes.indexOf(CardActionType.MOVE_FROM_DECK_TO_USER))
      .toBeGreaterThanOrEqual(0);
  });

  it('checks hit on deck', () => {
    reset();
    lastNotifyTypes.splice(0, lastNotifyTypes.length);
    const scoreFromUser = userScore.value;
    hit();
    expect(userScore.value)
      .toBeGreaterThan(scoreFromUser);
    expect(lastNotifyTypes.indexOf(CardActionType.MOVE_FROM_DECK_TO_USER))
      .toBeGreaterThanOrEqual(0);
  });

  it('checks stand on deck', () => {
    reset();
    lastNotifyTypes.splice(0, lastNotifyTypes.length);
    const scoreFromUser = userScore.value;
    stand();
    expect(userScore.value)
      .toEqual(scoreFromUser);
    expect(lastNotifyTypes.indexOf(CardActionType.MOVE_FROM_DECK_TO_USER))
      .toBeLessThan(0);
  });
});
