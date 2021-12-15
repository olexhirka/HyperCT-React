import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 700,
  },
  addButton: {
    background: theme.palette.secondary.dark,
    textTransform: 'unset',
  },
  button: {
    background: theme.palette.secondary.dark,
    textTransform: 'unset',
  },
  searchRoot: {
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
    width: 250,
    borderRadius: '6px',
    border: 'solid 1px #313747',
    background: '#232735',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 2,
  },
  filterButton: {
    background: '#232735',
    borderRadius: '6px',
    border: 'solid 1px #313747',
  },
  filterButtonIcon: {
    color: theme.palette.secondary.dark,
  },
}), { index: 1 });
