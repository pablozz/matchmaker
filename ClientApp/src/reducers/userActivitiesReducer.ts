import { LOAD_USER_REGISTERED_ACTIVITIES } from '../constants/action-names';
import { AppState } from '.';
import { IUserRegisteredActivitiesAction } from '../types/activities';

export const userActivitiesReducer = (
  state: AppState = [],
  action: IUserRegisteredActivitiesAction
) => {
  if (action.type === LOAD_USER_REGISTERED_ACTIVITIES) {
    return action.payload;
  }
  return state;
};
