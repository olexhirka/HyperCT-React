import { ReactElement } from 'react';
import { Chip, Grid } from '@material-ui/core';
import { AddressModel } from 'models';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paddingTop25: {
      paddingTop: 25,
    },
    paddingLeft30: {
      paddingLeft: 30,
    },
    paddingRight30: {
      paddingRight: 30,
    },
    linkStyle: {
      textDecoration: 'none',
    },
    paddingBottom15: {
      paddingBottom: 15,
    },
    tableIconButton: {
      color: 'rgb(255 255 255 / 60%)',
      padding: 2,
    },
    badgeIcon: {
      color: '#fff',
      backgroundColor: theme.palette.secondary.dark,
    },
  }), { index: 1 }
);

interface P {
  address: AddressModel;
  removeAddressAsync: (id: string) => {};
}

export const AddressCard = ({ address }: P): ReactElement => {
  const { paddingTop25, paddingLeft30, paddingRight30, paddingBottom15, badgeIcon } =
    useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justify="flex-start"
      className={clsx(paddingTop25, paddingLeft30, paddingRight30, paddingBottom15)}>
      <Grid item xs={6}>
        {address.addressText}
      </Grid>
      <Grid item xs={3}>
        {address.isShipping && <Chip className={badgeIcon} color="primary" label="Shipping Address" />}
      </Grid>
    </Grid>
  );
};
