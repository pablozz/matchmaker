import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Button,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Slider,
  MenuItem,
  Paper
} from '@material-ui/core';
import { Toolbar } from '../Toolbar';
import { ICategory } from '../../../types/categories';
import { IPlayground } from '../../../types/playgrounds';
import { useCookies } from 'react-cookie';
import { ROUTES } from '../../../constants/routes';
import {
  CATEGORIES_URL,
  PLAYGROUNDS_URL,
  ACTIVITIES_URL
} from '../../../constants/urls';
import { Redirect } from 'react-router-dom';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(3, 0, 0, 0)
  },
  radioGroup: {
    margin: theme.spacing(1)
  },
  submit: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: theme.palette.secondary.main,
    textDecorationColor: theme.palette.secondary.main
  }
}));

interface IPlayerLevel {
  value: number | number[];
  error: string;
}

interface IDate {
  value: Date | MaterialUiPickersDate;
  error: string;
}

export const AddActivityForm: React.FC = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [playgrounds, setPlaygrounds] = useState<IPlayground[]>([]);
  const [category, setCategory] = useState({
    value: '',
    error: ''
  });
  const [date, setDate] = useState<IDate>({
    value: new Date(),
    error: ''
  });
  const [gender, setGender] = useState({
    value: '',
    error: ''
  });
  const [playground, setPlayground] = useState({
    value: '',
    error: ''
  });
  const [playerLevel, setPlayerLevel] = useState<IPlayerLevel>({
    value: 2,
    error: ''
  });
  const [numberOfParticipants, setNumberOfParticipants] = useState({
    value: '',
    error: ''
  });
  const [created, setCreated] = useState(false);
  const [cookie] = useCookies(['user']);

  const adjustSpellingOfPlace = (size: number): string => {
    if (size === 1) {
      return ' vieta';
    } else if (size > 1 && size < 10) {
      return ' vietos';
    }
    return ' vietų';
  };

  async function fetchData() {
    try {
      const resCategories = await fetch(CATEGORIES_URL);
      const categories = await resCategories.json();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
    try {
      const resPlaygrounds = await fetch(PLAYGROUNDS_URL);
      const playgrounds = await resPlaygrounds.json();
      setPlaygrounds(playgrounds);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (category.value === '' || category.error !== '') {
      setCategory({ value: '', error: 'Įveskite kategoriją' });
      return;
    }
    if (!date.value || date.error !== '') {
      setDate({ value: new Date(), error: 'Pateikite datą' });
      return;
    }
    if (gender.value === '' || gender.error !== '') {
      setGender({ value: '', error: 'Pasirinkite lytį' });
      return;
    }
    if (playground.value === '' || playground.error !== '') {
      setPlayground({
        value: '',
        error: 'Pasirinkite aikštelę'
      });
      return;
    }
    if (!playerLevel.value || playerLevel.error !== '') {
      setPlayerLevel({ value: 2, error: 'Pasirinkite žaidėjų lygį' });
      return;
    }
    if (
      numberOfParticipants.value === '' ||
      parseInt(numberOfParticipants.value) <= 0 ||
      numberOfParticipants.error !== ''
    ) {
      setNumberOfParticipants({
        value: '0',
        error: 'Įveskite žaidėjų skaičių'
      });
      return;
    }
    const activity = {
      categoryId: category.value,
      date: date.value,
      gender: gender.value,
      playgroundId: playground.value,
      playerLevel: playerLevel.value,
      numberOfParticipants: parseInt(numberOfParticipants.value),
      price: 0
    };
    try {
      const response = await fetch(ACTIVITIES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookie.user.token
        },
        body: JSON.stringify(activity)
      });
      if (response.ok) {
        setCreated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      {(!cookie.user || created) && <Redirect to={ROUTES.Main} />}
      <Toolbar title="Pridėti naują veiklą" />
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={category.error.length > 0}
                  fullWidth
                  select
                  id="select-category"
                  label="Kategorija"
                  name="category"
                  value={category.value}
                  onChange={e =>
                    setCategory({ value: e.target.value, error: '' })
                  }
                  helperText={category.error}
                >
                  {categories.map(category => (
                    <MenuItem value={category.id} key={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={playground.error.length > 0}
                  fullWidth
                  select
                  id="playground"
                  label="Vieta"
                  name="playground"
                  value={playground.value}
                  onChange={e =>
                    setPlayground({ value: e.target.value, error: '' })
                  }
                  helperText={playground.error}
                >
                  {playgrounds &&
                    playgrounds.map(playground => (
                      <MenuItem value={playground.id} key={playground.id}>
                        {playground.name +
                          ' ' +
                          playground.size +
                          adjustSpellingOfPlace(playground.size)}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <DateTimePicker
                  error={date.error.length > 0}
                  fullWidth
                  variant="inline"
                  id="date"
                  label="Data"
                  name="date"
                  ampm={false}
                  value={date.value}
                  onChange={date => setDate({ value: date, error: '' })}
                  helperText={date.error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={numberOfParticipants.error.length > 0}
                  variant="outlined"
                  fullWidth
                  value={numberOfParticipants.value}
                  onChange={e =>
                    setNumberOfParticipants({
                      value: e.target.value,
                      error: ''
                    })
                  }
                  name="numberOfParticipants"
                  label="Žaidėjų kiekis"
                  type="number"
                  id="numberOfParticipants"
                  helperText={numberOfParticipants.error}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Žaidėjų lytis</FormLabel>
                <RadioGroup
                  aria-label="Žaidėjų lytis"
                  name="gender"
                  onChange={e =>
                    setGender({ value: e.target.value, error: '' })
                  }
                >
                  <FormControlLabel
                    value="Moterys"
                    control={<Radio />}
                    label="Moterys"
                  />
                  <FormControlLabel
                    value="Vyrai"
                    control={<Radio />}
                    label="Vyrai"
                  />
                  <FormControlLabel
                    value="Mišri grupė"
                    control={<Radio />}
                    label="Mišri grupė"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <FormLabel>Sudėtingumo lygis</FormLabel>
                <Slider
                  id="playerLevel"
                  name="playerLevel"
                  defaultValue={2}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={3}
                  value={playerLevel.value}
                  onChangeCommitted={(event, value) =>
                    setPlayerLevel({ value: value, error: '' })
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sukurti
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Fragment>
  );
};
