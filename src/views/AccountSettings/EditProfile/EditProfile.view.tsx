import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react-lite';
import { Grid, Button } from '@material-ui/core';
import { useStore } from 'hooks';
import { CustomInput } from 'components';
import { IProfileType } from 'types';
import { useStyles } from './EditProfile.styles';
import { CommonHeader } from '../Components';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
});

const EditProfile = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const {
    dataStore: {
      authStore: { user, updateProfileApi, loading },
    },
  } = useStore();

  const formik = useFormik<IProfileType>({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
    onSubmit: (values) => updateProfileApi(values, () => history.push('/dashboard/settings')),
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CommonHeader title="Basic Information/Update Profile">
        <CustomInput formik={formik} name="firstName" label="First name" />
        <CustomInput formik={formik} name="lastName" label="Last name" />
        <Grid item xs={12}>
          <Button
            className={clsx(classes.button, classes.saveButton)}
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || !formik.isValid}>
            Update
          </Button>
        </Grid>
      </CommonHeader>
    </form>
  );
};

export default observer(EditProfile);
