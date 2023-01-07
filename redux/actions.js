export const RESET_GAME = "RESET_GAME";
export const SELECT_TILE = "SELECT_TILE";

export const resetGame = () => ({
  type: RESET_GAME,
});

export const selectTile = (index) => ({
  type: SELECT_TILE,
  index,
});
