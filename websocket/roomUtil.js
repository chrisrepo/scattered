const utils = require('./util.js');

function leaveRoom(oldId, roomList, socket) {
  socket.leave(oldId);
  delete roomList[oldId].users[socket.id];
  utils.updateHost(roomList, oldId, socket.id);
}

function joinRoom(roomId, roomList, socket, userList) {
  socket.join(roomId);
  roomList[roomId].users[socket.id] = {
    id: socket.id,
    username: userList[socket.id].username,
  };
  utils.updateHost(roomList, roomId);
}

function sendUpdatesToRooms(io, roomId, oldId, roomList) {
  // tell everyone in the lobby about the update no matter what (so the player counts update)
  io.in('Lobby').emit('update-room', { roomData: roomList });
  if (roomId !== 'Lobby') {
    // then tell everyone in the specific room if its not the lobby
    io.in(roomId).emit('update-room', { roomData: roomList });
  }
  if (oldId && oldId !== 'Lobby') {
    // then tell everyone in the old room about the user leaving
    io.in(oldId).emit('update-room', { roomData: roomList });
  }
}

module.exports = { joinRoom, leaveRoom, sendUpdatesToRooms };
