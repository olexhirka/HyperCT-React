import { ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { KeyboardBackspace } from '@material-ui/icons';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { Typography, Grid, Button, Paper } from '@material-ui/core';
import { useComponentDidMount, useComponentDidUnmount, useStore } from 'hooks';
import { ProductDataRowComponent } from '../components';
import { useStyles } from './ProductDetail.styles';

const TrackerDetails = (): ReactElement => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const {
    dataStore: { productStore },
  } = useStore();

  const { getProductAsync, removeSelected, selectedProduct } = productStore;

  useComponentDidMount(() => getProductAsync(id));

  useComponentDidUnmount(removeSelected);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Link to="/dashboard/product-tracker" className={classes.linkStyles}>
            <Button
              className={classes.backButton}
              startIcon={<KeyboardBackspace />}
              variant="contained"
              color="primary">
              Product tracker
            </Button>
          </Link>
        </Grid>

        {selectedProduct ? (
          <>
            <Grid item xs={12}>
              <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={4}>
                <Grid item>
                  <Typography variant="h5" className={clsx(classes.whiteText, classes.maxWidth530)}>
                    Product tracker/
                    {selectedProduct?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Link to={`/dashboard/product-tracker/tracker-edit/${id}`} className={classes.linkStyles}>
                    <Button className={classes.editButton} variant="contained" color="primary">
                      Edit Task
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <ProductDataRowComponent title="Product name:" data={selectedProduct?.name} />
                <ProductDataRowComponent title="Company:" data={selectedProduct?.merchantId} marginTop20 />
                <ProductDataRowComponent title="Last Checked:" data={selectedProduct.lastChecked} marginTop20 />
                <ProductDataRowComponent title="Price:" data={`$${selectedProduct?.price || 0}`} marginTop20 />
                <ProductDataRowComponent title="Status:" data="NA" marginTop20 />
                <ProductDataRowComponent title="Trust:" data="NA" marginTop20 />
                <ProductDataRowComponent
                  title="Product Link:"
                  data={
                    <a href={selectedProduct?.url} target="_blank" rel="noreferrer">
                      Product Link
                    </a>
                  }
                  marginTop20
                />
              </Paper>
            </Grid>
          </>
        ) : null}
      </Grid>
    </div>
  );
};

export default observer(TrackerDetails);
