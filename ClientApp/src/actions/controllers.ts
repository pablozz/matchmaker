import { SET_MY_ACTIVITIES_TAB_STATE } from '../constants/action-names';

export const setMyActivitiesTabState = (
  state: React.SetStateAction<number>
) => {
  return {
    type: SET_MY_ACTIVITIES_TAB_STATE,
    payload: state
  };
};
