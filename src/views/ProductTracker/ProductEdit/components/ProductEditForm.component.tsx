import * as Yup from 'yup';
import { ReactElement } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Paper, MenuItem } from '@material-ui/core';
import { useStore } from 'hooks';
import { IProductModel, productAvailabilityEnum, restockProbabilityEnum } from 'models';
import { CustomInput, CustomSelect } from 'components';
import { useStyles } from '../ProductEdit.styles';

interface P {
  product: IProductModel;
}

const validationSchema = Yup.object().shape({
  merchantId: Yup.string().trim().uuid('Invalid merchant ID!').required('Merchant id is required!'),
  url: Yup.string().url('Invalid product URL!').required('Product Url is required!'),
  name: Yup.string().required('Product name is required!'),
  hasUnitRestrictions: Yup.boolean().required('Has unit restriction is required!'),
  isInStoreOnly: Yup.boolean().required('IsInStoreOnly is required!'),
  price: Yup.number().required('Product price is required!'),
  restockProbability: Yup.number().required('Product restock probability is required!'),
  availability: Yup.number().required('Product availability is required!'),
  category: Yup.number().required('Product category is required!'),
  merchantProductName: Yup.string(),
});

const ProductEditFormComponent = ({ product }: P): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const {
    dataStore: {
      productStore: { updateProductAsync, loading },
      merchantStore: { merchants },
    },
  } = useStore();

  const formik = useFormik<IProductModel>({
    initialValues: product,
    validationSchema,
    onSubmit: (values) => updateProductAsync(values, () => history.goBack()),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={4}>
          <CustomInput formik={formik} name="name" label="Product name" />
          <CustomSelect
            formik={formik}
            name="merchantId"
            label="Select Merchant"
            options={merchants.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name}
              </MenuItem>
            ))}
          />
          <CustomInput formik={formik} name="price" label="Pricing" width={6} />
          <CustomSelect
            formik={formik}
            name="availability"
            label="Availability"
            type="number"
            width={6}
            objectOptions={productAvailabilityEnum}
          />
          <CustomInput formik={formik} name="url" label="Website" />
          <CustomInput formik={formik} name="category" type="number" label="Category" width={6} />
          <CustomSelect
            formik={formik}
            name="restockProbability"
            type="number"
            label="Restock Probability"
            width={6}
            objectOptions={restockProbabilityEnum}
          />

          <Grid item xs={12}>
            <Button
              className={classes.updateButton}
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading || !formik.isValid}>
              Update Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default ProductEditFormComponent;
