import { LOAD_USER_ACTIVITIES } from '../constants/action-names';
import { AppState } from '.';
import { IUserActivityAction } from '../types/activities';

export const userActivitiesReducer = (
  state: AppState = [],
  action: IUserActivityAction
) => {
  switch (action.type) {
    case LOAD_USER_ACTIVITIES:
      return action.payload;
    default:
      return state;
  }
};
