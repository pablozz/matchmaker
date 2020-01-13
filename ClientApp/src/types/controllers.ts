import { SET_MY_ACTIVITIES_TAB_STATE } from '../constants/action-names';

export interface setMyActivitiesTabStateAction {
  type: typeof SET_MY_ACTIVITIES_TAB_STATE;
  payload: number;
}
