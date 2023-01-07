// actions.js

export const FLIP_CARD = 'FLIP_CARD';
export const MATCH_CARDS = 'MATCH_CARDS';
export const INCREMENT_TURN = 'INCREMENT_TURN';

export const flipCard = (cardId) => ({
  type: FLIP_CARD,
  payload: cardId,
});

export const matchCards = (cardIds) => ({
  type: MATCH_CARDS,
  payload: cardIds,
});

export const incrementTurn = () => ({
  type: INCREMENT_TURN,
});

// reducer.js

import { FLIP_CARD, MATCH_CARDS, INCREMENT_TURN } from './actions';

const initialState = {
  score: 0,
  flippedCards: [],
  turns: 0,
  cards: [
    { id: '1', flip: false, match: false },
    { id: '2', flip: false, match: false },
    // Add more cards as needed
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FLIP_CARD:
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload],
        turns: state.turns + 1,
        cards: state.cards.map((card) => {
          if (card.id === action.payload) {
            return { ...card, flip: !card.flip };
          }
          return card;
        }),
      };
    case MATCH_CARDS:
      return {
        ...state,
        score: state.score + 1,
        flippedCards: [],
        cards: state.cards.map((card) => {
          if (action.payload.includes(card.id)) {
            return { ...card, flip: false, match: true };
          }
          return card;
        }),
      };
    case INCREMENT_TURN:
      return {
        ...state,
        turns: state.turns + 1,
      };
    default:
      return state;
  }
}