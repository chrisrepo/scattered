const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const utils = require('./websocket/util.js');
const { GAME_STATUS } = require('./websocket/constants');
const port = process.env.PORT || 3001;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

// Websocket vars
// Tracks who's in each room & who the host is
var roomList = {
  Lobby: {
    users: {},
  },
  Charmander: {
    users: {},
    started: false,
  },
  Squirtle: {
    users: {},
    started: false,
  },
  Bulbasaur: {
    users: {},
    started: false,
  },
  Pikachu: {
    users: {},
    started: false,
  },
};
// Second tracking var just for games
var gameList = {
  Charmander: {
    timePerRound: 120, // TODO: maybe create config for defaults (this & prompt count/ round count)
    round: 0,
    gameStatus: GAME_STATUS.PRE_ROUND,
    answers: [], // array of answers (indexed by question number)
    // each index will have a map where each key is a socket id of a playing user
    // answer will be key= socket.id value={text: answer, username: user.username, earnedPoint: false}
  },
  Squirtle: {
    timePerRound: 120,
    round: 0,
    gameStatus: GAME_STATUS.PRE_ROUND,
    answers: [],
  },
  Bulbasaur: {
    timePerRound: 120,
    round: 0,
    gameStatus: GAME_STATUS.PRE_ROUND,
    answers: [],
  },
  Pikachu: {
    timePerRound: 120,
    round: 0,
    gameStatus: GAME_STATUS.PRE_ROUND,
    answers: [],
  },
};

var userList = {};
//Setting up a socket with the namespace "connection" for new sockets
io.on('connection', (socket) => {
  socket.on('join-lobby', (data) => {
    socket.join('Lobby');
    let { username } = data;
    // Add user to lobby
    roomList.Lobby.users[socket.id] = { id: socket.id, username };
    // Create user entry in main container
    userList[socket.id] = {
      id: socket.id,
      username,
    };
    let roomId = 'Lobby';
    io.in(roomId).emit('emit-join-lobby', {
      roomId,
      roomData: roomList,
    });
  });

  // Called before socket actually disconnects from everything
  socket.on('disconnecting', () => {});

  // Called after socket disconnects from everything
  socket.on('disconnect', () => {
    delete userList[socket.id];
    // Loop thru rooms deleting socket id
    Object.keys(roomList).forEach((key) => {
      delete roomList[key].users[socket.id];
    });
  });

  // Chat Logic
  require('./websocket/chatWebsocket.js')(io, socket, roomList, userList);
  // Game logic
  require('./websocket/gameWebsocket.js')(
    io,
    socket,
    roomList,
    userList,
    gameList
  );
});
/*
function setupAuthoritativePhaser() {
  JSDOM.fromFile(path.join(__dirname, 'gameServers/pongServer/index.html'), {
    runScripts: 'dangerously', // To run the scripts in the html file
    resources: 'usable', // Also load supported external resources
    pretendToBeVisual: true, // So requestAnimatinFrame events fire
  })
    .then((dom) => {
      dom.window.URL.createObjectURL = (blob) => {
        if (blob) {
          return datauri.format(
            blob.type,
            blob[Object.getOwnPropertySymbols(blob)[0]]._buffer
          ).content;
        }
      };
      dom.window.URL.revokeObjectURL = (objectURL) => {};
      dom.window.gameLoaded = () => {
        console.log('Serverside Pong Game Loaded');
      };
      dom.window.io = io;
    })
    .catch((error) => {
      console.log(error.message);
    });
}*/
//setupAuthoritativePhaser(); Dont do pong stuff rn
server.listen(port, () => console.log(`Listening on port ${port}`));
