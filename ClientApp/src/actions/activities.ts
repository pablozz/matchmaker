import {
  INIT_ACTVIVITIES,
  LOADING_ACTIVITIES,
  LOADED_ACTIVITIES,
  LOAD_USER_ACTIVITIES
} from '../constants/action-names';
import { GET_ACTIVITIES_URL, GET_USER_ACTIVITIES_URL } from '../constants/urls';
import {
  IActivity,
  IActivityAction,
  IUserActivityAction
} from '../types/activities';

export const setInitActivities = (): IActivityAction => {
  return {
    type: INIT_ACTVIVITIES,
    payload: { status: 'init', data: [] }
  };
};

export const setLoadingActivities = (): IActivityAction => {
  return {
    type: LOADING_ACTIVITIES,
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
      type: LOADED_ACTIVITIES,
      payload: { status: 'loaded', data: fData }
    };
  } else {
    return {
      type: LOADED_ACTIVITIES,
      payload: { status: 'error', data: [] }
    };
  }
};

export const setUserActivities = async (
  loginToken: string
): Promise<IUserActivityAction> => {
  if (loginToken) {
    const userActivities: IActivity[] = await fetch(GET_USER_ACTIVITIES_URL, {
      headers: {
        Authorization: 'Bearer ' + loginToken
      }
    })
      .then(response => response.text())
      .then(data => {
        return generateActivities(JSON.parse(data));
      });
    if (userActivities) {
      return {
        type: LOAD_USER_ACTIVITIES,
        payload: userActivities
      };
    }
    return {
      type: LOAD_USER_ACTIVITIES,
      payload: []
    };
  }
  return {
    type: LOAD_USER_ACTIVITIES,
    payload: []
  };
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
