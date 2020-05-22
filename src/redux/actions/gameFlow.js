// Action Constants
const actionPrefix = 'GAME_FLOW/';

export const GAME_ACTIONS = {
  SET_LETTER: `${actionPrefix}SET_LETTER`,
  SET_STATUS: `${actionPrefix}SET_STATUS`,
  SET_ANSWERS: `${actionPrefix}SET_ANSWERS`,
  SET_PROMPT_IND: `${actionPrefix}SET_PROMPT_IND`,
  SET_ANSWER_POINT: `${actionPrefix}SET_ANSWER_POINT`,
  SET_ROUND: `${actionPrefix}SET_ROUND`,
  SET_JOINED_IN_PROGRESS: `${actionPrefix}SET_JOINED_IN_PROGRESS`,
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

export const setAnswers = (answers) => ({
  type: GAME_ACTIONS.SET_ANSWERS,
  payload: answers,
});

export const setPromptInd = (ind) => ({
  type: GAME_ACTIONS.SET_PROMPT_IND,
  payload: ind,
});

export const setPointForAnswer = (data) => ({
  type: GAME_ACTIONS.SET_ANSWER_POINT,
  payload: data,
});

export const setRound = (round) => ({
  type: GAME_ACTIONS.SET_ROUND,
  payload: round,
});

export const setJoinedInProgress = (inProgress) => ({
  type: GAME_ACTIONS.SET_JOINED_IN_PROGRESS,
  payload: inProgress,
});
