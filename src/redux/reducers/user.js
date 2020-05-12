import { USER_ACTIONS } from '../actions';

const initialState = {
  username: '',
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER: {
      return Object.assign({}, state, {
        username: action.payload,
      });
    }
    default: {
      return state;
    }
  }
};
