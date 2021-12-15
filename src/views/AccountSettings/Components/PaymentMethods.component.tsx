import clsx from 'clsx';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ReactElement, useState, useEffect } from 'react';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useComponentDidMount, useStore } from 'hooks';
import { CardRow } from './CardRow.component';
import { useStyles } from '../AccountSettings.styles';
import { Link } from 'react-router-dom';

const PaymentMethods = (): ReactElement => {
  const [isPaymentMethodCreated, setPaymentMethodCreated] = useState(false);
  const {
    dataStore: {
      paymentStore: { paymentMethods, getAllCardsForUser, storeFormData },
      authStore: { user },
    },
  } = useStore();

  useEffect(() => {
    if (user) {
      getAllCardsForUser(user.id);
    }
  }, []);

  const {
    whiteText,
    paper,
    divider,
    linkStyle,
    paddingLeft30,
    paddingTop25,
    paddingRight30,
    button,
    disableAddButton,
  } = useStyles();

  useEffect(() => {
    const primaryPaymentMethod = paymentMethods.find((pm) => pm.isPrimary);
    if (!!primaryPaymentMethod) {
      setPaymentMethodCreated(true);
    } else {
      setPaymentMethodCreated(false);
    }
  });

  useEffect(() => {
    storeFormData({
      id: '',
      encryptedCardNumber: '',
      cardholderName: '',
      expirationMonth: '',
      expirationYear: '',
      addressId: '',
      isPrimary: false,
      userId: '',
    });
  }, []);

  const cards = paymentMethods.map((pm) => toJS(pm));

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={paper}>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={clsx(paddingTop25, paddingLeft30, paddingRight30)}>
            <Grid item>
              <Typography className={whiteText}>Payment Methods</Typography>
            </Grid>
            <Grid item>
              <Link
                to="/dashboard/settings/add-payment-method"
                className={clsx(linkStyle, isPaymentMethodCreated && disableAddButton)}>
                <Button
                  disabled={isPaymentMethodCreated}
                  className={button}
                  startIcon={<AddCircleIcon />}
                  variant="contained"
                  color="primary">
                  Add Payment Method
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Divider className={divider} />

          {cards.map((pm) => (
            <CardRow key={pm.id} card={pm} />
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(PaymentMethods);
