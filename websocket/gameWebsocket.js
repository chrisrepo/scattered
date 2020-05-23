const { GAME_STATUS } = require('../src/constants/gameFlow');
const LETTERS = require('../src/constants/letters');
const {
  getLetter,
  resetGame,
  setNewRound,
  checkAndRemovePlayerFromRound,
  removePlayerFromGame,
  generateScoreboard,
  addPlayerToGame,
} = require('./gameUtil');

let guessTimeout;
function startRoundTimer(io, lobby, game, roomId) {
  io.in(roomId).emit('emit-start-round', game);
  console.log('starting round timer : ', +game.timePerRound + ' seconds');
  initiateTimeLeftInterval(game.timePerRound);
  guessTimeout = setTimeout(() => {
    endRound(io, lobby, game, roomId);
  }, game.timePerRound * 1000);
}

function endRound(io, lobby, game, roomId) {
  clearTimeout(guessTimeout);
  clearInterval(remainingTimeInterval);
  game.gameStatus = GAME_STATUS.SCORING;
  io.in(roomId).emit('emit-end-round', { gameStatus: game.gameStatus });
  console.log('END ROUND in room: ', roomId);
}

let remainingTimeInterval;
let remainingTime = 0;
function initiateTimeLeftInterval(roundTime) {
  remainingTime = roundTime;
  remainingTimeInterval = setInterval(() => {
    if (remainingTime === 0) {
      clearInterval(remainingTimeInterval);
    }
    remainingTime--;
  }, 1000);
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
    if (!roomList[roomId].started) {
      roomList[roomId].started = true;
      // This will move clients to the game view
      io.in('Lobby').emit('update-room', { roomData: roomList });
      io.in(roomId).emit('update-room', { roomData: roomList });

      setNewRound(gameList[roomId]);
      gameList[roomId].players = { ...roomList[roomId].users };
      gameList[roomId].scoreboard = generateScoreboard(
        gameList[roomId].players
      );
      io.in(roomId).emit('emit-start-game', {
        letter: gameList[roomId].letter,
        prompts: gameList[roomId].prompts,
        status: gameList[roomId].gameStatus,
        scoreboard: gameList[roomId].scoreboard,
      });
    }
  });

  socket.on('join-game', (data) => {
    let { roomId } = data;
    if (!roomList[roomId].started) {
      // cant rejoin a not started game
      socket.emit('join-game-failure', roomId);
    } else {
      console.log('joining game in room: ', roomId);
      // If it's in progress, we don't want to allow the user to be able to enter stuff
      const inProgress =
        gameList[roomId].gameStatus === GAME_STATUS.ROUND_STARTED;
      // TODO: Does it matter if the game is in progress, if a user joins late, they can just send in no answer
      addPlayerToGame(gameList[roomId], roomList[roomId], socket.id);
      // TODO: CLEAN THIS UP. We can fold it all into one by just passing gameList & inProgress. Client side can handle destructuring cleanly w/typescript
      const body = {
        letter: gameList[roomId].letter,
        prompts: gameList[roomId].prompts,
        status: gameList[roomId].gameStatus,
        answers: gameList[roomId].answers,
        promptInd: gameList[roomId].promptInd,
        scoreboard: gameList[roomId].scoreboard,
        inProgress,
        remainingTime,
      };
      socket.emit('join-game-success', body);
    }
  });

  socket.on('host-start-round', (data) => {
    let { roomId } = data;
    console.log('host start round', roomId);
    if (gameList[roomId].gameStatus !== GAME_STATUS.ROUND_STARTED) {
      gameList[roomId].gameStatus = GAME_STATUS.ROUND_STARTED;
      // TODO: Remove any players who left the game??
      gameList[roomId].players = { ...roomList[roomId].users }; // Set list of players to look for when turning in answers (wont count users who join in progress)
      gameList[roomId].answers = {};
      // Start timer and game loop
      startRoundTimer(io, roomList, gameList[roomId], roomId);
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
    setNewRound(gameList[roomId]);
    io.in(roomId).emit('emit-end-scoring', {
      letter: gameList[roomId].letter,
      prompts: gameList[roomId].prompts,
      status: gameList[roomId].gameStatus,
    });
  });

  socket.on('host-switch-prompt', (data) => {
    let { roomId, promptInd } = data;
    gameList[roomId].promptInd = promptInd;
    io.in(roomId).emit('emit-switch-prompt', { promptInd });
  });

  socket.on('host-change-answer-score', (data) => {
    let { roomId, promptInd, userId, earnedPoint } = data;
    gameList[roomId].answers[userId][promptInd].earnedPoint = earnedPoint;
    gameList[roomId].scoreboard[userId].score += earnedPoint ? 1 : -1;
    io.in(roomId).emit('emit-change-answer-score', {
      promptInd,
      userId,
      earnedPoint,
      scoreboard: gameList[roomId].scoreboard,
    });
  });

  socket.on('host-change-letter', (data) => {
    let { roomId, curLetter } = data;
    const newLetter = getLetter(LETTERS, curLetter);
    io.in(roomId).emit('emit-change-letter', { letter: newLetter });
  });

  socket.on('user-turn-in-answers', (data) => {
    let { answers, roomId } = data;
    // Take the raw answers from the user and build an object that can contain answers and their scores
    gameList[roomId].answers[socket.id] = buildUserAnswers(
      answers,
      socket.id,
      userList
    );

    // Removes player from 'players' list in the game & returns true if it's the last player
    //   The player list will be refreshed next round start, so this allows us to know when everyone
    //    has turned in their answsers (and it's dynamic per round)
    const lastPlayer = checkAndRemovePlayerFromRound(
      gameList,
      roomId,
      socket.id
    );
    // Start scoring once all player clients have submitted their scores
    if (lastPlayer) {
      gameList[roomId].gameStatus = GAME_STATUS.SCORING;
      io.in(roomId).emit('emit-begin-scoring', { gameData: gameList[roomId] });
    }
  });

  // Called before socket actually disconnects from everything
  socket.on('disconnecting', () => {
    let rooms = userList[socket.id];
    // Loop thru rooms deleting socket id
    removePlayerFromGame(rooms, gameList, socket.id);
    rooms.forEach((key) => {
      if (gameList[key]) {
        if (Object.keys(roomList[key].users).length === 0) {
          // Last user left, reset all game data
          console.log('all users left game - resetting data');
          resetGame(gameList, key);
          // After this, websocket.js will handle removal of user from rooms
        }
        // Update the room with the new scoreboard
        const body = {
          answers: gameList[key].answers,
          scoreboard: gameList[key].scoreboard,
        };
        console.log('io update game in: ', key);
        io.in(key).emit('update-game', body);
      }
    });
  });
};
