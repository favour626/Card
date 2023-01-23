import { generateInitialCards } from "../../utils/generateInitialCards";
import {
  COMPLETED,
  RESET_GAME,
  UPDATE_CARD_STATE,
  UPDATE_CLICK_STATE,
  UPDATE_VISIBLE_STATE,
} from "../actions";

const initialState = {
  cards: [],
  clicks: 0,
  completed: false,
};

export const TileReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME:
      return {
        cards: generateInitialCards(),
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
