const GAME_STATUS = {
  PRE_ROUND: 'PRE_ROUND', // Time before prompts revealed (Host has not clicked 'start-round', so prompts are covered)
  ROUND_STARTED: 'ROUND_STARTED', // Time when round is going and users are playing
  SCORING: 'SCORING', // Time after round ends & host is scoring users. Moves from here back to pre round where prompts are covered
};

module.exports = { GAME_STATUS };
