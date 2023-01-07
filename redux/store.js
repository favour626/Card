import { createStore } from "redux";
import { gameReducer } from "./reducers/TileReducers";

export const store = createStore(gameReducer);
