import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/core/Slider';
//import { Formik } from "formik";
//import * as yup from "yup";

/* unfinished yup validation
let FormSchema = yup.object().shape({
  category: yup.string().required("Pasirinkite kategoriją"),
  date: yup.string().required("Pasirinkite datą."),
*/

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(2, 2, 1, 2),
    width: '100%'
  },
  radioGroup: {
    margin: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: theme.palette.secondary.main,
    textDecorationColor: theme.palette.secondary.main
  }
}));

const ActivityForm = () => {
  const classes = useStyles();

  const [hasError, setErrors] = useState(false);
  const [categories, setCategories] = useState({});
  const [playgrounds, setPlaygrounds] = useState({});
  const [category, setCategory] = useState({});
  const [date, setDate] = useState({});
  const [gender, setGender] = useState({});
  const [playground, setPlayground] = useState({});
  const [playerLevel, setPlayerLevel] = useState({});
  const [numberOfParticipants, setNumberOfParticipants] = useState({});

  // Needs fix: func creates infinite loop
  async function fetchData() {
    const resCategories = await fetch("https://sportmatchmaker.azurewebsites.net/api/categories");
    resCategories
      .json()
      .then(res => setCategories(res))
      .catch(err => setErrors(err));

    const resPlaygrounds = await fetch("https://sportmatchmaker.azurewebsites.net/api/playgrounds");
      resPlaygrounds
        .json()
        .then(res => setPlaygrounds(res))
        .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  })

  const handleSubmit = () => {
    if (!category.value) setCategory({ value: category.value, error: true });
    if (!date.value) setDate({ value: date.value, error: true });
    if (!gender.value) setGender({ value: gender.value, error: true });
    if (!playground.value) setPlayground({ value: playground.value, error: true });
    if (!playerLevel.value) setPlayerLevel({ value: playerLevel.value, error: true });
    if (!numberOfParticipants.value) setNumberOfParticipants({ value: numberOfParticipants.value, error: true });

    const activityObj = {
      Category: category.value,
      Date: date.value,
      Gender: gender.value,
      playground: playground.value,
      playerLevel: playerLevel.value,
      numberOfParticipants: numberOfParticipants.value
    };

    fetch('hhttps://sportmatchmaker.azurewebsites.net/api/activities', { // wrong url for safe testing
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(activityObj),
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Naujos treniruotės registracija
        </Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    //error={errors.category && touched.category}
                    variant="outlined"
                    fullWidth
                    id="category"
                    label="Kategorija"
                    name="category"
                    value={category.value}
                    onChange={e =>
                      setCategory({ value: e.target.value, error: false })
                    }
                    // helperText={
                      //  errors.category && touched.category ? errors.category : null
                    // }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    // error={errors.playground && touched.playground}
                    variant="outlined"
                    fullWidth
                    id="playground"
                    label="Vieta"
                    name="playground"
                    value={playground.value}
                    onChange={e =>
                      setPlayground({ value: e.target.value, error: false })
                    }
                    //helperText={
                        // errors.playgound && touched.playgound ? errors.playground : null
                    // }
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    // error={errors.date && touched.date}
                    fullWidth
                    variant="outlined"
                    id="date"
                    label="Data"
                    name="date"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    value={date.value}
                    onChange={e =>
                      setDate({ value: e.target.value, error: false })
                    }
                    // helperText={
                        // errors.date && touched.date
                        // ? errors.date
                        // : null
                  //  }
                />
                
            </Grid>
            <Grid item xs={12}>
                <TextField
                  //  error={errors.numberOfParticipants && touched.numberOfParticipants}
                    variant="outlined"
                    fullWidth
                    value={numberOfParticipants.value}
                    onChange={e =>
                      setNumberOfParticipants({ value: e.target.value, error: false })
                    }
                    name="numberOfParticipants"
                    label="Žaidėjų kiekis"
                    type="number"
                    id="numberOfParticipants"
                    //helperText={
                      //  errors.numberOfParticipants && touched.numberOfParticipants
                      //  ? errors.numberOfParticipants
                        // : null
                    //}
                />
            </Grid>
            <Grid item xs={12}>
                <FormLabel>Žaidėjų lytis</FormLabel>
                <RadioGroup aria-label="Žaidėjų lytis" name="gender">
                    <FormControlLabel value="Moterys" control={<Radio />} label="Moterys" />
                    <FormControlLabel value="Vyrai" control={<Radio />} label="Vyrai" />
                    <FormControlLabel value="Mišri grupė" control={<Radio />} label="Mišri grupė" />
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
                    onChange={e =>
                      setPlayerLevel({ value: e.target.value, error: false })
                    }
                />
            </Grid>
          </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    Sukurti
                </Button>
            </form>
        <div>
          Data from api:
          <hr />
          <span>{JSON.stringify(categories)}</span>
          <hr />
          <span>{JSON.stringify(playgrounds)}</span>
          <hr/>
          <span>Has error: {JSON.stringify(hasError)}</span>
        </div>
      </div>
    </Container>
  );
};
export default ActivityForm;