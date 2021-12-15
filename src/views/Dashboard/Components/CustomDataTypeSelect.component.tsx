import { ReactElement, ChangeEvent, useState } from 'react';
import { FormControl, Select, MenuItem, makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
      '& .MuiOutlinedInput-input': {
        padding: '10px 15px',
      },
    },
  }), { index: 1 }
);

export const CustomDataTypeSelect = (): ReactElement => {
  const classes = useStyles();
  const [dataType, setDataType] = useState('month');

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setDataType(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={dataType}
        onChange={handleChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="day">Day</MenuItem>
        <MenuItem value="month">Month</MenuItem>
        <MenuItem value="year">Year</MenuItem>
      </Select>
    </FormControl>
  );
};
