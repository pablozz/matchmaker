import {
  INIT_ACTVIVITIES,
  LOADING_ACTIVITIES,
  LOADED_ACTIVITIES,
  ERROR_ACTIVITIES
} from '../constants/action-names';
import { AppState } from '.';
import { IActivityAction } from '../types/activities';

export const activitiesReducer = (
  state: AppState = { payload: [], status: 'init' },
  action: IActivityAction
) => {
  switch (action.type) {
    case INIT_ACTVIVITIES:
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
