import { AppState } from '.';
import { IUserCreatedActivitiesAction } from '../types/activities';
import { LOAD_USER_CREATED_ACTIVITIES } from '../constants/action-names';

export const userCreatedActivitiesReducer = (
  state: AppState = [],
  action: IUserCreatedActivitiesAction
) => {
  if (action.type === LOAD_USER_CREATED_ACTIVITIES) {
    return action.payload;
  }
  return state;
};
