function getRoomUsers(roomObj, userList) {
  const roomUsers = {};
  Object.keys(roomObj.users).forEach((userId) => {
    roomUsers[userId] = userList[userId];
  });
  return roomUsers;
}

function getRoomData(rooms, userList) {
  const roomCounts = {};
  Object.keys(rooms).forEach((roomId) => {
    roomCounts[roomId] = getRoomUsers(rooms[roomId], userList);
  });
  return roomCounts;
}

module.exports = { getRoomUsers, getRoomData };
