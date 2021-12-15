import * as Yup from 'yup';
import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Badge, Button, Grid, Paper } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useFormik } from 'formik';
import { useStore } from 'hooks';
import { CustomFormSwitch, CustomInput, CustomSelect } from 'components';
import { IMerchantModel, merchantSupportLevelEnum } from 'models';
import { merchantStyles } from './MerchantEditForm.styles';

interface P {
  merchant: IMerchantModel;
}

const validationSchema = Yup.object().shape({
  domain: Yup.string().url('Invalid merchant URL!').required('Merchant domain name is required!'),
  name: Yup.string().required('Merchant name is required!'),
  captchaWebkey: Yup.string(),
  supportLevel: Yup.number().required('Support level is required!'),
  imagePath: Yup.string().required('Merchant image path is required!'),
  isFlagged: Yup.boolean().required('Isflagged is required!'),
  isSupported: Yup.boolean().required('Issupported is required!'),
  hasGuestCheckout: Yup.boolean().required('Has guest checkout is required!'),
});

const MerchantEditForm = ({ merchant }: P): ReactElement => {
  const classes = merchantStyles();

  const history = useHistory();

  const {
    dataStore: {
      merchantStore: { updateByID, loading },
    },
  } = useStore();

  const formik = useFormik<IMerchantModel>({
    initialValues: merchant,
    validationSchema,
    onSubmit: (values) => updateByID(values, () => history.push('/dashboard/merchants')),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
          <Grid item>
            <Badge
              overlap="circle"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Avatar alt="Edit Icon" className={classes.badgeIcon}>
                  <Edit />
                </Avatar>
              }>
              <Avatar alt={merchant.name} src={merchant.imagePath} className={classes.avatar} />
            </Badge>
          </Grid>

          <CustomInput formik={formik} name="name" label="Merchant Name" />
          <CustomInput formik={formik} name="domain" label="Merchant Domain" />
          <CustomInput formik={formik} name="captchaWebkey" label="Merchant Captcha Web Key" />
          <CustomInput formik={formik} name="imagePath" label="Image Path" />
          <CustomSelect
            formik={formik}
            name="supportLevel"
            type="number"
            label="Support Level"
            objectOptions={merchantSupportLevelEnum}
          />

          <CustomFormSwitch
            formik={formik}
            name="isFlagged"
            value={formik.values.isFlagged}
            label="Flagged"
            width={6}
          />

          <CustomFormSwitch
            formik={formik}
            name="isSupported"
            value={formik.values.isSupported}
            label="Supported"
            width={6}
          />

          <Grid item xs={12}>
            <Button
              className={classes.updateButton}
              variant="contained"
              color="primary"
              disabled={loading || !formik.isValid}
              type="submit">
              Edit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default MerchantEditForm;
