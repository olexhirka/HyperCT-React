import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
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
  linkStyle: {
    textDecoration: 'none',
  },
}), { index: 1 });
