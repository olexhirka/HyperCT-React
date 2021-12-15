import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import { get } from 'lodash';
import { ChangeEvent, FocusEvent, ReactElement, useState, useEffect } from 'react';
import { useStyles } from './styles';
import { CommonInputProps } from './types';

export interface CustomInputProps<T> extends CommonInputProps<T> {
  customOnBlur?: (value: string) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
  overrideValue?: any;
}

export function CustomInput<T>({
  overrideValue,
  formik,
  name,
  customOnBlur,
  disabled,
  label,
  size,
  width = 12,
  type = 'text',
}: CustomInputProps<T>): ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState('');
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const classes = useStyles();

  useEffect(() => {
    if (!!overrideValue) {
      formik.setFieldValue(name, overrideValue);
      return setValue(overrideValue);
    }

    const value = get(formik.values, name);
    if (value === 0) {
      setValue('');
    } else {
      setValue(value);
    }
  }, [formik.values]);

  const error = get(formik.errors, name) as string;

  const invalid = (get(formik.touched, name, false) as boolean) && !!error;

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(e);
  };

  const onFocusChange = (e: FocusEvent<HTMLInputElement>): void => {
    formik.handleBlur(e);
    if (customOnBlur) customOnBlur(e.target.value);
  };

  return (
    <Grid item xs={width} className={clsx(classes.formInputContainer)}>
      {type === 'password' ? (
        <TextField
          id={name}
          label={label}
          disabled={disabled}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onFocusChange}
          size={size}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  className={classes.visibilityButton}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <TextField
          id={name}
          label={label}
          disabled={disabled}
          name={name}
          type={type}
          value={get(formik.values, name) as string}
          onChange={onChange}
          onBlur={onFocusChange}
          size={size}
          variant="outlined"
        />
      )}

      <div className={classes.errorColor}>{invalid ? error : ''}</div>
    </Grid>
  );
}
