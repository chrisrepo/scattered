// Action Constants

const actionPrefix = 'GAME_FLOW/';

export const GAME_ACTIONS = {
  SET_LETTER: `${actionPrefix}SET_LETTER`,
  SET_STATUS: `${actionPrefix}SET_STATUS`,
};

// Action Functions

export const setLetter = (letter) => ({
  type: GAME_ACTIONS.SET_LETTER,
  payload: letter,
});

export const setGameStatus = (status) => ({
  type: GAME_ACTIONS.SET_STATUS,
  payload: status,
});
