import { SET_LOGIN_TOKEN } from '../constants/action-names';
import { ILoginToken } from '../types/login';

export const setLoginToken = (token: string | null): ILoginToken => {
  return {
    type: SET_LOGIN_TOKEN,
    payload: token
  };
};
