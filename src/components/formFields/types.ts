import { ReactElement } from 'react';
import { FormikProps } from 'formik';

export interface CommonInputProps<T> {
  formik: FormikProps<T>;
  name: string;
  label?: ReactElement | string;
  type?: 'number' | 'password' | 'text' | 'textarea';
  width?: boolean | 12 | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}
