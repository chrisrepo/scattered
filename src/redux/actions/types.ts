import {
  SetLetterAction,
  SetGameStatusAction,
  SetAnswersAction,
  SetPromptIndAction,
  SetPointForAnswerAction,
  SetJoinedInProgressAction,
  SetScoreboardAction,
} from './gameFlow';

// Action Constants
const gameFlowPrefix = 'GAME_FLOW/';
export const GameFlowActionTypes = {
  setLetter: `${gameFlowPrefix}SET_LETTER`,
  setGameStatus: `${gameFlowPrefix}SET_STATUS`,
  setAnswers: `${gameFlowPrefix}SET_ANSWERS`,
  setPromptInd: `${gameFlowPrefix}SET_PROMPT_IND`,
  setPointForAnswer: `${gameFlowPrefix}SET_ANSWER_POINT`,
  setJoinedInProgress: `${gameFlowPrefix}SET_JOINED_IN_PROGRESS`,
  setScoreboard: `${gameFlowPrefix}SET_SCOREBOARD`,
};

export type GameFlowAction =
  | SetLetterAction
  | SetGameStatusAction
  | SetAnswersAction
  | SetPromptIndAction
  | SetPointForAnswerAction
  | SetJoinedInProgressAction
  | SetScoreboardAction;
