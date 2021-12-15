import { ReactElement } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStore } from 'hooks';
import { IPasswordType } from 'types';
import { CustomInput } from 'components';
import { CommonHeader } from '../Components';
import { useStyles } from './EditPassword.styles';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required!'),
  newPassword: Yup.string().min(6, 'Password length should be greater than 5!').required('Password is required!'),
  rpassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Password do not match!')
    .required('Confirm password is required!'),
});

const EditPassword = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const {
    dataStore: {
      authStore: { updatePasswordApi, loading },
    },
  } = useStore();

  const formik = useFormik<IPasswordType>({
    initialValues: { currentPassword: '', newPassword: '', rpassword: '' },
    onSubmit: (values) => updatePasswordApi(values, () => history.push('/dashboard/settings')),
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CommonHeader title="">
        <CustomInput formik={formik} name="currentPassword" label="Current password" type="password" />
        <CustomInput formik={formik} name="newPassword" label="New password" type="password" />
        <CustomInput formik={formik} name="rpassword" label="Confirm new password" type="password" />

        <Grid item xs={12}>
          <Button
            className={clsx(classes.button, classes.saveButton)}
            variant="contained"
            color="primary"
            disabled={loading || !formik.isValid}
            type="submit">
            Update Password
          </Button>
        </Grid>
      </CommonHeader>
    </form>
  );
};

export default EditPassword;
