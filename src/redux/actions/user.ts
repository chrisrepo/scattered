import { UserActionTypes } from './types';

// Action Functions

export interface SetUserAction {
  type: typeof UserActionTypes.setUser;
  payload: SetUserData;
}
export const setUser = (userData: SetUserData): SetUserAction => ({
  type: UserActionTypes.setUser,
  payload: userData,
});

// Object Interfaces

export interface SetUserData {
  username: string;
  emoji: string;
}
