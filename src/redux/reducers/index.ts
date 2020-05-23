import { combineReducers } from 'redux';
import { scatterReducer } from './scattergories';
import { websocketReducer } from './websocket';
import { userReducer } from './user';
import { lobbyReducer } from './lobby';
import { flowReducer } from './gameFlow';
export const rootReducer = combineReducers({
  game: scatterReducer,
  connection: websocketReducer,
  user: userReducer,
  lobby: lobbyReducer,
  gameFlow: flowReducer,
});
