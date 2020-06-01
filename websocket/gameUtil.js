const PROMPTS = require('../src/constants/categories');
const LETTERS = require('../src/constants/letters');
const { GAME_STATUS, GAME_CONFIG } = require('./constants');

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
    timePerRound: GAME_CONFIG.timePerRound,
    round: 0,
    promptInd: 0,
    gameStatus: GAME_STATUS.PRE_ROUND,
    answers: [],
    prompts: [],
  };
}

function setNewRound(game) {
  game.gameStatus = GAME_STATUS.PRE_ROUND;
  const letter = getLetter(LETTERS);
  const prompts = getPrompts(10); // TODO: maybe customize # of prompts
  game.letter = letter;
  game.prompts = prompts;
}

// Removes the player from the game's player list
function removePlayerFromGame(game, socket) {
  if (game) {
    let id = socket.id;
    if (game.scoreboard !== undefined && game.scoreboard[id] !== undefined) {
      delete game.scoreboard[id];
      delete game.answers[id];
      delete game.players[id];
    }
  }
}

// Returns true if last player has turned in their answers;
function checkAndRemovePlayerFromRound(gameList, roomId, userId) {
  if (gameList[roomId].players[userId]) {
    delete gameList[roomId].players[userId];
    if (Object.keys(gameList[roomId].players).length === 0) {
      return true;
    }
  }
  return false;
}

function generateScoreboard(players) {
  let scoreboard = {};
  for (let userId in players) {
    scoreboard[userId] = {
      username: players[userId].username,
      emoji: players[userId].emoji,
      score: 0,
    };
  }
  return scoreboard;
}

function addPlayerToGame(game, room, userId) {
  let userData = room.users[userId];
  game.players[userId] = userData;
  game.scoreboard[userId] = {
    username: userData.username,
    emoji: userData.emoji,
    score: 0,
  };
}

module.exports = {
  getLetter,
  getPrompts,
  resetGame,
  setNewRound,
  removePlayerFromGame,
  checkAndRemovePlayerFromRound,
  generateScoreboard,
  addPlayerToGame,
};
