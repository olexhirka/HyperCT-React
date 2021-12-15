import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    formInputContainer: {
      '& .MuiFormControl-root': {
        width: '100%',
      },
      textAlign: 'left',
      color: '#fff',
    },
    visibilityButton: {
      padding: 0,
    },
    errorColor: { color: '#f44336', height: '20px' },
  }), { index: 1 }
);
