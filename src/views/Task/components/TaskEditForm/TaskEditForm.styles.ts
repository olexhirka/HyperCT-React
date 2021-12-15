import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: '30px',
      padding: '40px 50px',
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
    tableIconButton: {
      color: 'rgb(255 255 255 / 60%)',
      padding: 2,
    },
  }), { index: 1 }
);
