import { ReactElement } from 'react';
import { Grid, Switch, FormLabel } from '@material-ui/core';
import { CommonInputProps } from './types';

export interface CustomInputProps<T> extends CommonInputProps<T> {
  value: boolean;
  disabled?: boolean;
  className?: string;
}

export function CustomFormSwitch<T>({
  className,
  formik,
  disabled,
  name,
  value,
  label,
  width = 12,
}: CustomInputProps<T>): ReactElement {
  return (
    <Grid container item xs={width} justify="flex-start" alignItems="center">
      <Switch
        className={className}
        disabled={disabled}
        checked={value}
        onChange={(_, status) => formik.setFieldValue(name, status)}
        name={name}
      />
      <FormLabel>{label}</FormLabel>
    </Grid>
  );
}
