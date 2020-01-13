import {
  INIT_ACTVIVITIES,
  LOAD_ACTIVITY,
  LOAD_USER_ACTIVITIES,
  LOADED_ACTIVITIES,
  LOADING_ACTIVITIES,
  LOAD_USER_CREATED_ACTIVITIES
} from '../constants/action-names';
import {
  ACTIVITIES_URL,
  GET_USER_ACTIVITIES_URL,
  GET_USER_CREATED_ACTIVITIES_URL
} from '../constants/urls';
import {
  IActivitiesAction,
  IActivity,
  IActivityAction,
  IUserActivitiesAction,
  IUserCreatedActivitiesAction
} from '../types/activities';

export const setInitActivities = (): IActivitiesAction => {
  return {
    type: INIT_ACTVIVITIES,
    payload: { status: 'init', data: [] }
  };
};

export const setLoadingActivities = (): IActivitiesAction => {
  return {
    type: LOADING_ACTIVITIES,
    payload: { status: 'loading', data: [] }
  };
};

export const setLoadedOrErrorActivities = async (): Promise<
  IActivitiesAction
> => {
  const fData: IActivity[] | null = await fetch(ACTIVITIES_URL)
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
): Promise<IUserActivitiesAction> => {
  if (loginToken) {
    const userCreatedActivities: IActivity[] = await fetch(
      GET_USER_ACTIVITIES_URL,
      {
        headers: {
          Authorization: 'Bearer ' + loginToken
        }
      }
    )
      .then(response => response.text())
      .then(data => {
        return generateActivities(JSON.parse(data));
      });
    if (userCreatedActivities.length) {
      return {
        type: LOAD_USER_ACTIVITIES,
        payload: userCreatedActivities
      };
    }
    return {
      type: LOAD_USER_ACTIVITIES,
      payload: null
    };
  }
  return {
    type: LOAD_USER_ACTIVITIES,
    payload: null
  };
};

export const setActivity = (activity: IActivity): IActivityAction => {
  return {
    type: LOAD_ACTIVITY,
    payload: activity
  };
};

export const setUserCreatedActivities = async (
  loginToken: string
): Promise<IUserCreatedActivitiesAction> => {
  if (loginToken) {
    const userActivities: IActivity[] = await fetch(
      GET_USER_CREATED_ACTIVITIES_URL,
      {
        headers: {
          Authorization: 'Bearer ' + loginToken
        }
      }
    )
      .then(response => response.text())
      .then(data => {
        return generateActivities(JSON.parse(data));
      });
    if (userActivities.length) {
      return {
        type: LOAD_USER_CREATED_ACTIVITIES,
        payload: userActivities
      };
    }
    return {
      type: LOAD_USER_CREATED_ACTIVITIES,
      payload: null
    };
  }
  return {
    type: LOAD_USER_CREATED_ACTIVITIES,
    payload: null
  };
};

//not an action
const generateActivities = (data: IActivity[]) => {
  return data.map((item: IActivity) => {
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
};
