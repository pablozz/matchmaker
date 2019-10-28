import React, { useState } from 'react';
import { Paper, Typography, Grid, Link } from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiBasketball,
  mdiVolleyball,
  mdiSoccer,
  mdiGenderMale,
  mdiGenderFemale,
  mdiGenderMaleFemale,
  mdiSignalCellular1,
  mdiSignalCellular2,
  mdiSignalCellular3
} from '@mdi/js';
import '../../styles/UserApp/ActivitiesTable.scss';

interface CardData {
  key: string;
  category: string;
  date: number;
  participantsIn: string;
  //price: number;
  gender: string;
  playground: string;
  playerLevel: number;
}

export const ActivityCard: React.FC<CardData> = props => {
  const [brightness, changeBrightness] = useState<string>('brightness(100%)');
  const [elevation, changeElevation] = useState<number>(1);

  return (
    <Link
      className="activity"
      underline="none"
      onMouseOver={() => {
        changeBrightness('brightness(90%)');
        changeElevation(3);
      }}
      onMouseOut={() => {
        changeBrightness('brightness(100%)');
        changeElevation(1);
      }}
    >
      <Paper
        className="activity-card"
        style={{ filter: brightness }}
        elevation={elevation}
      >
        <Grid container justify="space-between" direction="column">
          <Grid item>
            <Grid container justify="space-between" alignItems="center">
              <Grid item className="card-element">
                <Typography variant="h4" className="card-text-time">
                  {setTime(props.date)}
                </Typography>
              </Grid>
              <Grid item className="card-element">
                <Grid container spacing={2}>
                  <Grid item>{pickCategoryIcon(props.category)}</Grid>
                  <Grid item>{pickGenderIcon(props.gender)}</Grid>
                  <Grid item>{pickLevelIcon(props.playerLevel)}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="space-between" alignItems="center">
              <Grid item className="card-element">
                <Typography variant="h6">{props.participantsIn}</Typography>
              </Grid>
              <Grid item className="card-element">
                <Typography>{props.playground}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
};

const setTime = (secs: number) => {
  const t = new Date(secs * 1000);
  let h, m;
  t.getHours() >= 10
    ? (h = t.getHours().toString())
    : (h = '0' + t.getHours().toString());
  t.getMinutes() >= 10
    ? (m = t.getMinutes().toString())
    : (m = '0' + t.getMinutes().toString());
  return h + ':' + m;
};

const ICON_SIZE = 1.3;

const pickCategoryIcon = (category: string) => {
  switch (category) {
    case 'Krepšinis':
      return <Icon title="Krepšinis" size={ICON_SIZE} path={mdiBasketball} />;
    case 'Tinklinis':
      return <Icon title="Tinklinis" size={ICON_SIZE} path={mdiVolleyball} />;
    case 'Futbolas':
      return <Icon title="Futbolas" size={ICON_SIZE} path={mdiSoccer} />;
    default:
      return;
  }
};

const pickGenderIcon = (gender: string) => {
  switch (gender) {
    case 'Vyrai':
      return <Icon title="Vyrai" size={ICON_SIZE} path={mdiGenderMale} />;
    case 'Moterys':
      return <Icon title="Moterys" size={ICON_SIZE} path={mdiGenderFemale} />;
    case 'Mišri grupė':
      return (
        <Icon title="Mišri grupė" size={ICON_SIZE} path={mdiGenderMaleFemale} />
      );
    default:
      return;
  }
};

const pickLevelIcon = (level: number) => {
  switch (level) {
    case 1:
      return (
        <Icon
          title="Pradedantysis"
          size={ICON_SIZE}
          path={mdiSignalCellular1}
        />
      );
    case 2:
      return (
        <Icon title="Mėgėjas" size={ICON_SIZE} path={mdiSignalCellular2} />
      );
    case 3:
      return (
        <Icon title="Pažengęs" size={ICON_SIZE} path={mdiSignalCellular3} />
      );
    default:
      return;
  }
};
