import { combineReducers, Reducer } from 'redux';
import { activitiesReducer } from './activitiesReducer';
import { userActivitiesReducer } from './userActivitiesReducer';
import { activityReducer } from './activityReducer';
import { userCreatedActivitiesReducer } from './userCreatedActivitiesReducer';
import { myActivitiesTabStateReducer } from './myActivitiesTabStateReducer';

export const rootReducer: Reducer = combineReducers({
  activities: activitiesReducer,
  userActivities: userActivitiesReducer,
  activity: activityReducer,
  userCreatedActivities: userCreatedActivitiesReducer,
  myActivitiesTabState: myActivitiesTabStateReducer
});

export type AppState = ReturnType<typeof rootReducer>;
