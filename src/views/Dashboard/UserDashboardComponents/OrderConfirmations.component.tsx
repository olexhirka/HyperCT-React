import { Grid, IconButton, InputBase, Paper, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useStore } from 'hooks';
import { IOrderConfirmation } from 'models';
import { useEffect, useState } from 'react';
import { useStyles } from '../Dashboard.styles';
import OrderConfirmationList from './OrderConfirmationList';

export const OrderConfirmations: React.FC = () => {
  const classes = useStyles();
  const [confirmations, setConfirmations] = useState<IOrderConfirmation[]>([]);
  const [filteredConfirmations, setFilteredConfirmations] = useState<IOrderConfirmation[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const {
    dataStore: {
      taskStore: { orderConfirmations, getOrderConfirmations },
      productStore: { products, getAllProductsAsync },
      merchantStore: { merchants, getAll },
      authStore: { user },
    },
  } = useStore();

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        await getOrderConfirmations(user.id);
        if (products.length === 0) {
          await getAllProductsAsync();
        }
        if (merchants.length === 0) {
          await getAll();
        }
        setConfirmations(constructConfirmations(orderConfirmations));
        setFilteredConfirmations(constructConfirmations(orderConfirmations));
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    setConfirmations(constructConfirmations(orderConfirmations));
  }, [orderConfirmations]);

  useEffect(() => {
    let cs;
    if (search) {
      cs = confirmations.filter((c) => c.productId.toLowerCase().includes(search.toLowerCase()));
    } else {
      cs = confirmations;
    }
    setFilteredConfirmations(cs);
  }, [search, confirmations]);

  const constructConfirmations = (list: IOrderConfirmation[]) => {
    return list.map((oc) => {
      return {
        ...oc,
        productId: products.find((p) => p.id === oc.productId)?.name || '',
        orderPrice: oc.orderPrice,
        merchantId: merchants.find((m) => m.id === oc.merchantId)?.name || '',
      };
    });
  };

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    setPage(0);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3}>
            <Grid item>
              <Typography variant="h5" noWrap className={classes.title}>
                Order Confirmations
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
              <Paper component="form" className={classes.searchRoot}>
                <IconButton className={classes.iconButton} aria-label="menu">
                  <Search />
                </IconButton>
                <InputBase
                  value={search}
                  className={classes.input}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleSearch}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <OrderConfirmationList orderConfirmations={filteredConfirmations} page={page} setPage={setPage} />
        </Grid>
      </Grid>
    </div>
  );
};
