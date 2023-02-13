import { generate } from "../../utils/generate";
import { generateInitialCards } from "../../utils/generateInitialCards";
import {
  ACTION,
  COMPLETED,
  RESET_GAME,
  RESET_GAME_HARD,
  RESET_GAME_MEDIUM,
  TYPE,
  UPDATE_CARD_STATE,
  UPDATE_CLICK_STATE,
  UPDATE_VISIBLE_STATE,
} from "../actions";

const initialState = {
  cards: [],
  clicks: 0,
  completed: false,
  type: 0,
};

export const TileReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE:
      return {
        type: 0,
        cards: [],
        clicks: 0,
      };
    case RESET_GAME:
      return {
        ...state,
        cards: generateInitialCards(),
        type: 1,
        clicks: 0,
      };
    case RESET_GAME_MEDIUM:
      return {
        ...state,
        cards: generate(),
        type: 2,
        clicks: 0,
      };
    case RESET_GAME_HARD:
      return {
        cards: generate(),
        clicks: 0,
      };

    case UPDATE_CARD_STATE:
      const item = action.payload;

      const existItem = state.cards === item.cards;
      if (existItem) {
        return {
          ...state,
        };
      } else {
        return { ...state, cards: item.cards };
      }

    case UPDATE_VISIBLE_STATE:
      state.cards.map((item) => {
        item.cardState = "Invisible";
      });

      return { ...state };

    case UPDATE_CLICK_STATE:
      const click = action.payload;

      return { ...state, clicks: click.clicks };

    case COMPLETED:
      return { ...state, completed: true };


    default:
      return state;
  }
};
