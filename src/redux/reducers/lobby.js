import { LOBBY_ACTIONS } from '../actions';

const initialState = {
  roomData: {}, // contains a map of roomId to user list
  roomId: 'Lobby', // Name of current room
};

export const lobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOBBY_ACTIONS.SET_ROOM: {
      return Object.assign({}, state, {
        roomId: action.payload,
      });
    }
    case LOBBY_ACTIONS.SET_ROOM_DATA: {
      return Object.assign({}, state, {
        roomData: action.payload,
      });
    }
    default: {
      return state;
    }
  }
};
