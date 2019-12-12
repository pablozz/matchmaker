import { combineReducers, Reducer } from 'redux';
import { activitiesReducer } from './activitiesReducer';
import { userActivitiesReducer } from './userActivitiesReducer';

export const rootReducer: Reducer = combineReducers({
  activities: activitiesReducer,
  userActivities: userActivitiesReducer
});

export type AppState = ReturnType<typeof rootReducer>;
