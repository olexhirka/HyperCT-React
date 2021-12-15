import { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { Typography, Grid } from '@material-ui/core';
import { useStyles } from './ProductDataRow.styles';

interface P {
  title: ReactNode;
  data: ReactNode;
  marginTop20?: boolean;
}

// Component only for this page
export const ProductDataRowComponent = ({ title, data, marginTop20 }: P): ReactElement => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      className={clsx({
        [classes.marginTop20]: marginTop20,
      })}>
      <Grid item>
        <Typography variant="subtitle1">{title}</Typography>
      </Grid>
      <Grid
        item
        xs={8}
        className={clsx({
          [classes.alignLeft]: true,
          [classes.whiteText]: true,
        })}>
        <Typography variant="subtitle1">{data}</Typography>
      </Grid>
    </Grid>
  );
};
