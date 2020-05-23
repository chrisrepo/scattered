const GAME_STATUS = {
  PRE_ROUND: 'PRE_ROUND', // Time before prompts revealed (Host has not clicked 'start-round', so prompts are covered)
  ROUND_STARTED: 'ROUND_STARTED', // Time when round is going and users are playing
  SCORING: 'SCORING', // Time after round ends & host is scoring users. Moves from here back to pre round where prompts are covered
};

const GAME_CONFIG = {
  timePerRound: 30,
};

const INITIAL_REDUCER_STATE = {
  timePerRound: GAME_CONFIG.timePerRound, // TODO: maybe create config for defaults (this & prompt count/ round count)
  round: 0,
  joinedInProgress: false,
  gameStatus: GAME_STATUS.PRE_ROUND,
  currentLetter: '',
  currentPrompt: 0, // For going thru prompts
  answers: {}, // a map where each key is a socket id of a playing user
  // answer will be key= socket.id value={text: answer, username: user.username, earnedPoint: false}
  scoreboard: {}, // Each key is a socket id, each value is just points (integer)
};

const CREATE_INITIAL_GAME_CONFIG = () => {
  return {
    timePerRound: GAME_CONFIG.timePerRound,
    round: 0,
    promptInd: 0,
    gameStatus: GAME_STATUS.PRE_ROUND,
    answers: [], // array of answers (indexed by question number)
    // each index will have a map where each key is a socket id of a playing user
    // answer will be key= socket.id value={text: answer, username: user.username, earnedPoint: false}
    prompts: [],
    scoreboard: {},
  };
};

module.exports = {
  GAME_STATUS,
  GAME_CONFIG,
  INITIAL_REDUCER_STATE,
  CREATE_INITIAL_GAME_CONFIG,
};
