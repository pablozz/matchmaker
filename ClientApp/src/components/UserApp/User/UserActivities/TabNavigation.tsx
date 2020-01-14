import React from 'react';
import { Paper, Tab, Tabs } from '@material-ui/core';

interface ITabsProps {
  index: number;
  onChange: (e: any, val: React.SetStateAction<number>) => void;
}

export const TabNavigation: React.FC<ITabsProps> = props => {
  return (
    <Paper square>
      <Tabs
        value={props.index}
        indicatorColor="secondary"
        textColor="secondary"
        centered
        onChange={props.onChange}
      >
        <Tab label="Registruotos" />
        <Tab label="Sukurtos" />
      </Tabs>
    </Paper>
  );
};
