import {
  LOADED_ACTIVITIES,
  LOADING_ACTIVITIES,
  INIT_ACTIVITIES,
  ERROR_ACTIVITIES,
  LOAD_USER_REGISTERED_ACTIVITIES,
  LOAD_ACTIVITY,
  LOAD_USER_CREATED_ACTIVITIES,
  ActivitiesActionStatus
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

type ActivitiesActionTypes =
  | typeof INIT_ACTIVITIES
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

export interface IUserRegisteredActivitiesAction {
  type: typeof LOAD_USER_REGISTERED_ACTIVITIES;
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
