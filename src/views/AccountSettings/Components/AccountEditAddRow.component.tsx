import { ReactElement, useState, ChangeEvent } from 'react';
import { TextField, Grid, MenuItem, makeStyles, createStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() =>
  createStyles({
    whiteText: {
      color: '#fff',
    },
    maxWidth530: {
      maxWidth: 530,
    },
    formInputContainer: {
      '& .MuiFormControl-root': {
        width: '100%',
      },
    },
    alignLeft: {
      textAlign: 'left',
    },
    marginTop20: {
      marginTop: '20px',
    },
  }), { index: 1 }
);

interface P {
  label: string;
  data: string;
  marginTop20?: boolean;
  select?: boolean;
  halfWidth?: boolean;
  selectItems?: { value: string; label: string }[];
  type?: 'text' | 'password';
}

export const AccountEditAddRow = ({
  label,
  data,
  marginTop20,
  select,
  selectItems,
  halfWidth,
  type = 'text',
}: P): ReactElement => {
  const classes = useStyles();

  const [inputData, setInputData] = useState(data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputData(e.target.value);
  };

  return (
    <Grid
      item
      xs={halfWidth ? 6 : 12}
      className={clsx({
        [classes.alignLeft]: true,
        [classes.whiteText]: true,
        [classes.formInputContainer]: true,
        [classes.marginTop20]: marginTop20,
      })}>
      {!select ? (
        <TextField
          id={label.toLowerCase()}
          select={select}
          label={label}
          type={type}
          value={inputData}
          onChange={handleChange}
          variant="outlined"
        />
      ) : (
        <TextField
          id={label.toLowerCase()}
          select={select}
          label={label}
          value={inputData}
          onChange={handleChange}
          variant="outlined">
          {selectItems?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Grid>
  );
};
