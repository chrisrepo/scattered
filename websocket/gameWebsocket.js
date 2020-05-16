const { GAME_STATUS } = require('./constants');
const { getLetter } = require('./gameUtil');
const LETTERS = require('../src/constants/letters');
const PROMPTS = require('../src/constants/categories');

let guessTimeout;
function startRoundTimer(io, lobby, game, roomId) {
  //io.in(roomId).emit('emit-paint-start-timer');
  io.in(roomId).emit('emit-start-round');
  guessTimeout = setTimeout(() => {
    endRound(io, lobby, roomId);
  }, game.timePerRound * 1000);
}

function endRound(io, lobby, game, roomId) {
  clearTimeout(guessTimeout);
  game[roomId].gameStatus = GAME_STATUS.SCORING;
  io.in(roomId).emit('emit-end-round');
}

function buildUserAnswers(answers, socketId, userList) {
  const username = userList[socketId].username;
  const outputAns = answers.map((answer) => {
    return {
      text: answer,
      username,
      earnedPoint: false,
    };
  });
  return outputAns;
}

module.exports = function (io, socket, roomList, userList, gameList) {
  socket.on('host-start-game', (data) => {
    // host started game, send start to everyone (including host)
    let { roomId } = data;
    if (roomList[roomId].started) {
      // Only talk to this socket since they are joining in progress
      io.to(socket.id).emit('emit-start-game');
    } else {
      roomList[roomId].started = true;
      console.log('game started by host in room: ', roomId);
      // This will move clients to the game view
      io.in('Lobby').emit('update-room', { roomData: roomList });
      io.in(roomId).emit('update-room', { roomData: roomList });
      io.in(roomId).emit('emit-start-game');
    }
  });

  socket.on('host-start-round', (data) => {
    let { roomId } = data;
    if (gameList[roomId].gameStatus !== GAME_STATUS.ROUND_STARTED) {
      // increment round # in game
      gameList[roomId].gameStatus = GAME_STATUS.ROUND_STARTED;
      gameList[roomId].round += 1; // Round starts at 0 when game started
      gameList[roomId].playerCount = Object.keys(roomList[roomId].users).length; // Set player count to look for when turning in answers
      // Round # will correspond to answers[] where round - 1  = the index for that round

      // Start timer and game loop
      startRoundTimer(io, roomList, gameList, roomId);
    }
  });

  socket.on('host-end-round', (data) => {
    let { roomId } = data;
    if (gameList[roomId].gameStatus !== GAME_STATUS.SCORING) {
      endRound(io, roomList, gameList, roomId);
    }
  });

  socket.on('host-end-scoring', (data) => {
    let { roomId } = data;
    // Go back to pre round
    gameList[roomId].gameStatus = GAME_STATUS.PRE_ROUND;
    //TODO: Get next letter and send that with EMIT
    io.in(roomId).emit('emit-end-scoring');
  });

  socket.on('host-change-letter', (data) => {
    let { roomId, curLetter } = data;
    //TODO: Get new letter and emit it
    const newLetter = getLetter(LETTERS, curLetter);
    console.log('change letter in room', roomId, newLetter);
    io.in(roomId).emit('emit-change-letter', { letter: newLetter });
  });

  socket.on('user-turn-in-answers', (data) => {
    let { id, answers, roomId } = data;
    let roundInd = gameList[roomId].round - 1;
    gameList[roomId].answers[roundInd][id] = buildUserAnswers(
      answers,
      socket.id,
      userList
    );
    const len1 = Object.keys(gameList[roomId].answers[roundInd]).length;
    if (len1 === gameList[roomId].playerCount) {
      // Start scoring once all player clients have submitted their scores
      io.in(roomId).emit('emit-being-scoring', { gameData: gameList[roomId] });
    }
  });

  socket.on('on-paint', (data) => {});

  socket.on('paint-guess-word', (data) => {});
};
