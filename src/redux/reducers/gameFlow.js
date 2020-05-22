import { INITIAL_REDUCER_STATE, GAME_STATUS } from '../../constants/gameFlow';
import { GAME_ACTIONS } from '../actions';
export const flowReducer = (state = INITIAL_REDUCER_STATE, action) => {
  switch (action.type) {
    case GAME_ACTIONS.SET_LETTER: {
      return Object.assign({}, state, {
        currentLetter: action.payload,
      });
    }
    case GAME_ACTIONS.SET_STATUS: {
      return Object.assign({}, state, {
        gameStatus: action.payload,
      });
    }
    case GAME_ACTIONS.SET_ANSWERS: {
      return Object.assign({}, state, {
        answers: action.payload,
      });
    }
    case GAME_ACTIONS.SET_PROMPT_IND: {
      return Object.assign({}, state, {
        currentPrompt: action.payload,
      });
    }
    case GAME_ACTIONS.SET_ROUND: {
      return Object.assign({}, state, {
        round: action.payload,
      });
    }
    case GAME_ACTIONS.SET_JOINED_IN_PROGRESS: {
      return Object.assign({}, state, {
        joinedInProgress: action.payload,
      });
    }
    case GAME_ACTIONS.SET_ANSWER_POINT: {
      let { promptInd, userId, earnedPoint } = action.payload;
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
