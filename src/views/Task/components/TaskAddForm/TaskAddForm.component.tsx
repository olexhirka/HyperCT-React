import * as Yup from 'yup';
import { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Box, IconButton, MenuItem, Paper, TextField, Link as OuterLink } from '@material-ui/core';
import { Language, KeyboardBackspace } from '@material-ui/icons';
import { CustomAutoComplete, CustomInput } from 'components';
import { useFormik } from 'formik';
import { useStore } from 'hooks';
import { ITaskModel, MerchantModel, ProductModel } from 'models';
import { useStyles } from './TaskAddForm.styles';

const validationSchema = Yup.object().shape({
  targetQuantity: Yup.number().positive().integer().required('Target quantity is required!'),
});

const TaskAddForm = (): ReactElement => {
  const classes = useStyles();
  const [merchantFilter, setMerchantFilter] = useState<MerchantModel>();
  const [product, setProduct] = useState<ProductModel>();
  const [merchantList, setMerchantList] = useState<MerchantModel[]>([]);

  const history = useHistory();

  const {
    dataStore: {
      taskStore: { addAsync, loading },
      authStore: { user },
      productStore: { products },
      merchantStore: { merchants, getAll },
    },
  } = useStore();

  useEffect(() => {
    const fetch = async () => {
      if (merchants.length === 0) {
        const fetchedMerchants = await getAll();
        setMerchantList(fetchedMerchants);
      } else {
        setMerchantList(merchants);
      }
    };
    fetch();
  }, []);

  // Initial Values for Formik
  const initialValues: ITaskModel = {
    id: '',
    userId: user?.id || '',
    productId: '',
    productName: '',
    targetQuantity: 0,
    status: 0,
    taskType: 0,
    isRunning: false,
    isCheckoutProcessing: false,
    unitsPurchased: 0,
  };

  const formik = useFormik<ITaskModel>({
    initialValues,
    validationSchema,
    onSubmit: (values) => addAsync(values, () => history.push('/dashboard/tasks')),
  });

  const handleMerchantSelect = (event: any) => {
    const merchant = merchantList.find((merchant) => merchant.name === event.target.value);
    setMerchantFilter(merchant);
  };

  const handleChangeMerchant = () => {
    setMerchantFilter(undefined);
  };

  useEffect(() => {
    if (formik.values.productId) {
      const selectedProduct = products.filter((product) => product.id === formik.values.productId)[0];
      setProduct(selectedProduct);
    } else {
      setProduct(undefined);
    }
  }, [formik, products]);

  if (!merchantFilter) {
    return (
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
          <Grid item xs={12} className={classes.formInputContainer}>
            <TextField
              label="Choose a merchant to shop from"
              select
              value={''}
              variant="outlined"
              onChange={handleMerchantSelect}>
              {merchantList
                .filter((merchant) => merchant.isSupported === true)
                .map((merchant) => {
                  return (
                    <MenuItem key={merchant.id} value={merchant.name}>
                      {merchant.name}
                    </MenuItem>
                  );
                })}
            </TextField>
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    return (
      <form onSubmit={formik.handleSubmit}>
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <Button
                onClick={handleChangeMerchant}
                className={classes.backButton}
                startIcon={<KeyboardBackspace />}
                variant="contained"
                color="primary">
                Change Merchant
              </Button>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              item
              xs={12}
              className={classes.formInputContainer}>
              <Grid item xs={11}>
                <CustomAutoComplete
                  formik={formik}
                  name="productName"
                  productOptions={products.filter((product) => product.merchantId === merchantFilter.id)}
                  label="Product"
                />
              </Grid>
              {formik.values.productId && (
                <Grid item xs={1}>
                  <Box display="flex" justifyContent="flex-end">
                    <OuterLink href={product ? `${product?.url}` : '#'} target="_blank" rel="noreferrer">
                      <IconButton className={classes.tableIconButton} aria-label="menu">
                        <Language />
                      </IconButton>
                    </OuterLink>
                  </Box>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} className={classes.formInputContainer}>
              <TextField label="Merchant" disabled value={merchantFilter.name} variant="outlined" />
            </Grid>
            <CustomInput
              width={12}
              formik={formik}
              disabled={true}
              name="targetQuantity"
              type="number"
              label="Quantity"
              overrideValue={1}
            />
            <Grid item xs={12}>
              <Button
                className={classes.updateButton}
                variant="contained"
                color="primary"
                disabled={loading || !formik.isValid || !formik.values.productId}
                type="submit">
                Create Task
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }
};

export default TaskAddForm;
