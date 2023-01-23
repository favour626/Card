import { color } from "../style/color";
import { CardState } from "./CardState";

const BACKGROUND_COLOR_INVISIBLE = color.dark;
const BACKGROUND_COLOR_VISIBLE = color.blue;
const BACKGROUND_COLOR_MATCHED = color.teal;
const BACKGROUND_COLOR_NOT_MATCHED = color.red;

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
