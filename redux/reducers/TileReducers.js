import { RESET_GAME, SELECT_TILE } from "./actions";

const NUM_OBJECTS = 8;

const initialState = {
  objects: [],
  revealedTiles: [],
  selectedTile: null,
  score: 0,
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...state,
        objects: generateObjects(),
        revealedTiles: [],
        selectedTile: null,
        score: 0,
      };
    case SELECT_TILE:
      if (state.revealedTiles.includes(action.index)) {
        return state;
      }
      if (state.selectedTile === null) {
        return {
          ...state,
          revealedTiles: [...state.revealedTiles, action.index],
          selectedTile: action.index,
        };
      }
      return {
        ...state,
        revealedTiles: [...state.revealedTiles, action.index],
        selectedTile: null,
        score:
          state.objects[state.selectedTile] === state.objects[action.index]
            ? state.score + 1
            : state.score,
      };
    default:
      return state;
  }
};

const generateObjects = () => {
  const objects = [];
  for (let i = 0; i < NUM_OBJECTS; i++) {
    objects.push(i);
    objects.push(i);
  }
  return shuffle(objects);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
