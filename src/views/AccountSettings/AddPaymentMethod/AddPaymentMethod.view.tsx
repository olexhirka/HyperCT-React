import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import valid from 'card-validator';
import clsx from 'clsx';
import { Grid, Button, FormControlLabel, FormLabel, Radio, RadioGroup, Divider } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { CustomFormSwitch, CustomInput } from 'components';
import { useStore } from 'hooks';
import { CommonHeader } from '../Components';
import { useStyles } from './AddPaymentMethod.styles';
import { ICardType } from 'types';
import { IAddressModel } from 'models';

const validationSchema = Yup.object().shape({
  encryptedCardNumber: Yup.string()
    .test('test-number', 'Credit Card number is invalid', (value) => valid.number(value).isValid)
    .required(),
  cardholderName: Yup.string()
    .test('test-number', 'Card Holder Name is invalid', (value) => valid.cardholderName(value).isValid)
    .required(),
  expirationMonth: Yup.string()
    .test('test-number', 'Invalid Month', (value) => valid.expirationMonth(value).isValid)
    .required(),
  expirationYear: Yup.string()
    .test('test-number', 'Invalid Year', (value) => valid.expirationYear(value).isValid)
    .required(),
  addressId: Yup.string().required('Address is required!'),
});

const AddPaymentMethod: React.FC = () => {
  const {
    dataStore: {
      paymentStore: { paymentMethods, addNewCard, loading, storeFormData, paymentFormValues },
      addressStore: { getAllAddressForUserAsync },
      authStore: { user },
    },
    uiStore: {
      notificationStore: { sendNotification },
    },
  } = useStore();
  const classes = useStyles();
  const history = useHistory();
  const [addresses, setAddresses] = useState<IAddressModel[]>([]);

  const formik = useFormik<ICardType>({
    initialValues: { ...paymentFormValues, userId: user!.asJSON.id },
    validationSchema,
    onSubmit: (values) => addNewCard(values, () => history.push('/dashboard/settings?tab=2')),
  });

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const addresses = await getAllAddressForUserAsync(user.id);
        if (addresses) {
          setAddresses(addresses.map((address) => address.asJSON));
        }
      }
    };
    fetch();
  }, []);

  const handleAddressChange = (id: string) => {
    formik.setFieldValue('addressId', id);
  };

  useEffect(() => {
    if (paymentMethods.find((pm) => pm.isPrimary === true)) {
      formik.setFieldValue('isPrimary', false);
    } else {
      formik.setFieldValue('isPrimary', true);
    }
  }, [paymentMethods]);

  useEffect(() => {
    storeFormData(formik.values);
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <CommonHeader title="Add New Payment Method" tab={2}>
        <CustomInput formik={formik} name="cardholderName" label="Card Holder Name" />
        <CustomInput formik={formik} name="encryptedCardNumber" label="Card Number" />
        <CustomInput formik={formik} name="expirationMonth" label="Exp. Month" width={6} />
        <CustomInput formik={formik} name="expirationYear" label="Exp. Year" width={6} />
        <div onClick={() => sendNotification('A default card must be provided.')}>
          <CustomFormSwitch
            className={classes.switchColor}
            disabled
            formik={formik}
            name="isPrimary"
            label="Default Card"
            value={formik.values.isPrimary}
          />
        </div>
        <Divider light variant="fullWidth" style={{ width: '100%' }} />
        <Grid container item xs={12} className={clsx(classes.formInputContainer, classes.marginTop20)}>
          <Grid item xs={12}>
            <FormLabel className={classes.addressTitle}>Choose Billing Address</FormLabel>
          </Grid>
          <Grid item xs={12}>
            <RadioGroup aria-label="addressId" name="addressId" value={formik.values.addressId}>
              {addresses.length === 0 && <p>No address found. You need to create one</p>}
              {addresses.map((address) => {
                return (
                  <Grid
                    key={address.id}
                    container
                    item
                    xs={12}
                    alignItems="center"
                    className={clsx(classes.formInputContainer, classes.marginTop20)}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        onClick={() => handleAddressChange(address.id!)}
                        value={address.id}
                        control={<Radio />}
                        label={`${address.street}, ${address.secondAddressLine ? `${address.secondAddressLine},` : ''}${
                          address.city
                        }, ${address.state}, ${address.postalCode}`}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Link
            to={{
              pathname: '/dashboard/settings/add-address',
              state: {
                push: '/dashboard/settings/add-payment-method',
                isShipping: false,
                canChangeShipping: true,
                origin: 'payment',
              },
            }}
            className={clsx(classes.linkStyle)}>
            <Button
              className={clsx(classes.button, classes.saveButton)}
              variant="contained"
              color="primary"
              type="submit">
              Add New Billing Address
            </Button>
          </Link>
        </Grid>
        <Divider light variant="fullWidth" style={{ width: '100%' }} />
        <Grid item xs={12}>
          <Button
            className={clsx(classes.button, classes.saveButton)}
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || !formik.isValid}>
            Save Card
          </Button>
        </Grid>
      </CommonHeader>
    </form>
  );
};

export default AddPaymentMethod;
