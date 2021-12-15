import { ReactElement } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Button } from '@material-ui/core';
import { CustomInput } from 'components';
import { useStore } from 'hooks';
import { IAuthType } from 'types';
import { useHistory } from 'react-router-dom';
import { CommonHeader } from '../Components';
import { useStyles } from './EditEmail.styles';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email!').required('New email is required!'),
  password: Yup.string().required('Password is required!'),
});

const EditEmail = (): ReactElement => {
  const classes = useStyles();

  const history = useHistory();

  const {
    dataStore: {
      authStore: { loading, updateEmailApi },
    },
  } = useStore();

  const formik = useFormik<IAuthType>({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => updateEmailApi(values, () => history.push('/dashboard/settings')),
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CommonHeader title="Basic Information/Update Profile">
        <CustomInput formik={formik} name="email" label="New email" />
        <CustomInput formik={formik} name="password" label="Verify your password" type="password" />

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

export default EditEmail;
