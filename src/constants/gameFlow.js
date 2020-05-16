export const GAME_STATUS = {
  PRE_ROUND: 'PRE_ROUND', // Time before prompts revealed (Host has not clicked 'start-round', so prompts are covered)
  ROUND_STARTED: 'ROUND_STARTED', // Time when round is going and users are playing
  SCORING: 'SCORING', // Time after round ends & host is scoring users. Moves from here back to pre round where prompts are covered
};
export const INITIAL_REDUCER_STATE = {
  timePerRound: 120, // TODO: maybe create config for defaults (this & prompt count/ round count)
  round: 0,
  gameStatus: GAME_STATUS.PRE_ROUND,
  currentLetter: '',
  answers: [], // array of answers (indexed by question number)
  // each index will have a map where each key is a socket id of a playing user
  // answer will be key= socket.id value={text: answer, username: user.username, earnedPoint: false}
};
