import { SET_ACTIVITIES } from '../constants/action-names';
import { AppState } from './';
import { IActivityAction } from '../types/activities';

export const activitiesReducer = (
  state: AppState = { payload: [], status: 'init' },
  action: IActivityAction
) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return action.payload;
    default:
      return state;
  }
};
