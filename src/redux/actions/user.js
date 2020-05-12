// Action Constants

const actionPrefix = 'USER/';

export const USER_ACTIONS = {
  SET_USER: `${actionPrefix}SET_USER`,
};

// Action Functions

export const setUsername = (username) => ({
  type: USER_ACTIONS.SET_USER,
  payload: username,
});
