import prompts from '../constants/categories';

export const getPrompts = (numOfPrompts) => {
  //TODO: Handle getting prompts server side (randomize or actually remove from list each time);
  return prompts.slice(0, numOfPrompts);
};
