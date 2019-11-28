import * as actions from '../constants/action-names';
import { GET_ACTIVITIES_URL } from '../constants/urls';
import { IActivity, IActivityAction } from '../types/activities';

export const setInitActivities = (): IActivityAction => {
  return {
    type: actions.INIT_ACTVIVITIES,
    payload: { status: 'init', data: [] }
  };
};

export const setLoadingActivities = (): IActivityAction => {
  return {
    type: actions.LOADING_ACTIVITIES,
    payload: { status: 'loading', data: [] }
  };
};

export const setLoadedOrErrorActivities = async (): Promise<IActivityAction> => {
  const fData: IActivity[] | null = await fetch(GET_ACTIVITIES_URL)
    .then(response => response.json())
    .then(data => {
      return generateActivities(data);
    })
    .catch(() => {
      return null;
    });
  if (fData) {
    return {
      type: actions.LOADED_ACTIVITIES,
      payload: { status: 'loaded', data: fData }
    };
  } else {
    return {
      type: actions.LOADED_ACTIVITIES,
      payload: { status: 'error', data: [] }
    };
  }
};

//not an action
const generateActivities = (data: IActivity[]) => {
  const generatedActivities: IActivity[] = data.map((item: IActivity) => {
    return {
      id: item.id,
      date: item.date,
      gender: item.gender,
      price: item.price,
      numberOfParticipants: item.numberOfParticipants,
      playground: item.playground,
      playerLevel: item.playerLevel,
      category: item.category,
      admin: item.admin,
      users: item.users
    };
  });
  return generatedActivities;
};
