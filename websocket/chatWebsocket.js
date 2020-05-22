const { joinRoom, leaveRoom, sendUpdatesToRooms } = require('./roomUtil.js');

module.exports = function (io, socket, roomList, userList) {
  socket.on('on-chat', (data) => {
    const { roomId, username, message } = data;
    if (roomId) {
      io.in(roomId).emit('emit-chat', { username, message });
    }
  });

  socket.on('switch-room', (data) => {
    const { roomId, oldId } = data;
    if (oldId === roomId) {
      return;
    }
    // If old id exists (wont exist on initial join)
    if (oldId) {
      leaveRoom(oldId, roomList, socket);
    }
    if (roomId) {
      joinRoom(roomId, roomList, socket, userList);
    }
    // tell everyone in the lobby about the update no matter what (so the player counts update)
    sendUpdatesToRooms(io, roomId, oldId, roomList);
  });
};
