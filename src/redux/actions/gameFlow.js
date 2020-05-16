// Action Constants

const actionPrefix = 'GAME_FLOW/';

export const GAME_ACTIONS = {
  SET_LETTER: `${actionPrefix}SET_LETTER`,
};

// Action Functions

export const setLetter = (letter) => ({
  type: GAME_ACTIONS.SET_LETTER,
  payload: letter,
});
