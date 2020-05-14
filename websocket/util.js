function getRoomUsers(roomObj, userList) {
  const roomUsers = {};
  Object.keys(roomObj.users).forEach((userId) => {
    roomUsers[userId] = userList[userId];
  });
  return roomUsers;
}

function getRoomData(room, userList) {
  return getRoomUsers(room, userList);
}

function updateHost(roomList, roomId) {
  let users = roomList[roomId].users;
  let userKeys = Object.keys(users);
  if (userKeys.length === 0) {
    // remove host
    roomList[roomId].host = null;
  } else if (userKeys.length === 1) {
    // First to join is the host
    roomList[roomId].host = userKeys[0];
  }
  // Otherwise don't update
}
module.exports = { getRoomUsers, getRoomData, updateHost };
