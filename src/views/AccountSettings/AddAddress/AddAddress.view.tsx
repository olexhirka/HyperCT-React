import * as Yup from 'yup';
import { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import clsx from 'clsx';
import { Grid, Button, Switch, FormLabel } from '@material-ui/core';
import { IAddressModel } from 'models';
import { CustomFormSwitch, CustomInput, CustomSelect } from 'components';
import { useStore } from 'hooks';
import { STATES } from 'config';
import { CommonHeader } from '../Components';
import { useStyles } from './AddAddress.styles';
import { postcodeValidator } from 'postcode-validator';

const validationSchema = Yup.object().shape({
  street: Yup.string().required('Street is required!'),
  city: Yup.string().required('City is required!'),
  state: Yup.string().required('State is required!'),
  postalCode: Yup.string()
    .test('test-number', 'Invalid US Postal Code', (value) => postcodeValidator(value || '', 'US'))
    .required(),
});

const AddAddress: React.FC = (): ReactElement => {
  const {
    dataStore: {
      addressStore: { userAddresses, addAddressAsync, loading },
      authStore: { user },
    },
    uiStore: {
      notificationStore: { sendNotification },
    },
  } = useStore();
  const [initialValues, setInitialValues] = useState<IAddressModel>({
    street: '',
    secondAddressLine: '',
    city: '',
    state: '',
    postalCode: '',
    userId: user!.id,
    isShipping: false,
  });
  const [shipping, setShipping] = useState(false);
  const [canChange, setCanChange] = useState(true);
  const classes = useStyles();
  const location = useLocation<any>();
  let { isShipping, push, canChangeShipping, origin } = location.state;

  const history = useHistory();

  useEffect(() => {
    if (userAddresses.length === 0) {
      setShipping(true);
    } else {
      setShipping(isShipping);
    }
    setCanChange(canChangeShipping);
  }, [isShipping, user, canChangeShipping]);

  useEffect(() => {
    formik.setFieldValue('isShipping', shipping);
  }, [shipping]);

  const formik = useFormik<IAddressModel>({
    initialValues,
    validationSchema,
    onSubmit: (values) => addAddressAsync(values, () => history.push(push)),
  });

  const triggerNotification = () => {
    if (origin !== 'payment') {
      sendNotification('A valid shipping address must be provided.');
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <CommonHeader backLink={push} title="Add New Shipping Address" tab={1}>
        <CustomInput formik={formik} name="street" label="Street" />
        <CustomInput formik={formik} name="secondAddressLine" label="Apt #, Unit, Suite, etc." />
        <CustomSelect formik={formik} name="state" label="State" width={6} objectOptions={STATES} />
        <CustomInput formik={formik} name="city" label="City" width={6} />
        <CustomInput formik={formik} name="postalCode" label="Postal code" />
        {!userAddresses.find((address) => address.isShipping === true)?.isShipping && (
          <div onClick={triggerNotification}>
            <CustomFormSwitch
              className={classes.switchColor}
              disabled={!canChange}
              formik={formik}
              name="isShipping"
              label={canChange ? 'Also use as Shipping Address' : 'Shipping Address'}
              value={formik.values.isShipping}
            />
          </div>
        )}
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

export default AddAddress;
