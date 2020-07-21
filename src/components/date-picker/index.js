import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { moment } from 'moment';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePickers(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id='datetime-local'
        type='datetime-local'
        defaultValue={'2020-07-21T22:00'}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        {...props}
      />
    </form>
  );
}
