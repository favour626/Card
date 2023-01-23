import { addPoint, complete } from "../redux/actions";
import { color } from "../style/color";
import { CardState } from "./CardState";

const NO_MATCH_STEP_DURATION = 120;
const NO_MATCH_ANIMATION_DURATION = NO_MATCH_STEP_DURATION * 5;

const BACKGROUND_COLOR_INVISIBLE = color.dark;
const BACKGROUND_COLOR_VISIBLE = color.blue;
const BACKGROUND_COLOR_MATCHED = color.teal;
const BACKGROUND_COLOR_NOT_MATCHED = color.red;

export const makeVisible = (index, cards, dispatch) => {
  const change = [...cards];
  const tidy = change.find((card) => card.index === index);
  tidy.cardState = CardState.Visible;
  addPoint(change, dispatch);
};

export const evaluateMatch = (cards, dispatch) => {
  const visibleCards = flippedCards(cards);
  if (visibleCards.length !== 2) {
    return;
  }
  if (visibleCards[0].cardType === visibleCards[1].cardType) {
    makeMatched(visibleCards[0].index, cards, dispatch);
    makeMatched(visibleCards[1].index, cards, dispatch);
    if (isCompleted(cards)) {
      // this.timer.stop();
      complete(dispatch);
    }
  } else {
    hide(visibleCards[0].index, cards, dispatch);
    hide(visibleCards[1].index, cards, dispatch);
  }
};

const makeMatched = (index, cards, dispatch) => {
  const change = cards;
  const tidy = change.find((card) => card.index === index);
  tidy.cardState = CardState.Matched;
  addPoint(change, dispatch);
};

const hide = (index, cards, dispatch) => {
  const change = cards;
  const tidy = change.find((card) => card.index === index);
  tidy.cardState = CardState.NotMatched;
  setTimeout(() => {
    tidy.cardState = CardState.Invisible;
    addPoint(change, dispatch);
  }, NO_MATCH_ANIMATION_DURATION);
};

export const isInvisible = (card) => {
  return card.cardState === CardState.Invisible;
};
export const isVisible = (card) => {
  return card.cardState === CardState.Visible;
};
export function isMatched(card) {
  return card.cardState === CardState.Matched;
}
export function isNotMatched(card) {
  return card.cardState === CardState.NotMatched;
}
export const backgroundColor = (card) => {
  switch (card.cardState) {
    case CardState.Invisible:
      return BACKGROUND_COLOR_INVISIBLE;
    case CardState.Visible:
      return BACKGROUND_COLOR_VISIBLE;
    case CardState.Matched:
      return BACKGROUND_COLOR_MATCHED;
    case CardState.NotMatched:
      return BACKGROUND_COLOR_NOT_MATCHED;
  }
};

export const isCompleted = (cards) => {
  return cards.every((card) => isMatched(card));
};

export const notMatchedCards = (cards) => {
  return cards.filter((card) => isNotMatched(card));
};

export const flippedCards = (cards) => {
  return cards.filter((card) => isVisible(card));
};
