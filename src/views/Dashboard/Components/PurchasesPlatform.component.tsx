import { ReactElement } from 'react';
import { makeStyles, createStyles, Paper, Grid, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: 'transparent',
      padding: '30px 20px',
      boxShadow: 'unset',
      border: '1px solid #222735',
    },
    divider: {
      marginTop: 15,
      marginBottom: 15,
      width: '100%',
    },
  }), { index: 1 }
);

const data = [
  {
    title: 'Amazon',
    purchases: 286,
  },
  {
    title: 'Walmart',
    purchases: 537,
  },
  {
    title: 'Ant Online',
    purchases: 81,
  },
  {
    title: 'Microsoft',
    purchases: 150,
  },
  {
    title: 'Best Buy',
    purchases: 197,
  },
];

export const PurchasesPlatform = (): ReactElement => {
  const classes = useStyles();
  const { root, divider } = classes;
  return (
    <Paper className={root}>
      <Grid container>
        {data.map((dataEl, index) => (
          <>
            <Grid item xs={12}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Typography>{dataEl.title}</Typography>
                </Grid>
                <Grid item>
                  <Typography>{dataEl.purchases}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {data.length === index + 1 ? <></> : <Divider className={divider} />}
          </>
        ))}
      </Grid>
    </Paper>
  );
};
