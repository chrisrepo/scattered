const PROMPTS = require('../src/constants/categories');
const { GAME_STATUS } = require('./constants');

function getLetter(letterList, curLetter) {
  let randInd = Math.floor(Math.random() * Math.floor(letterList.length));
  if (!curLetter) {
    return letterList[randInd];
  } else if (curLetter === letterList[randInd]) {
    //just go one up or down
    if (randInd - 1 >= 0) {
      return letterList[randInd - 1];
    } else {
      return letterList[randInd + 1];
    }
  }
  return letterList[randInd];
}

let PROMPT_BOWL = PROMPTS;
function getPrompts(numOfPrompts) {
  // Sort array
  PROMPT_BOWL.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  // Refill bowl if necessary
  if (PROMPT_BOWL.length < numOfPrompts) {
    PROMPT_BOWL = PROMPTS;
  }
  //get first 10.
  return PROMPT_BOWL.splice(0, numOfPrompts);
}

function resetGame(gameList, roomId) {
  gameList[roomId] = {
    timePerRound: 120,
    round: 0,
    gameStatus: GAME_STATUS.PRE_ROUND,
    answers: [],
    prompts: [],
  };
}
module.exports = { getLetter, getPrompts, resetGame };
