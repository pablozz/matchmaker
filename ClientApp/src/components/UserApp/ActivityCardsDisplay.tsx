import React, { Fragment } from 'react';

import { IActivity } from '../../types/activities';
import { ActivityCard } from './ActivityCard';

interface ICardsDisplayProps {
  activities: IActivity[];
}

interface IDate {
  year: number;
  month: number;
  day: number;
}

interface IDateState {
  date: IDate;
  isNew: boolean;
}

export const ActivityCardsDisplay: React.FC<ICardsDisplayProps> = props => {
  const activities: IActivity[] = props.activities;

  let prevDate: IDate = { year: 0, month: 0, day: 0 };

  const dates: IDate[] = activities
    .map((item: IActivity) => {
      const newDate: IDate = {
        year: getYear(item.date),
        month: getMonth(item.date),
        day: getDay(item.date)
      };
      const isNew: boolean =
        newDate.year !== prevDate.year ||
        newDate.month !== prevDate.month ||
        newDate.day !== prevDate.day;
      prevDate = newDate;
      return { date: newDate, isNew: isNew };
    })
    .filter((item: IDateState) => {
      return item.isNew;
    })
    .map((item: IDateState) => {
      return item.date;
    });

  return (
    <Fragment>
      {dates.map((date: IDate, index: number) => {
        return (
          <Fragment key={index}>
            <h2>{getDateString(date.month, date.day)}</h2>
            {activities.map((activity: IActivity) => {
              return date.year === getYear(activity.date) &&
                date.month === getMonth(activity.date) &&
                date.day === getDay(activity.date) ? (
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
};

const getYear = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  return date.getFullYear();
};

const getMonth = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  return date.getMonth();
};

const getDay = (secs: number) => {
  const date = new Date();
  date.setTime(secs * 1000);
  return date.getDate();
};

const getDateString = (months: number, days: number) => {
  let m: string;
  let d: string;
  months >= 10 ? (m = months.toString()) : (m = '0' + months);
  days >= 10 ? (d = days.toString()) : (d = '0' + days);
  return m + '-' + d;
};
