import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';
import { get } from 'lodash';
import { ProductModel } from 'models';
import { FocusEvent, ReactElement } from 'react';
import { useStyles } from './styles';
import { CommonInputProps } from './types';

export interface CustomInputProps<T> extends CommonInputProps<T> {
  productOptions: ProductModel[];
  disabled?: boolean;
  formik: any;
}

export function CustomAutoComplete<T>({
  formik,
  name,
  disabled,
  label,
  productOptions,
}: CustomInputProps<T>): ReactElement {
  const classes = useStyles();

  const error = get(formik.errors, name) as string;

  const invalid = (get(formik.touched, name, false) as boolean) && !!error;

  const onFocusChange = (e: FocusEvent<HTMLInputElement>): void => {
    formik.handleBlur(e);
  };

  return (
    <Grid item xs={12} className={clsx(classes.formInputContainer)}>
      <Autocomplete
        disabled={disabled}
        options={productOptions.map((product) => product.asJSON)}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option) => option.name === formik.values.productName}
        defaultValue={formik.values.product}
        onChange={(event, newValue) => {
          formik.setFieldValue(name, newValue?.name);
          formik.setFieldValue('productId', newValue?.id);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id={name}
            label={label}
            disabled={disabled}
            name={name}
            onBlur={onFocusChange}
            variant="outlined"
          />
        )}
      />

      <div className={classes.errorColor}>{invalid ? error : ''}</div>
    </Grid>
  );
}
