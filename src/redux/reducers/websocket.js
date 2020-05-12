import { WEBSOCKET_ACTIONS } from '../actions';

export const websocketReducer = (state = null, action) => {
  switch (action.type) {
    case WEBSOCKET_ACTIONS.CONNECT: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
