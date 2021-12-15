import { ReactElement } from 'react';
import { createStyles, makeStyles, Paper, Theme, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
  const {
    palette: {
      primary: { dark },
    },
  } = theme;
  return createStyles({
    root: {
      padding: '40px',
      borderRadius: 6,
      background: dark,
      boxShadow: 'unset',
    },
    headingText: {
      color: '#ffffff',
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1,
    },
    subText: {
      marginTop: 18,
      color: '#ffffff',
      opacity: 0.6,
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1,
    },
  });
}, { index: 1 });

interface P {
  icon: ReactElement;
  title: string;
  count: string;
}

export const Card = ({ icon, title, count }: P): ReactElement => {
  const classes = useStyles();
  const { root, headingText, subText } = classes;
  return (
    <>
      <Paper className={root}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            {icon}
          </Grid>
          <Grid item xs={8}>
            <Typography className={headingText}>{count}</Typography>
            <Typography className={subText}>{title}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
