module.exports = function (io, socket) {
  socket.on('on-chat', (data) => {
    const { roomId, username, message } = data;
    console.log('send chat', data);
    if (roomId) {
      io.in(roomId).emit('emit-chat', { username, message });
    }
  });

  socket.on('switch-room', (data) => {
    const { roomId, oldId } = data;
    socket.leave(oldId);
    socket.join(roomId);
  });
};
