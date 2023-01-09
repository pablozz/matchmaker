import React, { Fragment } from 'react';
import { AppState } from '../../../../reducers';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  IActivity,
  IActivitiesActionPayload
} from '../../../../types/activities';
import { useSelector } from 'react-redux';
import { ActivityCard } from './ActivityCard';
import { Typography } from '@material-ui/core';
import { AddActivity } from './AddActivity';
import { useCookies } from 'react-cookie';
import {
  getYear,
  getMonth,
  getDay,
  getMonthDayString
} from '../../../../scripts/datetime-formats';

interface ICardsDisplayProps {
  activities: IActivitiesActionPayload;
}

export const ActivityCardsDisplay: React.FC<ICardsDisplayProps> = props => {
  const activities: IActivitiesActionPayload = props.activities;

  const userActivities: IActivity[] = useSelector(
    (state: AppState) => state.userActivities
  );

  const [cookie] = useCookies(['user']);

  let previousDate: number = 0;

  let dates: number[] = [];
  if (activities.data) {
    dates = activities.data
      .filter((activity: IActivity) => {
        const isNew: boolean =
          getYear(activity.date) !== getYear(previousDate) ||
          getMonth(activity.date) !== getMonth(previousDate) ||
          getDay(activity.date) !== getDay(previousDate);
        previousDate = activity.date;
        return isNew;
      })
      .map((activity: IActivity) => {
        return activity.date;
      });
  }

  const userActivityIds: string[] = userActivities
    ? userActivities.map(item => item.id)
    : [];

  if (activities.status === 'loading' || activities.status === 'init')
    return (
      <Fragment>
        <Skeleton width="sm" height={100} />
        <br />
        <Skeleton width="sm" height={100} />
        <br />
        <Skeleton width="sm" height={100} />
      </Fragment>
    );
  else if (activities.status === 'loaded') {
    return (
      <Fragment>
        {cookie.user && <AddActivity />}
        {dates.map((date: number, index: number) => {
          return (
            <Fragment key={index}>
              <Typography variant="h5" component="h2">
                {getMonthDayString(date)}
              </Typography>
              {activities.data.map((activity: IActivity) => {
                return getYear(date) === getYear(activity.date) &&
                  getMonth(date) === getMonth(activity.date) &&
                  getDay(date) === getDay(activity.date) ? (
                  <ActivityCard
                    key={activity.id}
                    id={activity.id}
                    date={activity.date}
                    category={activity.category}
                    playground={activity.playground}
                    playerLevel={activity.playerLevel}
                    gender={activity.gender}
                    participantsIn={
                      activity.users + '/' + activity.numberOfParticipants
                    }
                    userRegistered={userActivityIds.includes(activity.id)}
                  />
                ) : null;
              })}
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
  return (
    <Typography className="error" variant="h2">
      Įvyko klaida :(
    </Typography>
  );
};
