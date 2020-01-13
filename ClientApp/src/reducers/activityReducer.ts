import { AppState } from '.';
import { IActivityAction } from '../types/activities';
import { LOAD_ACTIVITY } from '../constants/action-names';

export const activityReducer = (
  state: AppState = { payload: {} },
  action: IActivityAction
) => {
  if (action.type === LOAD_ACTIVITY) {
    return action.payload;
  }
  return state;
};
