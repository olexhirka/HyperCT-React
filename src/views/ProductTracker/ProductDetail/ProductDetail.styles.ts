import { makeStyles, createStyles, Theme } from '@material-ui/core';

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
  editButton: {
    background: theme.palette.secondary.dark,
    color: '#fff',
    textTransform: 'unset',
    borderRadius: 6,
    fontWeight: 'bold',
    padding: '8px 15px',
  },
  whiteText: {
    color: '#fff',
  },
  maxWidth530: {
    maxWidth: 530,
  },
  alignLeft: {
    textAlign: 'left',
  },
  marginTop20: {
    marginTop: '20px',
  },
  linkStyles: {
    textDecoration: 'none',
  },
}), { index: 1 });
