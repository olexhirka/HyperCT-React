import { ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { CustomInput } from 'components';
import { useFormik } from 'formik';
import { useStore } from 'hooks';
import { IAuthResetPassword } from 'types';
import * as Yup from 'yup';
import { useStyles } from '../Login/Login.styles';

const validationSchema = Yup.object({
  email: Yup.string().email('Please enter a valid email!').required('This field is required!'),
});

const ForgotPassword = (): ReactElement => {
  const {
    root,
    loginCard,
    loginCardContent,
    loginCardText,
    inputContainer,
    submitButton,
    linkContainerStyles,
    linkStyles,
  } = useStyles();

  const history = useHistory();

  const {
    dataStore: {
      authStore: { resetPasswordApi, loading },
    },
  } = useStore();

  const formik = useFormik<IAuthResetPassword>({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values) => resetPasswordApi(values, () => history.push('/login')),
  });

  return (
    <Grid container alignItems="center" justify="center" className={root}>
      <Grid item>
        <Paper className={loginCard}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12}>
              <div className={loginCardContent}>
                <img height="22px" src="/hypercart-logo-for-dark-background.svg" alt="logo" />
                <Typography className={loginCardText}>Enter your email to reset password.</Typography>
                <form onSubmit={formik.handleSubmit}>
                  <div className={inputContainer}>
                    <CustomInput size="small" label="E-mail" formik={formik} name="email" />
                  </div>
                  <Button
                    type="submit"
                    className={submitButton}
                    variant="contained"
                    color="primary"
                    disabled={loading || !formik.isValid}>
                    Reset Password
                  </Button>
                </form>
                <Grid container className={linkContainerStyles} spacing={1} alignItems="center" justify="flex-end">
                  <Grid item>
                    <Link to="/login" className={linkStyles}>
                      Log In
                    </Link>
                  </Grid>
                  <Grid item>instead.</Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
