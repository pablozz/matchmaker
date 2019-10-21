import * as actions from '../constants/action-names';

export interface IFetchedActivity {
  activityId: string;
  date: string;
  gender: string;
  price: number;
  numberOfParticipants: number;
  playgroundId: string;
  categoryId: string;
  adminId: string;
  users: number;
}

export interface IActivity {
  id: string;
  date: string;
  gender: string;
  price: number;
  numberOfParticipants: number;
  playground: string;
  category: string;
  admin: string;
  users: number;
}

export type ActivityActionStatus = 'loading' | 'loaded' | 'error' | 'init';

export interface IActivityActionPayload {
  status: ActivityActionStatus;
  payload: IActivity[];
}

export interface IActivityAction {
  type: typeof actions.SET_ACTIVITIES;
  payload: IActivityActionPayload;
}
