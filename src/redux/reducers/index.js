import { combineReducers } from 'redux';
import { scatterReducer } from './scattergories';

export const rootReducer = combineReducers({
  game: scatterReducer,
});
