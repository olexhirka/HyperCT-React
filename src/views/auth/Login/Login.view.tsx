import { ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { CustomInput } from 'components';
import { websiteURL } from 'config';
import { useFormik } from 'formik';
import { useStore } from 'hooks';
import { IAuthType } from 'types';
import * as Yup from 'yup';
import { useStyles } from './Login.styles';

const validationSchema = Yup.object({
  email: Yup.string().email('Please enter a valid email!').required('This field is required!'),
  password: Yup.string().required('Please enter a password'),
});

const Login = (): ReactElement => {
  const history = useHistory();
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

  const {
    dataStore: {
      authStore: { loginApi, loading },
    },
  } = useStore();

  const formik = useFormik<IAuthType>({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: (values) =>
      loginApi(values, () => {
        return history.push('/');
      }),
  });

  return (
    <Grid container alignItems="center" justify="center" className={root}>
      <Grid item>
        <Paper className={loginCard}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12}>
              <div className={loginCardContent}>
                <img height="22px" src="/hypercart-logo-for-dark-background.svg" alt="logo" />
                <Typography className={loginCardText}>Get ready to fill your cart.</Typography>
                <form onSubmit={formik.handleSubmit}>
                  <div className={inputContainer}>
                    <CustomInput size="small" label="E-mail" formik={formik} name="email" />
                  </div>
                  <div className={inputContainer}>
                    <Grid container alignItems="center" justify="flex-end">
                      <Grid item>
                        <Link to="/forgot-password" className={linkStyles}>
                          Forgot Password?
                        </Link>
                      </Grid>
                    </Grid>
                    <CustomInput size="small" label="Password" formik={formik} name="password" type="password" />
                  </div>
                  <Button
                    type="submit"
                    className={submitButton}
                    variant="contained"
                    color="primary"
                    disabled={loading || !formik.isValid}>
                    Login
                  </Button>
                </form>
                <Grid container className={linkContainerStyles} alignItems="center" justify="flex-end">
                  <Grid item>
                    New to Hypercart? &nbsp;
                    <a href={websiteURL} className={linkStyles}>
                      Get started
                    </a>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
