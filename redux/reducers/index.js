import { combineReducers } from "redux";
import { TileReducer } from "./TileReducers";

let reducers = combineReducers({
  TileReducer: TileReducer,
});

const rootReducers = (state, action) => {
  return reducers(state, action);
};

export default rootReducers;
