module.exports = function (io, socket) {
  socket.on('on-chat', (data) => {
    const { roomId, username, message } = data;
    // host started game, send start to everyone (including host)
    io.in(roomId).emit('emit-chat', { username, message });
  });
};
