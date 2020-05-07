const prefix = 'SCATTER/';

export const SCATTER_ACTIONS = {
  SET_ANSWER: `${prefix}SET_ANSWER`,
  RESET_ANSWERS: `${prefix}RESET_ANSWERS`,
  SET_PROMPTS: `${prefix}SET_PROMPTS`,
  SET_SELECTED_PROMPT: `${prefix}SET_SELECTED_PROMPT`,
};

export const setAnswer = (ans, ind) => ({
  type: SCATTER_ACTIONS.SET_ANSWER,
  payload: {
    answer: ans,
    index: ind,
  },
});

export const resetAnswers = () => ({
  type: SCATTER_ACTIONS.RESET_ANSWERS,
});

export const setPrompts = (prompts) => ({
  type: SCATTER_ACTIONS.SET_PROMPTS,
  payload: prompts,
});

export const setSelectedPrompt = (ind) => ({
  type: SCATTER_ACTIONS.SET_SELECTED_PROMPT,
  payload: ind,
});
