import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import clsx from 'clsx';
import { Grid, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { IAddressModel } from 'models';
import { useStore } from 'hooks';
import { CustomInput, CustomSelect, CustomFormSwitch } from 'components';
import { STATES } from 'config';
import { CommonHeader } from '../Components';
import { postcodeValidator } from 'postcode-validator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '100%',
      padding: '8px 0px',
      borderRadius: 6,
      fontSize: '18px',
      textTransform: 'unset',
      boxShadow: 'unset',
      fontWeight: 700,
    },
    saveButton: {
      background: theme.palette.secondary.dark,
    },
  }), { index: 1 }
);

interface P {
  address: IAddressModel;
}

const validationSchema = Yup.object().shape({
  street: Yup.string().required('Street is required!'),
  city: Yup.string().required('City is required!'),
  state: Yup.string().required('State is required!'),
  postalCode: Yup.string()
    .test('test-number', 'Invalid US Postal Code', (value) => postcodeValidator(value || '', 'US'))
    .required(),
});

export const EditAddressForm = ({ address }: P): ReactElement => {
  const classes = useStyles();

  const history = useHistory();

  const {
    dataStore: {
      addressStore: { loading, updateAddressAsync },
    },
  } = useStore();

  const formik = useFormik<IAddressModel>({
    initialValues: address,
    onSubmit: (values) => updateAddressAsync(values, () => history.push('/dashboard/settings?tab=1')),
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CommonHeader title="Basic Information/Update Address" tab={1}>
        <CustomInput formik={formik} name="street" label="Street" />
        <CustomInput formik={formik} name="secondAddressLine" label="Apt #, Unit, Suite, etc." />
        <CustomSelect formik={formik} name="state" label="State" width={6} objectOptions={STATES} />
        <CustomInput formik={formik} name="city" label="City" width={6} />
        <CustomInput formik={formik} name="postalCode" label="Postal code" />
        <CustomFormSwitch
          disabled={true}
          formik={formik}
          name="isShipping"
          label="Shipping Address"
          value={formik.values.isShipping}
        />
        <Grid item xs={12}>
          <Button
            className={clsx(classes.button, classes.saveButton)}
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || !formik.isValid}>
            Save
          </Button>
        </Grid>
      </CommonHeader>
    </form>
  );
};
