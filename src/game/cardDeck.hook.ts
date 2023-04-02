import { ref } from 'vue';
import { Card, CardName, CardSuit } from './types';
import { cardScores } from './consts';

export function useCardDeck () {
  const cards = ref<Card[]>([]);

  const getScore = () => cards.value.reduce((sum, card) => typeof card.score === 'function'
    ? sum + card.score(sum)
    : sum + card.score, 0);

  const replaceCards = (newCards: Card[]) => {
    cards.value.splice(0, cards.value.length); // cards.splice(,,...result) не работает
    Array.prototype.push.apply(cards.value, newCards); // cards.push(...result)
  };

  const resetTo52Cards = () => {
    const newCards = fillDeck();
    replaceCards(newCards);
  };

  const shuffle = () => {
    const copy = cards.value.slice();
    const result: Card[] = [];
    while (copy.length) {
      const index = copy.length === 1
        ? 0
        : Math.round((copy.length - 1) * Math.random());
      result.push(copy.splice(index, 1)[0]);
    }
    replaceCards(result);
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const getTopCard = () => cards.value.pop()!; // отсутствует обработка пустой колоды, т.к. на одну игру гарантированно должно хватить

  const peekTopCard = () => cards.value[cards.value.length - 1]; // отсутствует обработка пустой колоды, т.к. на одну игру гарантированно должно хватить

  const takeCard = (card: Card) => {
    cards.value.push(card);
  };

  return {
    cards,
    getScore,
    resetTo52Cards,
    shuffle,
    getTopCard,
    peekTopCard,
    takeCard
  };
}

function fillDeck () {
  const suits = fillValues(CardSuit.MIN, CardSuit.MAX);
  const names = fillValues(CardName.MIN, CardName.MAX);

  return suits.reduce<Card[]>((cards, suit) => {
    names.forEach(name => {
      cards.push({ name, suit, score: cardScores[name] });
    });
    return cards;
  }, []);
}

function fillValues<T extends number> (min: T, max: T): T[] {
  const result: T[] = [];
  for (let i = min; i <= max; i++)
    result.push(i);
  return result;
}
