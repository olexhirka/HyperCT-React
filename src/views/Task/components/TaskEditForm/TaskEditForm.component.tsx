import * as Yup from 'yup';
import { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Box, IconButton, Paper, TextField, Link as OuterLink } from '@material-ui/core';
import { Language } from '@material-ui/icons';
import { CustomAutoComplete, CustomInput } from 'components';
import { useFormik } from 'formik';
import { useStore } from 'hooks';
import { ITaskModel, MerchantModel, ProductModel } from 'models';
import { useStyles } from './TaskEditForm.styles';

const validationSchema = Yup.object().shape({
  targetQuantity: Yup.number().positive().integer().required('Target quantity is required!'),
});

interface P {
  task: ITaskModel;
}

const TaskEditForm = ({ task }: P): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const [objectLoading, setObjectLoading] = useState(true);
  const [merchant, setMerchant] = useState<MerchantModel>();
  const [product, setProduct] = useState<ProductModel>();

  const {
    dataStore: {
      taskStore: { updateByIDAsync, loading },
      productStore: { products, getAllProductsAsync },
      merchantStore: { merchants },
    },
  } = useStore();

  useEffect(() => {
    const fetch = async () => {
      const ps = await getAllProductsAsync();
      const productObj = ps.filter((product) => product.id === task.productId)[0];
      if (productObj) {
        setProduct(productObj);
        const merchantObj = merchants.filter((merchant) => merchant.id === productObj.merchantId)[0];
        if (merchantObj) {
          setMerchant(merchantObj);
        }
      }
      setObjectLoading(false);
    };
    fetch();
  }, []);

  const formik = useFormik<ITaskModel>({
    initialValues: {
      ...task,
      productId: products.filter((product) => product.id === task.productId).map((product) => product.id)[0],
      productName: products.filter((product) => product.id === task.productId).map((product) => product.name)[0],
      product: products.filter((product) => product.id === task.productId)[0].asJSON,
    },
    validationSchema,
    onSubmit: (values) => updateByIDAsync(values, () => history.push('/dashboard/tasks')),
  });

  if (objectLoading) return <></>;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
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
                disabled
                formik={formik}
                name="productName"
                productOptions={products}
                label="Product"
              />
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" justifyContent="flex-end">
                <OuterLink href={product ? `${product?.url}` : '#'} target="_blank" rel="noreferrer">
                  <IconButton className={classes.tableIconButton} aria-label="menu">
                    <Language />
                  </IconButton>
                </OuterLink>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.formInputContainer}>
            <TextField label="Merchant" disabled value={merchant?.name} variant="outlined" />
          </Grid>
          <CustomInput width={12} formik={formik} name="targetQuantity" type="number" label="Target Quantity" />
          <Grid item xs={12}>
            <Button
              className={classes.updateButton}
              variant="contained"
              color="primary"
              disabled={loading || !formik.isValid}
              type="submit">
              Change Quantity
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default TaskEditForm;
