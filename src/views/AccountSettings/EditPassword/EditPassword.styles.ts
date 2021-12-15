import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '100%',
      padding: '8px 0px',
      borderRadius: 6,
      fontSize: '18px',
      textTransform: 'unset',
      boxShadow: 'unset',
      fontWeight: 700,
    },
    saveButton: {
      background: theme.palette.secondary.dark,
    },
  }), { index: 1 }
);
