import { ReactElement, useEffect, useState } from 'react';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useStore } from 'hooks';
import { useStyles } from '../AccountSettings.styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Subscription = (): ReactElement => {
  const classes = useStyles();
  const [subscriptionName, setSubscriptionName] = useState('');
  const {
    dataStore: {
      authStore: { user },
      paymentStore: { cancelSubscription, subscriptionTiers, setSubscriptionStatusForUser,
        isSubscriptionSetToCancel, recurringFee, recurringInterval, periodEndDate
       },
    },
  } = useStore();
  let cancellationWasSuccessful;

  useEffect(() => {
    const name = subscriptionTiers.find((s) => s.id === user?.subscriptionTierId)?.name;
    setSubscriptionName(name || '');

    if (!!user) {
      setSubscriptionStatusForUser(user.id);
    }
  }, []);

  const {
    whiteText,
    paper,
    divider,
    paddingLeft30,
    paddingRight30,
    paddingTop25,
    paddingTop15,
    paddingBottom15,
    button,
    periodEndSpacing
  } = classes;

  const handleCancelSubscription = async () => {
    if (user) {
      await cancelSubscription(user.stripeSubscriptionId);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={paper}>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={clsx(paddingTop25, paddingLeft30, paddingRight30)}>
            <Grid item className={classes.subscriptionHeaderBar}>
              <Typography className={whiteText}>Subscription</Typography>
              {!isSubscriptionSetToCancel && !!periodEndDate && <div><span className={periodEndSpacing}>Next billing date:</span><span>{periodEndDate}</span></div>}
              {isSubscriptionSetToCancel && <div><ErrorOutlineIcon></ErrorOutlineIcon><p className={classes.subscriptionSetToCancelIndicator}>Subscription is set to cancel on {periodEndDate}</p></div>}
            </Grid>
          </Grid>
          <Divider className={divider} />
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={clsx(paddingLeft30, paddingRight30, paddingBottom15)}>
            {subscriptionName && (
              <>
                <Grid item xs={6}>
                  <p className={classes.subscriptionName}>Hypercart {subscriptionTiers.find((s) => s.id === user?.subscriptionTierId)?.name}</p>
                  <div>${recurringFee} per {recurringInterval}</div>
                </Grid>
                <Grid item xs={6} container justify="flex-end">
                  <Button className={button} onClick={handleCancelSubscription}
                    disabled={isSubscriptionSetToCancel} variant="contained" color="primary">
                    Cancel Subscription
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(Subscription);
