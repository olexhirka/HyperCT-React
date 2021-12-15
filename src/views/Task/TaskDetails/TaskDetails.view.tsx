import { ReactElement, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Grid, Button, Paper, SvgIcon } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { CheckoutSVG, CartSVG, SearchSVG } from 'icons';
import { useComponentDidUnmount, useStore } from 'hooks';
import { useStyles } from './TaskDetails.styles';

interface P {
  title: string;
  data?: string | number;
  marginTop20?: boolean;
}

// Component only for this page
const TaskDataRow = ({ title, data = '', marginTop20 }: P): ReactElement => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      className={clsx({
        [classes.marginTop20]: marginTop20,
      })}>
      <Grid item>
        <Typography variant="subtitle1">{title}</Typography>
      </Grid>
      <Grid
        item
        xs={8}
        className={clsx({
          [classes.alignLeft]: true,
          [classes.whiteText]: true,
        })}>
        <Typography variant="subtitle1">
          <Grid container alignItems="center">
            <Grid item>
              {data === 'Add to cart' && title === 'Task type:' && (
                <SvgIcon className={classes.svgIcon}>
                  <CartSVG />
                </SvgIcon>
              )}
              {data === 'Checkout' && title === 'Task type:' && (
                <SvgIcon className={classes.svgIcon}>
                  <CheckoutSVG />
                </SvgIcon>
              )}
              {data === 'Search' && title === 'Task type:' && (
                <SvgIcon className={classes.svgIcon}>
                  <SearchSVG />
                </SvgIcon>
              )}
            </Grid>
            <Grid item>
              <span
                className={clsx({
                  [classes.addToCartTextContainer]: data === 'Add to cart' && title === 'Task type:',
                  [classes.checkoutTextContainer]: data === 'Checkout' && title === 'Task type:',
                  [classes.searchTextContainer]: data === 'Search' && title === 'Task type:',
                  [classes.statusFilledContainer]: data === 'Filled' && title === 'Status:',
                  [classes.statusOpenContainer]: data === 'Open' && title === 'Status:',
                  [classes.statusContainer]: title === 'Status:',
                })}>
                {data}
              </span>
            </Grid>
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
};

const TaskDetails = (): ReactElement => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const {
    dataStore: {
      taskStore: { getByIDAsync, removeSelected, selectedTask, loading },
      productStore: { products },
      merchantStore: { merchants },
    },
  } = useStore();

  const [merchant, setMerchant] = useState('');
  const [product, setProduct] = useState('');

  useEffect(() => {
    const fetch = async () => {
      await getByIDAsync(id);
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (selectedTask) {
      const productObj = products.filter((product) => product.id === selectedTask.productId);
      setProduct(productObj[0].name);
      const merchantObj = merchants.filter((merchant) => (merchant.id = productObj[0].merchantId));
      setMerchant(merchantObj[0].name);
    }
  }, [selectedTask]);

  useComponentDidUnmount(removeSelected);

  if (loading) return <></>;

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Link to="/dashboard/tasks" className={classes.linkStyles}>
            <Button
              className={classes.backButton}
              startIcon={<KeyboardBackspace />}
              variant="contained"
              color="primary">
              Tasks
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={4}>
            <Grid item>
              <Typography variant="h5" className={clsx(classes.whiteText, classes.maxWidth530)}>
                Task/
                {product}
              </Typography>
            </Grid>
            <Grid item>
              <Link to={`/dashboard/tasks/edit/${id}`} className={classes.linkStyles}>
                <Button className={classes.editButton} variant="contained" color="primary">
                  Edit Task
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Paper className={clsx(classes.paper)}>
            <TaskDataRow title="Product:" data={product} />
            <TaskDataRow title="Merchant:" data={merchant} marginTop20 />
            <TaskDataRow title="Status:" data="Open" marginTop20 />
            <TaskDataRow title="Quantity:" data={selectedTask?.targetQuantity} marginTop20 />
            <TaskDataRow title="Payment:" data="Payment" marginTop20 />
            <TaskDataRow title="Shipping:" data="Shipping" marginTop20 />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default observer(TaskDetails);
