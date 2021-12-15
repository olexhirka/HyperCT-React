import { ReactElement } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
  danger: {
    color: 'red',
  },
  center: {
    textAlign: 'center',
  },
}, { index: 1 });

interface P {
  error?: string;
}

const NotFound = ({ error = 'Page Not Found!' }: P): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" justify="center" className={classes.root}>
      <Grid item className={classes.center}>
        <img width="400" src="https://i.ibb.co/k2fw4cS/nbqm5sfdm2h1stqb9pj3fj5ut7.png" alt="not-found" />
        <Typography className={classes.danger} variant="h3">
          {error}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
