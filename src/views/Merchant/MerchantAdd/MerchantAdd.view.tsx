import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Button } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import clsx from 'clsx';
import { MerchantAddForm } from '../Components';
import { useStyles } from './MerchantAdd.styles';

const MerchantAdd = (): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Link to="/dashboard/merchants" className={classes.linkStyle}>
            <Button
              className={classes.backButton}
              startIcon={<KeyboardBackspace />}
              variant="contained"
              color="primary">
              Merchants
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={4}>
            <Grid item>
              <Typography variant="h5" className={clsx(classes.whiteText, classes.maxWidth530)}>
                Add new merchant
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={5}>
          <MerchantAddForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default MerchantAdd;
