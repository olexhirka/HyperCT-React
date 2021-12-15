import { ReactElement } from 'react';
import { makeStyles, Grid, Typography, Theme, createStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        height: '100vh',
      },
      danger: {
        color: 'red',
      },
      center: {
        textAlign: 'center',
      },
      image: {
        width: '100vw',
        maxWidth: '100%',
        height: 'auto',
        marginBottom: '5.5rem',
      },
      messageTitle: {
        color: theme.palette.primary.dark,
        fontSize: '2.625rem',
        lineHeight: '2.625rem',
        marginBottom: '1.5rem',
      },
      messageSubtitle: {
        color: theme.palette.primary.dark,
        fontSize: '1.125rem',
        lineHeight: '1.5rem',
        marginBottom: '3rem',
      },
      filledButton: {
        background: theme.palette.secondary.dark,
        padding: '1rem 2rem',
        borderRadius: 6,
        fontSize: '1rem',
        textTransform: 'unset',
        fontWeight: 500,
        marginBottom: '1.5rem',
      },
    }),
  { index: 1 },
);

const NotFound = (): ReactElement => {
  const classes = useStyles();
  const router = useHistory();

  const goHome = () => {
    router.push('/');
  };

  return (
    <Grid container alignItems="center" direction="column" className={classes.root}>
      <Grid item>
        <img className={classes.image} src="/404.svg" alt="not-found" />
      </Grid>
      <Typography variant="h3" className={classes.messageTitle}>
        Oops! Page not found...
      </Typography>
      <Typography variant="body1" className={classes.messageSubtitle}>
        We can't seem to find the page you're looking for.
      </Typography>
      <Button onClick={goHome} variant="contained" color="primary" className={classes.filledButton}>
        Back to Home
      </Button>
    </Grid>
  );
};

export default NotFound;
