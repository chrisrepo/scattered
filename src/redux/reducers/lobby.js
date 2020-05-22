import { LOBBY_ACTIONS } from '../actions';

const initialState = {
  roomData: {
    Lobby: {},
    Charmander: {},
    Squirtle: {},
    Bulbasaur: {},
    Pikachu: {},
  }, // contains a map of roomId to user list
  roomId: 'Login', // Name of current room
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
        ...state,
        roomData: action.payload,
      });
    }
    case LOBBY_ACTIONS.CLEAR_DATA: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
