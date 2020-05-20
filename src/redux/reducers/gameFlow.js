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
    default: {
      return state;
    }
  }
};
