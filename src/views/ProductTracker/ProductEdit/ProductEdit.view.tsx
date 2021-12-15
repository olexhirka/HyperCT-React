import { lazy, ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Grid, Button } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useComponentDidMount, useComponentDidUnmount, useStore } from 'hooks';
import { useStyles } from './ProductEdit.styles';

const ProductEditFormComponent = lazy(() => import('./components/ProductEditForm.component'));

const ProductEdit = (): ReactElement => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();

  const {
    dataStore: { productStore },
  } = useStore();

  const { getProduct, removeSelected, selectedProduct } = productStore;

  useComponentDidMount(() => getProduct(id));

  useComponentDidUnmount(removeSelected);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Link to="/dashboard/product-tracker" className={classes.linkStyle}>
            <Button
              className={classes.backButton}
              startIcon={<KeyboardBackspace />}
              variant="contained"
              color="primary">
              Product tracker
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={4}>
            <Grid item>
              <Typography variant="h5" className={clsx(classes.whiteText, classes.maxWidth530)}>
                Edit Product
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          {selectedProduct && <ProductEditFormComponent product={selectedProduct.asJSON} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default observer(ProductEdit);
