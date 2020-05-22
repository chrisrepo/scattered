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

function updateHost(roomList, roomId, leavingId) {
  let users = roomList[roomId].users;
  let userKeys = Object.keys(users);
  if (userKeys.length === 0) {
    // remove host
    roomList[roomId].started = false;
    roomList[roomId].host = null;
    console.log('all users left room - resetting roomList data');
  } else if (userKeys.length === 1) {
    // First to join is the host
    roomList[roomId].host = userKeys[0];
  } else if (roomList[roomId].host === leavingId) {
    roomList[roomId].host = userKeys[0];
  }
  // Otherwise don't update
}

module.exports = { getRoomUsers, getRoomData, updateHost };
