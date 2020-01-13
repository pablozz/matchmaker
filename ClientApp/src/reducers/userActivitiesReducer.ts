import { LOAD_USER_ACTIVITIES } from '../constants/action-names';
import { AppState } from '.';
import { IUserActivitiesAction } from '../types/activities';

export const userActivitiesReducer = (
  state: AppState = [],
  action: IUserActivitiesAction
) => {
  if (action.type === LOAD_USER_ACTIVITIES) {
    return action.payload;
  }
  return state;
};
