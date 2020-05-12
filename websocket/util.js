function getRoomUsers(roomObj, userList) {
  const roomUsers = {};
  Object.keys(roomObj.users).forEach((userId) => {
    roomUsers[userId] = userList[userId];
  });
  return roomUsers;
}

function getRoomCounts(rooms) {
  const roomCounts = {};
  Object.keys(rooms).forEach((roomId) => {
    roomCounts[roomId] = Object.keys(rooms[roomId].users).length;
  });
  return roomCounts;
}

module.exports = { getRoomUsers };
