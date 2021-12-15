import { ReactElement, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import valid from 'card-validator';
import clsx from 'clsx';
import { Grid, Button, FormControlLabel, FormLabel, Radio, RadioGroup, Divider } from '@material-ui/core';
import { useHistory, useParams, Link } from 'react-router-dom';
import { CustomFormSwitch, CustomInput } from 'components';
import { useComponentDidMount, useStore } from 'hooks';
import { CommonHeader } from '../Components';
import { useStyles } from './EditPaymentMethod.styles';
import { ICardType } from 'types';

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

const EditPaymentMethod = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<ICardType>({
    id: '',
    encryptedCardNumber: '',
    cardholderName: '',
    expirationMonth: '',
    expirationYear: '',
    addressId: '',
    isPrimary: false,
    userId: '',
  });
  const classes = useStyles();

  const history = useHistory();

  const {
    dataStore: {
      paymentStore: { updateCardAsync, paymentMethods, loading },
      addressStore: { userAddresses, getAllAddressForUserAsync },
      authStore: { user },
    },
  } = useStore();

  useEffect(() => {
    if (user) {
      getAllAddressForUserAsync(user.id);
    }
  }, []);

  useEffect(() => {
    const card = paymentMethods.find((card) => card.id === id);
    if (card) {
      setCard(card);
    }
  }, [id]);

  useEffect(() => {
    formik.setValues(card);
  }, [card]);

  const formik = useFormik<ICardType>({
    initialValues: card,
    validationSchema,
    onSubmit: (values) => updateCardAsync(values, () => history.push('/dashboard/settings?tab=2')),
  });

  const handleAddressChange = (id: string) => {
    formik.setFieldValue('addressId', id);
  };

  if (card.id === '') return <></>;

  return (
    <form onSubmit={formik.handleSubmit}>
      <CommonHeader title="Edit Payment Method" tab={2}>
        <CustomInput formik={formik} name="cardholderName" label="Card Holder Name" />
        <CustomInput formik={formik} name="encryptedCardNumber" label="Card Number" />
        <CustomInput formik={formik} name="expirationMonth" label="Expiration Month" width={6} />
        <CustomInput formik={formik} name="expirationYear" label="Expiration Year" width={6} />
        <CustomFormSwitch
          disabled
          formik={formik}
          name="isPrimary"
          label="Default Card"
          value={formik.values.isPrimary}
        />
        <Divider light variant="fullWidth" style={{ width: '100%' }} />
        <Grid container item xs={12} className={clsx(classes.formInputContainer)}>
          <Grid item xs={12}>
            <FormLabel className={classes.addressTitle}>Choose Billing Address</FormLabel>
          </Grid>
          <Grid item xs={12}>
            <RadioGroup aria-label="addressId" name="addressId" value={formik.values.addressId}>
              {userAddresses.length === 0 && <p>No address found. You need to create one</p>}
              {userAddresses.map((address) => {
                return (
                  <Grid
                    key={address.id}
                    container
                    item
                    xs={12}
                    alignItems="center"
                    className={clsx(classes.formInputContainer, classes.marginTop20)}>
                    <Grid item xs={8}>
                      <FormControlLabel value={address.id} control={<Radio />} label={address.street} />
                    </Grid>
                    <Grid item xs={4}>
                      <Button onClick={() => handleAddressChange(address.id!)} variant="contained" color="primary">
                        Use Address
                      </Button>
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
                push: `/dashboard/settings/edit-payment-method/${card.id}`,
                isShipping: false,
                canChangeShipping: true,
                origin: 'payment',
              },
            }}
            className={classes.linkStyle}>
            <Button className={clsx(classes.button)} variant="contained" color="primary" type="submit">
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
            Update Card
          </Button>
        </Grid>
      </CommonHeader>
    </form>
  );
};

export default EditPaymentMethod;
