import { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { KeyboardBackspace } from '@material-ui/icons';
import clsx from 'clsx';
import { Typography, Grid, Button, makeStyles, createStyles, Theme, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: '30px',
      padding: '40px 50px',
      textAlign: 'center',
      background: '#181C27',
      color: theme.palette.text.secondary,
    },
    backButton: {
      color: theme.palette.secondary.dark,
      backgroundColor: 'transparent',
      boxShadow: 'unset',
      padding: 0,
      '&:hover': {
        boxShadow: 'unset',
      },
    },
    whiteText: {
      color: '#fff',
    },
    maxWidth530: {
      maxWidth: 530,
    },
    linkStyle: {
      textDecoration: 'none',
    },
    button: {
      width: '100%',
      padding: '8px 0px',
      borderRadius: 6,
      fontSize: '18px',
      textTransform: 'unset',
      boxShadow: 'unset',
      fontWeight: 700,
    },
    cancelButton: {
      background: 'transparent',
    },
  }), { index: 1 }
);

interface P {
  backLink?: string;
  title: string;
  children: ReactNode;
  tab?: number;
}

export const CommonHeader = ({ backLink, title, children, tab }: P): ReactElement => {
  const classes = useStyles();

  const link = tab ? `/dashboard/settings?tab=${tab}` : '/dashboard/settings';

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Link to={link} className={classes.linkStyle}>
            <Button
              className={classes.backButton}
              startIcon={<KeyboardBackspace />}
              variant="contained"
              color="primary">
              Account Settings
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={4}>
            <Grid item>
              <Typography variant="h5" className={clsx(classes.whiteText, classes.maxWidth530)}>
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
              {children}

              <Grid item xs={12}>
                <Link to={backLink ? backLink : link} className={classes.linkStyle}>
                  <Button
                    type="button"
                    className={clsx(classes.button, classes.cancelButton)}
                    variant="contained"
                    color="primary">
                    Cancel
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
