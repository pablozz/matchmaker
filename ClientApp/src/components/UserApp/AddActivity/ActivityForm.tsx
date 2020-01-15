import React, { Fragment, useState, useEffect, /*useCallback*/} from 'react';
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
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ICategory } from '../../../types/categories';
import { IPlayground } from '../../../types/playgrounds';
import {
  CATEGORIES_URL,
  PLAYGROUNDS_URL,
  ACTIVITIES_URL
} from '../../../constants/urls';
import { useCookies } from 'react-cookie';
import { ROUTES } from '../../../constants/routes';
import { Redirect } from 'react-router-dom';

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

interface IActivityFormProps {
  category: string;
  date: Date;
  gender: string;
  playground: string;
  playerLevel: number;
  numberOfParticipants: number;
  existingActivity: boolean;
  activityId: string | null;
}

export const ActivityForm: React.FC<IActivityFormProps> = (props) => {
  const classes = useStyles();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [playgrounds, setPlaygrounds] = useState<IPlayground[]>([]);
  const [category, setCategory] = useState({
    value: '',
    error: ''
  });
  const [date, setDate] = useState<IDate>({
    value: props.date,
    error: ''
  });
  const [gender, setGender] = useState({
    value: props.gender,
    error: ''
  });
  const [playground, setPlayground] = useState({
    value: '',
    error: ''
  });
  const [playerLevel, setPlayerLevel] = useState<IPlayerLevel>({
    value: props.playerLevel,
    error: ''
  });
  const [numberOfParticipants, setNumberOfParticipants] = useState({
    value: props.numberOfParticipants,
    error: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [cookie] = useCookies(['user']);

  /*const loadExistingValues = useCallback((cancelled: boolean) => {
    if (props.existingActivity && !cancelled) {
      const playground = playgrounds.find(p => p.name === props.playground);
      if (playground) {
        setPlayground({
          value: playground.id,
          error: ''
        });
      }
      const category = categories.find(c => c.name === props.category);
      if (category) {
        setCategory({
          value: category.id,
          error: ''
        });
      }
    }
  }, [props.existingActivity, playgrounds, categories, props.category, props.playground]);*/

  async function fetchData() {
    try {
      const resCategories = await fetch(CATEGORIES_URL);
      const categories: ICategory[] = await resCategories.json();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
    try {
      const resPlaygrounds = await fetch(PLAYGROUNDS_URL);
      const playgrounds: IPlayground[] = await resPlaygrounds.json();
      setPlaygrounds(playgrounds);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const validateInputs = (): boolean => {
    if (category.value === '' || category.error !== '') {
      setCategory({ value: '', error: 'Įveskite kategoriją' });
      return false;
    }
    if (!date.value || date.error !== '') {
      setDate({ value: new Date(), error: 'Pateikite datą' });
      return false;
    }
    if (gender.value === '' || gender.error !== '') {
      setGender({ value: '', error: 'Pasirinkite lytį' });
      return false;
    }
    if (playground.value === '' || playground.error !== '') {
      setPlayground({
        value: '',
        error: 'Pasirinkite aikštelę'
      });
      return false;
    }
    if (!playerLevel.value || playerLevel.error !== '') {
      setPlayerLevel({ value: 2, error: 'Pasirinkite žaidėjų lygį' });
      return false;
    }
    if (
      numberOfParticipants.value <= 0 ||
      numberOfParticipants.error !== ''
    ) {
      setNumberOfParticipants({
        value: 0,
        error: 'Įveskite žaidėjų skaičių'
      });
      return false;
    }
    return true;
  }

  const addActivity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const activity = {
      categoryId: category.value,
      date: date.value,
      gender: gender.value,
      playgroundId: playground.value,
      playerLevel: playerLevel.value,
      numberOfParticipants: numberOfParticipants.value,
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
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*const updateActivity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const activity = {
      activityId: props.activityId,
      categoryId: category.value,
      date: date.value,
      gender: gender.value,
      playgroundId: playground.value,
      playerLevel: playerLevel.value,
      numberOfParticipants: numberOfParticipants,
      registeredParticipants: 0,
      price: 0
    };
    try {
      const response = await fetch(ACTIVITIES_URL + '/' + props.activityId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookie.user.token
        },
        body: JSON.stringify(activity)
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  */
  return (
    <Fragment>
      {(!cookie.user || submitted) && <Redirect to={ROUTES.Main} />}
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <form onSubmit={addActivity}>
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
                        {playground.name}
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
                      value: parseInt(e.target.value),
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
                  value={gender.value}
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
}
