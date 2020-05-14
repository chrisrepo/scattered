// Action Constants

const actionPrefix = 'LOBBY/';

export const LOBBY_ACTIONS = {
  SET_ROOM: `${actionPrefix}SET_ROOM`,
  SET_ROOM_DATA: `${actionPrefix}SET_ROOM_DATA`,
};

// Action Functions

export const setRoom = (roomId) => ({
  type: LOBBY_ACTIONS.SET_ROOM,
  payload: roomId,
});

export const setRoomData = (roomData) => ({
  type: LOBBY_ACTIONS.SET_ROOM_DATA,
  payload: roomData,
});
