const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const utils = require('./websocket/util.js');
const { joinRoom, sendUpdatesToRooms } = require('./websocket/roomUtil.js');
const { CREATE_INITIAL_GAME_CONFIG } = require('./src/constants/gameFlow');
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
  Charmander: CREATE_INITIAL_GAME_CONFIG(),
  Squirtle: CREATE_INITIAL_GAME_CONFIG(),
  Bulbasaur: CREATE_INITIAL_GAME_CONFIG(),
  Pikachu: CREATE_INITIAL_GAME_CONFIG(),
};

var userList = {};
//Setting up a socket with the namespace "connection" for new sockets
io.on('connection', (socket) => {
  socket.on('log-in', (data) => {
    let { username, rejoin, emoji } = data;
    userList[socket.id] = {
      id: socket.id,
      emoji,
      username,
    };
    //TODO:  We may need to pass back more data depending on where the user is rejoining from
    if (rejoin) {
      // Rejoin room for chat.
      joinRoom(rejoin, roomList, socket, userList);
      sendUpdatesToRooms(io, rejoin, undefined, roomList);
      socket.emit('rejoin-success', { roomId: rejoin });
    } else {
      io.to(socket.id).emit('log-in-success');
    }
  });

  socket.on('join-lobby', (data) => {
    socket.join('Lobby');
    let { username } = data;
    // Add user to lobby
    roomList.Lobby.users[socket.id] = { id: socket.id, username };
    let roomId = 'Lobby';
    io.in(roomId).emit('emit-join-lobby', {
      roomId,
      roomData: roomList,
    });
  });

  // Called before socket actually disconnects from everything
  socket.on('disconnecting', () => {
    userList[socket.id] = [];
    Object.keys(roomList).forEach((key) => {
      if (roomList[key].users[socket.id]) {
        delete roomList[key].users[socket.id];
        userList[socket.id].push(key); // track rooms we are leaving for other disconnect funcs
        utils.updateHost(roomList, key, socket.id);
        io.in(key).emit('update-room', { roomData: roomList });
      }
    });
    io.in('Lobby').emit('update-room', { roomData: roomList });
  });

  // Called after socket disconnects from everything
  socket.on('disconnect', () => {
    // Finally remove user from userlist
    delete userList[socket.id];
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
server.listen(port, () => console.log(`Listening on port ${port}`));
