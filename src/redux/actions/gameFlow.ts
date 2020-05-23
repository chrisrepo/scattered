import { GameFlowActionTypes } from './types';

// Action Functions

export interface SetLetterAction {
  type: typeof GameFlowActionTypes.setLetter;
  payload: string;
}
export const setLetter = (letter: string): SetLetterAction => ({
  type: GameFlowActionTypes.setLetter,
  payload: letter,
});

export interface SetGameStatusAction {
  type: typeof GameFlowActionTypes.setGameStatus;
  payload: string;
}
export const setGameStatus = (status: string): SetGameStatusAction => ({
  type: GameFlowActionTypes.setGameStatus,
  payload: status,
});

export interface SetAnswersAction {
  type: typeof GameFlowActionTypes.setAnswers;
  payload: AnswerContainer;
}
export const setAnswers = (answers: AnswerContainer): SetAnswersAction => ({
  type: GameFlowActionTypes.setAnswers,
  payload: answers,
});

export interface SetPromptIndAction {
  type: typeof GameFlowActionTypes.setPromptInd;
  payload: number;
}
export const setPromptInd = (ind: number): SetPromptIndAction => ({
  type: GameFlowActionTypes.setPromptInd,
  payload: ind,
});

export interface SetPointForAnswerAction {
  type: typeof GameFlowActionTypes.setPointForAnswer;
  payload: SetAnswerData;
}
export const setPointForAnswer = (
  data: SetAnswerData
): SetPointForAnswerAction => ({
  type: GameFlowActionTypes.setPointForAnswer,
  payload: data,
});

export interface SetJoinedInProgressAction {
  type: typeof GameFlowActionTypes.setJoinedInProgress;
  payload: JoinInProgressData;
}
export const setJoinedInProgress = (
  data: JoinInProgressData
): SetJoinedInProgressAction => ({
  type: GameFlowActionTypes.setJoinedInProgress,
  payload: data,
});

export interface SetScoreboardAction {
  type: typeof GameFlowActionTypes.setScoreboard;
  payload: Scoreboard;
}
export const setScoreboard = (scoreboard: Scoreboard): SetScoreboardAction => ({
  type: GameFlowActionTypes.setScoreboard,
  payload: scoreboard,
});

// Object Interfaces

export interface Answer {
  text: string;
  username: string;
  earnedPoint: boolean;
}

export interface AnswerContainer {
  [key: string]: Answer[];
}
export interface JoinInProgressData {
  inProgress: boolean;
  timeRemaining: number;
}
export interface SetAnswerData {
  promptInd: number;
  userId: string;
  earnedPoint: boolean;
}

export interface Scoreboard {
  [key: string]: {
    username: string;
    score: number;
  };
}
