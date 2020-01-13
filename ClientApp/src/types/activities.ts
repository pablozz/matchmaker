import {
  LOADED_ACTIVITIES,
  LOADING_ACTIVITIES,
  INIT_ACTVIVITIES,
  ERROR_ACTIVITIES,
  LOAD_USER_ACTIVITIES,
  LOAD_ACTIVITY,
  LOAD_USER_CREATED_ACTIVITIES
} from '../constants/action-names';

export interface IActivity {
  id: string;
  date: number;
  gender: string;
  price: number;
  numberOfParticipants: number;
  playground: string;
  playerLevel: number;
  category: string;
  admin: string;
  users: number;
}

export type ActivitiesActionStatus = 'loading' | 'loaded' | 'error' | 'init';

type ActivitiesActionTypes =
  | typeof INIT_ACTVIVITIES
  | typeof LOADING_ACTIVITIES
  | typeof LOADED_ACTIVITIES
  | typeof ERROR_ACTIVITIES;

export interface IActivitiesActionPayload {
  status: ActivitiesActionStatus;
  data: IActivity[];
}

export interface IActivitiesAction {
  type: ActivitiesActionTypes;
  payload: IActivitiesActionPayload;
}

export interface IUserActivitiesAction {
  type: typeof LOAD_USER_ACTIVITIES;
  payload: IActivity[] | null;
}

export interface IUserCreatedActivitiesAction {
  type: typeof LOAD_USER_CREATED_ACTIVITIES;
  payload: IActivity[] | null;
}

export interface IActivityAction {
  type: typeof LOAD_ACTIVITY;
  payload: IActivity;
}
