import {
  LOADED_ACTIVITIES,
  LOADING_ACTIVITIES,
  INIT_ACTVIVITIES,
  ERROR_ACTIVITIES,
  LOAD_USER_ACTIVITIES
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

export type ActivityActionStatus = 'loading' | 'loaded' | 'error' | 'init';

type ActivityActionTypes =
  | typeof INIT_ACTVIVITIES
  | typeof LOADING_ACTIVITIES
  | typeof LOADED_ACTIVITIES
  | typeof ERROR_ACTIVITIES;

export interface IActivityActionPayload {
  status: ActivityActionStatus;
  data: IActivity[];
}

export interface IActivityAction {
  type: ActivityActionTypes;
  payload: IActivityActionPayload;
}

export interface IUserActivityAction {
  type: typeof LOAD_USER_ACTIVITIES;
  payload: IActivity[] | null;
}
