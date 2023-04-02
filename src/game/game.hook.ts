import { computed, ref } from 'vue';
import { useCardDeck } from './cardDeck.hook';
import { CardActionHandler, CardActionType } from './types';

export function useGame (onNotifyAction: CardActionHandler) {
  const deck = useCardDeck();
  const dealerHand = useCardDeck();
  const userHand = useCardDeck();

  const dealerScore = computed(() => dealerHand.getScore());
  const userScore = computed(() => userHand.getScore());
  const isGameOver = ref(false);
  const isUserWon = ref(false);
  const isSameScore = ref(false);

  const processAction = (type: CardActionType) => {
    switch (type) {
      case CardActionType.RESET: {
        isSameScore.value = false;
        deck.resetTo52Cards();
        deck.shuffle();
        dealerHand.cards.value = [];
        userHand.cards.value = [];
        return onNotifyAction({ type, cardsCount: 0 });
      }
      case CardActionType.MOVE_FROM_DECK_TO_DEALER: {
        const card = deck.getTopCard();
        const cardsCount = dealerHand.cards.value.length;
        dealerHand.takeCard(card);
        return onNotifyAction({ type, card: { ...card }, cardsCount });
      }
      case CardActionType.MOVE_FROM_DECK_TO_USER: {
        const card = deck.getTopCard();
        const cardsCount = userHand.cards.value.length;
        userHand.takeCard(card);
        return onNotifyAction({ type, card: { ...card }, cardsCount });
      }
    }
  };

  const dealerHit = () => {
    while (dealerHand) {
      const score = dealerHand.getScore();
      const topCardScoreOrFunc = deck.peekTopCard().score;
      const topCardScore = typeof topCardScoreOrFunc === 'function'
        ? topCardScoreOrFunc(score)
        : topCardScoreOrFunc;

      if (score + topCardScore > 21)
        break;

      processAction(CardActionType.MOVE_FROM_DECK_TO_DEALER);
    }
  };

  const checkOverflow = () => {
    const userScore = userHand.getScore();
    if (userScore > 21) {
      isGameOver.value = true;
      isUserWon.value = false;
      return;
    }
    if (userScore === 21)
      stand();
  };

  const checkWinner = () => {
    const dealerScore = dealerHand.getScore();
    const userScore = userHand.getScore();
    isGameOver.value = true;
    isUserWon.value = dealerScore < userScore;
    isSameScore.value = dealerScore === userScore;
  };

  const reset = () => {
    processAction(CardActionType.RESET);
    processAction(CardActionType.MOVE_FROM_DECK_TO_DEALER);
    processAction(CardActionType.MOVE_FROM_DECK_TO_USER);
  };

  const hit = () => {
    processAction(CardActionType.MOVE_FROM_DECK_TO_USER);
    checkOverflow();
  };

  const stand = () => {
    dealerHit();
    checkWinner();
  };

  return {
    dealerScore,
    userScore,
    isGameOver,
    isUserWon,
    isSameScore,
    hit,
    stand,
    reset
  };
}
