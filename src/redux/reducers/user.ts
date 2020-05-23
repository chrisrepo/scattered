import { UserActionTypes } from '../actions/types';
import { SetUserAction } from '../actions';

export interface UserState {
  username: string;
  emoji: string;
}
const initialState = {
  username: '',
  emoji: '',
};
export const userReducer = (
  state: UserState = initialState,
  action: SetUserAction
) => {
  switch (action.type) {
    case UserActionTypes.setUser: {
      return Object.assign({}, state, {
        username: action.payload.username,
        emoji: action.payload.emoji,
      });
    }
    default: {
      return state;
    }
  }
};
