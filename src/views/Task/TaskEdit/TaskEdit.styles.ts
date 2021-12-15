import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: '30px',
    padding: '40px 50px',
    textAlign: 'center',
    background: '#181C27',
    color: theme.palette.text.secondary,
  },
  backButton: {
    color: theme.palette.secondary.dark,
    backgroundColor: 'transparent',
    boxShadow: 'unset',
    padding: 0,
    '&:hover': {
      boxShadow: 'unset',
    },
  },
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
  updateButton: {
    background: theme.palette.secondary.dark,
    width: '100%',
    padding: '14px 0px',
    borderRadius: 6,
    fontSize: '18px',
    textTransform: 'unset',
    fontWeight: 700,
  },
  linkStyle: {
    textDecoration: 'none',
  },
}), { index: 1 });
