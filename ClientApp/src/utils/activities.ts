import { IActivity } from '../types/activities';

export const generateActivities = (data: IActivity[]) => {
  return data.map(item => {
    return {
      id: item.id,
      date: item.date,
      gender: item.gender,
      price: item.price,
      numberOfParticipants: item.numberOfParticipants,
      playground: item.playground,
      playerLevel: item.playerLevel,
      category: item.category,
      admin: item.admin,
      users: item.users
    };
  });
};
