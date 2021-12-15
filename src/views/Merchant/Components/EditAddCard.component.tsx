import { ReactElement, useState, ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button, Badge, Avatar, TextField, MenuItem } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: '30px',
      padding: '40px 50px',
      textAlign: 'center',
      background: '#181C27',
      color: theme.palette.text.secondary,
    },
    updateButton: {
      background: theme.palette.secondary.dark,
      width: '100%',
      padding: '14px 0px',
      borderRadius: 6,
      fontSize: '18px',
      textTransform: 'unset',
      fontWeight: 700,
    },
    alignLeft: {
      textAlign: 'left',
    },
    marginTop20: {
      marginTop: '20px',
    },
    whiteText: {
      color: '#fff',
    },
    avatar: {
      width: 100,
      height: 100,
    },
    badgeIcon: {
      color: '#fff',
      backgroundColor: theme.palette.secondary.dark,
    },
    formInputContainer: {
      '& .MuiFormControl-root': {
        width: '100%',
      },
    },
    maxWidth530: {
      maxWidth: 530,
    },
  }), { index: 1 }
);

interface P {
  label: string;
  data?: string;
  marginTop20?: boolean;
  select?: boolean;
  halfWidth?: boolean;
  selectItems?: { value: string; label: string }[];
}

// Component only for this page
const MerchantEditRow = ({ label, data, marginTop20, select, selectItems, halfWidth }: P): ReactElement => {
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

interface Props {
  name: string;
  logo: string;
  status: string;
  add?: boolean;
  edit?: boolean;
}

export const EditAddCard = ({ name, logo, status, add, edit }: Props): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
          <Grid item>
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={
                <Avatar alt="Edit Icon" className={classes.badgeIcon}>
                  <Edit />
                </Avatar>
              }>
              <Avatar alt={name.toLowerCase()} src={logo} className={classes.avatar} />
            </Badge>
          </Grid>

          <Grid item xs={12}>
            <MerchantEditRow data={name} label="Merchant name" marginTop20 />
          </Grid>
          <Grid item xs={12}>
            <MerchantEditRow
              label="Status"
              data={status}
              select
              selectItems={[
                { value: 'Live', label: 'Live' },
                { value: 'Out-of-stock', label: 'Out-of-stock' },
                { value: 'Unknown', label: 'Unknown' },
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <Button className={classes.updateButton} variant="contained" color="primary">
              {add && 'Add'}
              {edit && 'Edit'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
