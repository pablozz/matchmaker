import { combineReducers, Reducer } from 'redux';
import { activitiesReducer } from './activitiesReducer';

export const rootReducer: Reducer = combineReducers({
  activities: activitiesReducer
});

export type AppState = ReturnType<typeof rootReducer>;
