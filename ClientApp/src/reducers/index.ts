import { combineReducers, Reducer } from 'redux';
import { activitiesReducer } from './activitiesReducer';
import { loginToken } from './loginToken';

export const rootReducer: Reducer = combineReducers({
  activities: activitiesReducer,
  loginToken: loginToken
});

export type AppState = ReturnType<typeof rootReducer>;
