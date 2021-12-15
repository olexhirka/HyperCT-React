import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Typography, Button, IconButton, InputBase } from '@material-ui/core';
import { AddCircle, Search } from '@material-ui/icons';
import { useStyles } from './ProductTracker.styles';
import { ProductModel, UserModel } from 'models';
import { useStore } from 'hooks';
import { UIProduct } from 'models';
import EnhancedProductsList from './components/ProductList/EnhancedProductsList';

const ProductTracker = (): ReactElement => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<UIProduct[]>([]);
  const [showAction, setShowAction] = useState(false);
  const [page, setPage] = useState(0);

  const {
    dataStore: {
      authStore: { user },
      productStore: { getAllProductsAsync, products },
      merchantStore: { merchants },
    },
  } = useStore();

  useEffect(() => {
    setShowAction(!!user && user.role === 1);
  }, []);

  const constructProducts = (pList: ProductModel[]) => {
    return pList.map((p) => {
      return {
        ...p,
        merchantName: merchants.find((m) => m.id === p.merchantId)?.name,
      };
    });
  };

  useEffect(() => {
    const fetch = async () => {
      if (user && products.length === 0) {
        const fetchedProducts = await getAllProductsAsync();
        setFilteredProducts(constructProducts(fetchedProducts));
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    let ps;
    if (search) {
      ps = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    } else {
      ps = products;
    }
    setFilteredProducts(constructProducts(ps));
  }, [search, products]);

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
                Product tracker
              </Typography>
            </Grid>
            {showAction && (
              <Grid item>
                <Link to="/dashboard/product-tracker/add" className={classes.linkStyle}>
                  <Button className={classes.button} startIcon={<AddCircle />} variant="contained" color="primary">
                    Add new
                  </Button>
                </Link>
              </Grid>
            )}
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
          <EnhancedProductsList products={filteredProducts} showAction={showAction} page={page} setPage={setPage} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductTracker;
