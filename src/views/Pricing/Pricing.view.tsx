import { ReactElement } from 'react';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { PricingCard } from 'components';
import { useComponentDidMount, useStore } from 'hooks';
import { useStyles } from './Pricing.styles';

const Pricing = (): ReactElement => {
  const classes = useStyles();

  const {
    dataStore: {
      paymentStore: { getAllSubscriptions, subscriptions },
    },
  } = useStore();

  useComponentDidMount(getAllSubscriptions);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {subscriptions.map((subscription) => (
          <Grid key={subscription.priceId} item xs={4}>
            <PricingCard subscription={subscription} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default observer(Pricing);
