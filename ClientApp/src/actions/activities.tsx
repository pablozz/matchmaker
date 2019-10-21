import * as actions from '../constants/action-names';
import { IActivityActionPayload, IActivityAction } from '../types/activities';

export const fetchActivities = (
  data: IActivityActionPayload
): IActivityAction => {
  return {
    type: actions.SET_ACTIVITIES,
    payload: data
  };
};
