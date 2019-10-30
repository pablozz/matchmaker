import React, { Fragment } from 'react';

import { IActivity } from '../../types/activities';
import { ActivityCard } from './ActivityCard';

interface ICardsDisplayProps {
  activities: IActivity[];
}

interface IDateState {
  year: number;
  month: number;
  day: number;
}

export const ActivityCardsDisplay: React.FC<ICardsDisplayProps> = props => {
  const activities: IActivity[] = props.activities;
  let prevDateState: IDateState = { year: 0, month: 0, day: 0 };

  return (
    <Fragment>
      {activities.map((item: IActivity, index: number) => {
        const dateState: IDateState = {
          year: getYear(item.date),
          month: getMonth(item.date),
          day: getDay(item.date)
        };
        const dayHeader =
          dateState.year === prevDateState.year &&
          dateState.month === prevDateState.month &&
          dateState.day === prevDateState.day ? null : (
            <h2>{getDateString(dateState.month, dateState.day)}</h2>
          );
        prevDateState = dateState;
        return (
          <Fragment key={index}>
            {dayHeader}
            <ActivityCard
              key={item.id}
              date={item.date}
              category={item.category}
              playground={item.playground}
              playerLevel={item.playerLevel}
              gender={item.gender}
              participantsIn={item.users + '/' + item.numberOfParticipants}
            />
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
