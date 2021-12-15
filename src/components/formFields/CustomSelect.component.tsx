import { ChangeEvent, FocusEvent, ReactElement } from 'react';
import clsx from 'clsx';
import { get } from 'lodash';
import { Grid, MenuItem, TextField } from '@material-ui/core';
import { CommonInputProps } from './types';
import { useStyles } from './styles';

export interface CustomInputProps<T> extends CommonInputProps<T> {
  options?: ReactElement[];
  textOptions?: string[];
  objectOptions?: Record<string, string | number>;
  customOnBlur?: (value: string) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

export function CustomSelect<T>({
  formik,
  name,
  customOnBlur,
  disabled,
  label,
  size,
  options,
  textOptions,
  objectOptions,
  width = 12,
}: CustomInputProps<T>): ReactElement {
  const classes = useStyles();

  const error = get(formik.errors, name) as string;

  const invalid = (get(formik.touched, name, false) as boolean) && !!error;

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(e);
  };

  const onFocusChange = (e: FocusEvent<HTMLInputElement>): void => {
    formik.handleBlur(e);
    if (customOnBlur) customOnBlur(e.target.value);
  };

  const getDropdownItems = () => {
    if (Array.isArray(options)) return options;
    if (Array.isArray(textOptions)) {
      return textOptions.map((t) => (
        <MenuItem key={t} value={t}>
          {t}
        </MenuItem>
      ));
    }
    if (objectOptions) {
      return Object.entries(objectOptions).map(([key, value]) => (
        <MenuItem key={key} value={key}>
          {value}
        </MenuItem>
      ));
    }

    return [];
  };

  return (
    <Grid item xs={width} className={clsx(classes.formInputContainer)}>
      <TextField
        select
        id={name}
        name={name}
        label={label}
        disabled={disabled}
        value={get(formik.values, name) as string}
        onChange={onChange}
        onBlur={onFocusChange}
        size={size}
        variant="outlined">
        {getDropdownItems()}
      </TextField>

      <div className={classes.errorColor}>{invalid ? error : ''}</div>
    </Grid>
  );
}
