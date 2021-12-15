import { lazy, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Button } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import clsx from 'clsx';
import { useStyles } from './ProductCreate.styles';

const ProductAddFormComponent = lazy(() => import('./components/ProductAddForm.component'));

const ProductCreate = (): ReactElement => {
  const classes = useStyles();

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
                Create Product
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <ProductAddFormComponent />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductCreate;
