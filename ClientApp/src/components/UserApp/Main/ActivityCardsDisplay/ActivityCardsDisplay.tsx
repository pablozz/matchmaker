import React, { Fragment } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  IActivity,
  IActivityActionPayload
} from '../../../../types/activities';
import { ActivityCard } from './ActivityCard';
import { Typography } from '@material-ui/core';

interface ICardsDisplayProps {
  activities: IActivityActionPayload;
}

export const ActivityCardsDisplay: React.FC<ICardsDisplayProps> = props => {
  const activities: IActivityActionPayload = props.activities;

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
        {dates.map((date: number, index: number) => {
          return (
            <Fragment key={index}>
              <Typography variant="h5">{getDateString(date)}</Typography>
              {activities.data.map((activity: IActivity) => {
                return getYear(date) === getYear(activity.date) &&
                  getMonth(date) === getMonth(activity.date) &&
                  getDay(date) === getDay(activity.date) ? (
                  <ActivityCard
                    key={activity.id}
                    date={activity.date}
                    category={activity.category}
                    playground={activity.playground}
                    playerLevel={activity.playerLevel}
                    gender={activity.gender}
                    participantsIn={
                      activity.users + '/' + activity.numberOfParticipants
                    }
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

const getYear = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  return date.getFullYear();
};

const getMonth = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  return date.getMonth() + 1;
};

const getDay = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  return date.getDate();
};

const getWeekday = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  const weekday = date.getDay();
  switch (weekday) {
    case 0:
      return 'pirmadienis';
    case 1:
      return 'antradienis';
    case 2:
      return 'trečiadienis';
    case 3:
      return 'ketvirtadienis';
    case 4:
      return 'penktadienis';
    case 5:
      return 'šeštadienis';
    case 6:
      return 'sekmadienis';
    default:
      return '';
  }
};

const getDateString = (date: number) => {
  let m: string;
  let d: string;

  const today = new Date();

  if (
    today.getFullYear() === getYear(date) &&
    today.getMonth() + 1 === getMonth(date)
  ) {
    if (today.getDate() === getDay(date)) return 'Šiandien';
    if (today.getDate() + 1 === getDay(date)) return 'Rytoj';
  }

  getMonth(date) >= 10
    ? (m = getMonth(date).toString())
    : (m = '0' + getMonth(date));
  getDay(date) >= 10 ? (d = getDay(date).toString()) : (d = '0' + getDay(date));
  return m + '-' + d + ', ' + getWeekday(date);
};
