import { SET_LOGIN_TOKEN } from '../constants/action-names';
import { AppState } from '.';
import { ILoginToken } from '../types/login';

export const loginToken = (state: AppState = null, action: ILoginToken) => {
  switch (action.type) {
    case SET_LOGIN_TOKEN:
      return action.payload;
    default:
      return state;
  }
};
