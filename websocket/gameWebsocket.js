module.exports = function (io, socket, x, y) {
  socket.on('host-start-game', (data) => {
    // host started game, send start to everyone (including host)
  });

  socket.on('paint-entered-game', (data) => {});

  socket.on('paint-word-picked', (data) => {});

  socket.on('on-paint', (data) => {});

  socket.on('paint-guess-word', (data) => {});
};
