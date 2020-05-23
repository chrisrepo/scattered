import { INITIAL_REDUCER_STATE, GAME_STATUS } from '../../constants/gameFlow';
import {
  AnswerContainer,
  SetAnswerData,
  Scoreboard,
} from '../actions/gameFlow';
import { GameFlowAction, GameFlowActionTypes } from '../actions/types';

interface GameFlow {
  timePerRound: number;
  joinedInProgress: boolean;
  gameStatus: string;
  currentLetter: string;
  currentPrompt: number;
  answers: AnswerContainer;
  scoreboard: Scoreboard;
}

export const flowReducer = (
  state: GameFlow = INITIAL_REDUCER_STATE,
  action: GameFlowAction
) => {
  switch (action.type) {
    case GameFlowActionTypes.setLetter: {
      return Object.assign({}, state, {
        currentLetter: action.payload,
      });
    }
    case GameFlowActionTypes.setGameStatus: {
      return Object.assign({}, state, {
        gameStatus: action.payload,
      });
    }
    case GameFlowActionTypes.setAnswers: {
      return Object.assign({}, state, {
        answers: action.payload,
      });
    }
    case GameFlowActionTypes.setPromptInd: {
      return Object.assign({}, state, {
        currentPrompt: action.payload,
      });
    }
    case GameFlowActionTypes.setJoinedInProgress: {
      return Object.assign({}, state, {
        joinedInProgress: action.payload,
      });
    }
    case GameFlowActionTypes.setScoreboard: {
      return Object.assign({}, state, {
        scoreboard: action.payload,
      });
    }
    case GameFlowActionTypes.setPointForAnswer: {
      let { promptInd, userId, earnedPoint } = action.payload as SetAnswerData;
      return {
        ...state,
        answers: {
          ...state.answers,
          [userId]: {
            ...state.answers[userId],
            [promptInd]: {
              ...state.answers[userId][promptInd],
              earnedPoint,
            },
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
