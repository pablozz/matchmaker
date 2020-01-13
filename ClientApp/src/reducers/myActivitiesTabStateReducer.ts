import { AppState } from '.';
import { setMyActivitiesTabStateAction } from '../types/controllers';
import { SET_MY_ACTIVITIES_TAB_STATE } from '../constants/action-names';

export const myActivitiesTabStateReducer = (
  state: AppState = 0,
  action: setMyActivitiesTabStateAction
) => {
  if (action.type === SET_MY_ACTIVITIES_TAB_STATE) {
    return action.payload;
  }
  return state;
};
