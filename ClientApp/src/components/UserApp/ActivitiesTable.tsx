import React from 'react';
import { DataTable, Text } from 'grommet';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducers';
import { IActivity } from '../../types/activities';

interface TableData {
  id: string;
  category: string;
  date: string;
  participantsIn: string;
  gender: string;
  playground: string;
}

export const ActivitiesTable: React.FC = () => {
  const data: IActivity[] = useSelector(
    (state: AppState) => state.activities.payload
  );

  const genData: TableData[] = data.map((item: IActivity) => {
    return {
      id: item.id,
      category: item.category,
      date: item.date,
      participantsIn: item.users + '/' + item.numberOfParticipants,
      gender: item.gender,
      playground: item.playground
    };
  });

  return (
    <DataTable
      className="table"
      alignSelf="center"
      primaryKey={'id'}
      columns={[
        {
          property: 'category',
          header: <Text>Kategorija</Text>
        },
        {
          property: 'date',
          header: <Text>Data</Text>
        },
        {
          property: 'participantsIn',
          header: <Text>Žaidėjai</Text>
        },
        {
          property: 'gender',
          header: <Text>Lytis</Text>
        },
        {
          property: 'playground',
          header: <Text>Adresas</Text>
        }
      ]}
      data={genData}
    />
  );
};
