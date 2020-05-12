import { combineReducers } from 'redux';
import { scatterReducer } from './scattergories';
import { websocketReducer } from './websocket';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  game: scatterReducer,
  connection: websocketReducer,
  user: userReducer,
});
