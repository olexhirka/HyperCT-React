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
  checkoutTextContainer: {
    color: theme.palette.secondary.dark,
  },
  addToCartTextContainer: {
    color: '#077dff',
  },
  searchTextContainer: {
    color: '#855fff',
  },
  statusContainer: {
    padding: '8px 15px',
    borderRadius: '6px',
    color: '#fff',
  },
  statusFilledContainer: {
    background: '#FF484F',
  },
  statusOpenContainer: {
    background: theme.palette.secondary.dark,
  },
  svgIcon: {
    display: 'flex',
  },
}), { index: 1 });
