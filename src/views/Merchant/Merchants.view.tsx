import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import { useStore } from 'hooks';
import { MerchantCard } from './Components';
import { MerchantModel } from 'models';
import { useStyles } from './Merchants.styles';

const Merchants = (): ReactElement => {
  const classes = useStyles();
  const { text } = classes;
  const [activeMerchants, setActiveMerchants] = useState<MerchantModel[]>([]);

  const {
    dataStore: {
      merchantStore: { merchants },
      authStore: { user },
    },
  } = useStore();

  useEffect(() => {
    const activeMerchants = merchants.filter((merchant) => merchant.isSupported === true);
    setActiveMerchants(activeMerchants);
  }, [merchants]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container direction="row" justify="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="subtitle1" className={text}>
                Merchants
              </Typography>
            </Grid>

            {user?.role === 1 && (
              <Grid item>
                <Button
                  className={classes.addButton}
                  startIcon={<AddCircle />}
                  variant="contained"
                  color="primary"
                  to="/dashboard/merchants/add"
                  component={Link}>
                  Add new
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3} justify="flex-start" alignItems="center">
            {activeMerchants.map((m) => (
              <Grid key={m.id} item xs={12} sm={8} md={4} lg={3}>
                <MerchantCard merchant={m} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default observer(Merchants);
