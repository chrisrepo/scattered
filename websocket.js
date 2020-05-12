const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const utils = require('./websocket/util.js');

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
var roomList = {
  Lobby: {
    users: {},
  },
  Charmander: {
    users: {},
  },
  Squirtle: {
    users: {},
  },
  Bulbasaur: {
    users: {},
  },
  Pikachu: {
    users: {},
  },
};
var userList = {};
//Setting up a socket with the namespace "connection" for new sockets
io.on('connection', (socket) => {
  socket.on('join-lobby', (data) => {
    socket.join('lobby');
    let { username } = data;
    // Add user to lobby
    roomList.Lobby.users[socket.id] = { id: socket.id };
    // Create user entry in main container
    userList[socket.id] = {
      id: socket.id,
      username,
    };
    io.in('lobby').emit('emit-join-lobby', {
      roomId: 'Lobby',
      roomData: utils.getRoomData(roomList, userList),
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
  require('./websocket/chatWebsocket.js')(io, socket);
  // Game logic
  //require('./websocket/gameWebsocket.js')(io, socket, roomList, userList);
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
