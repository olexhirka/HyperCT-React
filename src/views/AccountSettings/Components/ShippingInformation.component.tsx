import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useComponentDidMount, useStore } from 'hooks';
import { useStyles } from '../AccountSettings.styles';
import { AddressCard } from './AddressCard.component';

const ShippingInformation: React.FC = () => {
  const [isShippingAddressCreated, setShippingAddressCreated] = useState(false);
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

  const {
    dataStore: {
      addressStore: { userAddresses, getAllAddressForUserAsync, removeAddressAsync },
      authStore: { user },
    },
  } = useStore();

  useEffect(() => {
    if (user) {
      getAllAddressForUserAsync(user.id);
    }
  }, []);

  useEffect(() => {
    const shippingAddress = userAddresses.find((address) => address.isShipping);
    if (shippingAddress) {
      setShippingAddressCreated(true);
    } else {
      setShippingAddressCreated(false);
    }
  });

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
              <Typography className={whiteText}>Shipping Information</Typography>
            </Grid>
            <Grid item>
              <Link
                to={{
                  pathname: '/dashboard/settings/add-address',
                  state: {
                    push: '/dashboard/settings?tab=1',
                    isShipping: true,
                    canChangeShipping: false,
                    origin: 'address',
                  },
                }}
                className={clsx(linkStyle, isShippingAddressCreated && disableAddButton)}>
                <Button
                  disabled={isShippingAddressCreated}
                  className={button}
                  startIcon={<AddCircleIcon />}
                  variant="contained"
                  color="primary">
                  Add Shipping Address
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Divider className={divider} />

          {userAddresses.map((a) => (
            <AddressCard key={a.id} address={a} removeAddressAsync={removeAddressAsync} />
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(ShippingInformation);
