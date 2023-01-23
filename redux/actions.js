import { useDispatch } from "react-redux";

export const RESET_GAME = "RESET_GAME";
export const SELECT_TILE = "SELECT_TILE";
export const UPDATE_CARD_STATE = "UPDATE_CARD_STATE";
export const COMPLETED = "COMPLETED";
export const UPDATE_CLICK_STATE = "UPDATE_CLICK_STATE";
export const UPDATE_VISIBLE_STATE = "UPDATE_VISIBLE_STATE";


 // add point for player 1, redo later
 export const addPoint = (cards, dispatch) =>
   dispatch({
     type: UPDATE_CARD_STATE,
     payload: {
       cards: cards,
     },
   });

 export const addClick = (clicks, dispatch) =>
   dispatch({
     type: UPDATE_CLICK_STATE,
     payload: {
       clicks: clicks,
     },
   });

 export const complete = (dispatch) =>
   dispatch({
     type: COMPLETED,
   });