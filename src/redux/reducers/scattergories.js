import { SCATTER_ACTIONS } from '../actions';

const initialState = {
  prompts: [],
  answers: [],
  selectedPrompt: -1,
};

export const scatterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCATTER_ACTIONS.SET_ANSWER: {
      let newAnswers = [...state.answers];
      newAnswers[action.payload.index] = action.payload.answer;
      return {
        ...state,
        answers: newAnswers,
      };
    }
    case SCATTER_ACTIONS.SET_PROMPTS: {
      return {
        ...state,
        prompts: action.payload,
        answers: Array(action.payload.length),
      };
    }
    case SCATTER_ACTIONS.SET_SELECTED_PROMPT: {
      return {
        ...state,
        selectedPrompt: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
