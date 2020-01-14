import {
  INIT_ACTIVITIES,
  LOADING_ACTIVITIES,
  LOADED_ACTIVITIES,
  ERROR_ACTIVITIES
} from '../constants/action-names';
import { AppState } from '.';
import { IActivitiesAction } from '../types/activities';

export const activitiesReducer = (
  state: AppState = { payload: [], status: 'init' },
  action: IActivitiesAction
) => {
  switch (action.type) {
    case INIT_ACTIVITIES:
      return action.payload;
    case LOADING_ACTIVITIES:
      return action.payload;
    case LOADED_ACTIVITIES:
      return action.payload;
    case ERROR_ACTIVITIES:
      return action.payload;
    default:
      return state;
  }
};
