import { ActivityActionTypes } from '../constants/action-names';

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

export interface IActivityActionPayload {
  status: ActivityActionStatus;
  payload: IActivity[];
}

export interface IActivityAction {
  type: ActivityActionTypes;
  payload: IActivityActionPayload;
}
