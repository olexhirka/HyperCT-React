import {
  createStyles, makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'flex',
    padding: 35,
    background: '#1c1b2a',
    borderRadius: 16,
    textAlign: 'center',
  },
  zoom: {
    transform: 'scale(1.009)',
    boxShadow: '0px 0px 10px 2px',
  },
  img: {
    maxWidth: 75,
    borderRadius: 6,
  },
  customList: {
    '& .MuiListItem-root.MuiListItem-gutters': {
      paddingLeft: 0,
    },
  },
  button: {
    minWidth: 250,
    padding: 15,
    background: '#322cf4',
    textTransform: 'unset',
    borderRadius: 16,
  },
  feature: {
    fontSize: '1.4rem',
  },
}), { index: 1 });
